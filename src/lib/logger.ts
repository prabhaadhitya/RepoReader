type LogLevel = "INFO" | "WARN" | "ERROR";

type LogContext = Record<string, string | number | boolean | null | undefined>;

function getTimestamp() {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

function formatContext(context?: LogContext) {
  if (!context || Object.keys(context).length === 0) return "";
  return " | " + Object.entries(context)
    .map(([key, value]) => `${key}: ${value}`)
    .join(" | ");
}

function log(level: LogLevel, tag: string, message: string, context?: LogContext) {
  const timestamp = getTimestamp();
  const ctx = formatContext(context);
  const line = `[${timestamp}] ${level.padEnd(5)} [${tag}] ${message}${ctx}`;

  if (level === "ERROR") {
    console.error(line);
  } else if (level === "WARN") {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  info: (tag: string, message: string, context?: LogContext) =>
    log("INFO", tag, message, context),

  warn: (tag: string, message: string, context?: LogContext) =>
    log("WARN", tag, message, context),

  error: (tag: string, message: string, context?: LogContext) =>
    log("ERROR", tag, message, context),
};