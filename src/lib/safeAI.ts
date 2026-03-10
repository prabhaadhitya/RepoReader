import { logger } from "./logger";

type SafeAIResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; isQuotaError: boolean };

export async function safeAI<T>(
  fn: () => Promise<T>,
  tag = "AI"
): Promise<SafeAIResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    const err = error as { message?: string };
    const message = err.message || "Unknown AI error";
    const isQuotaError = message.includes("429");

    if (isQuotaError) {
      logger.warn(tag, "Quota exceeded", { message });
    } else {
      logger.error(tag, "AI call failed", { message });
    }

    return {
      success: false,
      error: isQuotaError
        ? "AI service is temporarily unavailable. Please try again in a few minutes."
        : message,
      isQuotaError,
    };
  }
}