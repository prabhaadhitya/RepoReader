import { errorResponse } from './apiResponse';

export async function handleApiError(error: any) {
  console.error("API ERROR:", error);

  if (error.message?.includes("429")) {
    return errorResponse("AI service is temporarily unavailable. Please try again in a few minutes.", 429);
  }

  if (error.message) {
    return errorResponse(error.message, 500);
  }

  return errorResponse("Internal Server Error", 500);
}