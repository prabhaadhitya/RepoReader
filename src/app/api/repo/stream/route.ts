import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { errorResponse } from "@/lib/apiResponse";
import Readme from "@/modules/readme/readme.model";
import { logger } from "@/lib/logger";

// import { aiService } from "@/modules/ai/ai.service";
// import Repository from "@/modules/repo/repository.model";
// import Analysis from "@/modules/analysis/analysis.model";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const repoId = searchParams.get("repoId");

    if (!repoId) return errorResponse("repoId is required", 400);

    const readme = await Readme.findOne({ repoId, isLatest: true });
    if (!readme || !readme.content) {
      return errorResponse("README not found", 404);
    }

    logger.info("STREAM", "Streaming saved README", { repoId });

    const content = readme.content;
    const chunkSize = 20;

    const stream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < content.length; i += chunkSize) {
          const chunk = content.slice(i, i + chunkSize);
          controller.enqueue(new TextEncoder().encode(chunk));

          // Small delay between chunks for the typing effect
          await new Promise((res) => setTimeout(res, 15));
        }
        controller.close();
      },
    });

    // const repository = await Repository.findById(repoId);
    // if (!repository) return errorResponse("Repository not found", 404);

    // const analysis = await Analysis.findOne({ repoId });
    // if (!analysis) return errorResponse("Analysis not found", 404);

    // const stream = await aiService.streamReadme({
    //   repoName: repository.repoName,
    //   explanation: analysis.explanation,
    //   folderTree: [],
    //   packageJson: null,
    // });

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