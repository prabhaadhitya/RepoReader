import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { errorResponse } from "@/lib/apiResponse";
import { aiService } from "@/modules/ai/ai.service";
import Repository from "@/modules/repo/repository.model";
import Analysis from "@/modules/analysis/analysis.model";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const repoId = searchParams.get("repoId");

    if (!repoId) return errorResponse("repoId is required", 400);

    const repository = await Repository.findById(repoId);
    if (!repository) return errorResponse("Repository not found", 404);

    const analysis = await Analysis.findOne({ repoId });
    if (!analysis) return errorResponse("Analysis not found", 404);

    const stream = await aiService.streamReadme({
      repoName: repository.repoName,
      explanation: analysis.explanation,
      folderTree: [],
      packageJson: null,
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    const err = error as { message?: string };
    return errorResponse(err.message || "Stream failed", 500);
  }
}