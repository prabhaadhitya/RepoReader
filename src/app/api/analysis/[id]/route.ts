import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { handleApiError } from "@/lib/errorHandler";
import Analysis from "@/modules/analysis/analysis.model";
import Repository from "@/modules/repo/repository.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params; 

    const repository = await Repository.findById(id);    
    if (!repository) return errorResponse("Repository not found", 404);

    const analysis = await Analysis.findOne({ repoId: id });

    return successResponse({ repository, analysis }, 200);
  } catch (error) {
    return handleApiError(error);
  }
}
