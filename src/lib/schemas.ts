import { z } from "zod";

export const repoUrlSchema = z.object({
  repoUrl: z
    .string()
    .min(1, "Repo URL is required")
    .url("Please enter a valid URL")
    .refine((url) => {
        try {
          const parsed = new URL(url);
          const parts = parsed.pathname.split("/").filter(Boolean);
          return parsed.hostname === "github.com" && parts.length >= 2;
        } catch {
          return false;
        }
      },
      { message: "Please enter a valid GitHub repository URL (e.g. https://github.com/owner/repo)" }
    ),
});

export type RepoUrlInput = z.infer<typeof repoUrlSchema>;
