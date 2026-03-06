import { connectDB } from "@/lib/db"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { handleApiError } from "@/lib/errorHandler";
import Readme from "@/modules/readme/readme.model";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ repoId: string }> }
){
  const session = await getServerSession(authOptions);
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    await connectDB();

    const { repoId } = await params;

    const readme = await Readme.findOne({
      repoId: repoId,
      isLatest: true,
    });

    return successResponse(readme, 200);
  } catch (error) {
    return handleApiError(error);
  }
}