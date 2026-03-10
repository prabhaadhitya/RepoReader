import { errorResponse } from './apiResponse';
import { logger } from './logger';

export async function handleApiError(error: unknown) {
  const err = error as { message?: string };

  logger.error("API", err.message || "Unknown error");

  if (err.message?.includes("429")) {
    return errorResponse("AI service is temporarily unavailable. Please try again in a few minutes.", 429);
  }

  if (err.message) {
    return errorResponse(err.message, 500);
  }

  return errorResponse("Internal Server Error", 500);
}