import { connectDB } from "@/lib/db";
import { successResponse } from "@/lib/apiResponse";
import { handleApiError } from "@/lib/errorHandler";
import Readme from "@/modules/readme/readme.model";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ repoId: string }>}
){
  try {
    await connectDB();
    const { repoId } = await params;

    const versions = await Readme.find({
      repoId: repoId,
    }).sort({ createdAt: -1 }).limit(5);

    return successResponse(versions, 200);
  } catch (error) {
    return handleApiError(error);
  }
}