import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/apiResponse";
import { handleApiError } from "@/lib/errorHandler";
import { analysisService } from "@/modules/analysis/analysis.service";
import { repoUrlSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rateLimit";
import { logger } from "@/lib/logger";
import User from "@/modules/user/user.model";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return errorResponse("Unauthorized. Please login first.", 401);
  }

  try {
    await connectDB();

    const body = await req.json();

    const parsed = repoUrlSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400);
    }

    const { repoUrl } = parsed.data;    
    const userId = (session?.user as { id: string })?.id || null;

     if (userId) {
      const limit = rateLimit(userId);
      if (!limit.allowed) {
        logger.warn("API", "Rate limit hit", { userId, repoUrl });
        return errorResponse(
          `Too many requests. Please wait ${limit.resetInSeconds} seconds before trying again.`,
          429
        );
      }
    }

    const isGithub = (session as any)?.provider === "github";

    const user = isGithub
      ? await User.findOne({ githubId: Number(userId) })
      : await User.findById(userId);
    if (!user) {
      return errorResponse("User not found.", 404);
    }

    if (user.credits <= 0) {
      return errorResponse("You have used all 3 of your free analyses. Please upgrade to continue.", 403);
    }

    logger.info("API", "Analysis request received", { userId, repoUrl });

    const result = await analysisService.analyzeRepository(repoUrl, userId);

    if (isGithub) {
      await User.findOneAndUpdate({ githubId: Number(userId) }, { $inc: { credits: -1 } })
    } else {
      await User.findByIdAndUpdate(userId, { $inc: { credits: -1 } });
    }
    
    logger.info("API", "Analysis complete", { userId, repoUrl });
    
    return successResponse(result, 201, "Repository analyzed");
  } catch (error) {
    return handleApiError(error)
  }
}