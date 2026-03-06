export function detectTechStack(packageJson: string | null) {
    if (!packageJson) return [];

    try {
        const parsed = JSON.parse(packageJson);
        const deps = {
            ...parsed.dependencies,
            ...parsed.devDependencies,
        };

        const stack: string[] = [];

        if (deps.react) stack.push("React");
        if (deps.next) stack.push("Next.js");
        if (deps.express) stack.push("Express");
        if (deps.mongoose) stack.push("MongoDB");
        if (deps.typescript) stack.push("TypeScript");
        if (deps.tailwindcss) stack.push("TailwindCSS");

        return stack
    } catch {
        return [];
    }
}

export function calculateDifficulty(
  folderTree: string[],
  techStack: string[]
) {
    const folderCount = folderTree.length;

    if (folderCount < 20 && techStack.length <= 2) {
        return "beginner";
    }

    if (folderCount < 60) {
        return "intermediate";
    }

    return "advanced";
}