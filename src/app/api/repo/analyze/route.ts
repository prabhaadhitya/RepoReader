import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/apiResponse";
import { handleApiError } from "@/lib/errorHandler";
import { analysisService } from "@/modules/analysis/analysis.service";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { repoUrl } = body;

    if (!repoUrl) {
      return errorResponse("Repo URL required", 400)
    }

    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id || null;

    const result = await analysisService.analyzeRepository(repoUrl, userId);
      
    return successResponse(result, 201, "Repository analyzed");
  } catch (error) {
    return handleApiError(error)
  }
}