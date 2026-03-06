import { connectDB } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/apiResponse";
import { handleApiError } from "@/lib/errorHandler";
import Readme from "@/modules/readme/readme.model";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ versionId: string }> }
) {
  try {
    await connectDB();
    const { versionId } = await params;

    const version = await Readme.findById(versionId);
    if (!version) return errorResponse("Version not found", 404);

    await Readme.updateMany(
      { repoId: version.repoId },
      { isLatest: false }
    );

    await Readme.findByIdAndUpdate(versionId, { isLatest: true });

    return successResponse({ message: "Version restored" }, 200);
  } catch (error) {
    return handleApiError(error);
  }
}