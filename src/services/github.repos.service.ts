import type { UserRepo } from "@/types";

export async function getUserRepos (accessToken: string): Promise<UserRepo[]> {
    const res = await fetch("https://api.github.com/user/repos?sort=updated&per_page=20", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
            // Accept: "application/vnd.github+json",
        }
    })
    if (!res.ok) return [];

    const repos = await res.json();

    return repos.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || "",
        url: repo.html_url,
        language: repo.language || "Unknown",
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at,
        isPrivate: repo.private,
    }));
}