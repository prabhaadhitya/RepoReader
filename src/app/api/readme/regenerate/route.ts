import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/apiResponse";
import { handleApiError } from "@/lib/errorHandler";
import { analysisService } from "@/modules/analysis/analysis.service";
import { rateLimit } from "@/lib/rateLimit";
import { logger } from "@/lib/logger";
import User from "@/modules/user/user.model";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    await connectDB();

    const body = await req.json();
    const { repoId } = body;

    if (!repoId) return errorResponse("repoId is required", 400);

    const userId = (session?.user as { id: string })?.id || null;
    const isGithub = (session as any)?.provider === "github";

    if (userId) {
      const limit = rateLimit(userId);
      if (!limit.allowed) {
        return errorResponse(
          `Too many requests. Please wait ${limit.resetInSeconds} seconds.`,
          429
        );
      }
    }

    const user = isGithub 
        ? await User.findOne({ githubId: Number(userId) }) 
        : await User.findById(userId)

    if (!user) return errorResponse("User not found.", 404);

    if (user.credits <= 0) {
      return errorResponse(
        "You have used all 3 of your free analyses. Please upgrade to continue.",
        403
      );
    }

    logger.info("API", "README regeneration requested", { repoId, userId });

    const result = await analysisService.regenerateReadme(repoId, userId);

    if (isGithub) {
      await User.findOneAndUpdate(
        { githubId: Number(userId) },
        { $inc: { credits: -1 } }
      );
    } else {
      await User.findByIdAndUpdate(userId, { $inc: { credits: -1 } });
    }

    return successResponse(result, 201, "README regenerated");
  } catch (error) {
    return handleApiError(error);
  }
}