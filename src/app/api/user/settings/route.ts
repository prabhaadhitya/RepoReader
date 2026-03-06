import { connectDB } from "@/lib/db";
import { successResponse } from "@/lib/apiResponse";
import { handleApiError } from "@/lib/errorHandler";
import User from "@/modules/user/user.model";

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const user = await User.findOneAndUpdate(
      { email: body.email },
      body,
      { new: true }
    );

    return successResponse(user, 201);
  } catch (error) {
    return handleApiError(error);
  }
}