import Analysis from "./analysis.model";
import { githubService } from "@/services/github.service";
import { repoService } from "../repo/repo.service";
import { aiService } from "../ai/ai.service";
import { readmeService } from "../readme/readme.service";
import { detectTechStack, calculateDifficulty } from "./analysis.utils";
import type { Explanation } from "@/types";

export const analysisService = {

  async analyzeRepository(repoUrl: string, userId: string) {
    const repoData = await githubService.getRepoData(repoUrl);
    const techStack = detectTechStack(repoData.packageJson);
    const difficulty = calculateDifficulty(repoData.folderTree, techStack)

    const repository = await repoService.createOrUpdateRepo({
      repoUrl,
      repoName: repoData.repoName,
      owner: repoData.owner,
      primaryLanguage: repoData.primaryLanguage,
      userId,
      techStack: techStack.map((name) => ({ name, description: "" })),
      structure: repoData.structure,
      difficulty
    });

    const explanation: Explanation = await aiService.generateExplanation({
      repoName: repoData.repoName,
      description: repoData.description,
      folderTree: repoData.folderTree,
      packageJson: repoData.packageJson,
      techStack,
      difficulty,
    });

    const analysis = await Analysis.create({
      repoId: repository._id,
      userId,
      explanation,
    });

    const readmeContent = await aiService.generateReadme({
      repoName: repoData.repoName,
      explanation,
      folderTree: repoData.folderTree,
      packageJson: repoData.packageJson,
    });

    const readme = await readmeService.saveReadme(
      repository._id,
      analysis._id,
      readmeContent,
      userId
    );

    return {
      repository,
      analysis,
      readme,
    };
  },
};
