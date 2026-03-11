import Analysis from "./analysis.model";
import Readme from "../readme/readme.model";
import Repository from "../repo/repository.model";
import { githubService } from "@/services/github.service";
import { repoService } from "../repo/repo.service";
import { aiService } from "../ai/ai.service";
import { readmeService } from "../readme/readme.service";
import { detectTechStack, calculateDifficulty } from "./analysis.utils";
import type { Explanation } from "@/types";
import { logger } from "@/lib/logger";

export const analysisService = {

  async analyzeRepository(repoUrl: string, userId: string | null) {
    logger.info("ANALYSIS", "Starting analysis", { repoUrl, userId });

    const repoData = await githubService.getRepoData(repoUrl);
    logger.info("ANALYSIS", "GitHub data fetched", { repoName: repoData.repoName });

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
    logger.info("ANALYSIS", "Repository saved", { repoId: String(repository._id) });

    const existingAnalysis = await Analysis.findOne({ repoId: repository._id });
    const existingReadme = await Readme.findOne({ repoId: repository._id, isLatest: true });

    if (existingAnalysis && existingReadme) {
      logger.info("ANALYSIS", "Analysis already exists, skipping AI calls", {
        repoId: String(repository._id),
      });
      return {
        repository,
        analysis: existingAnalysis,
        readme: existingReadme,
        isNew: false,
      };
    }

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
    logger.info("ANALYSIS", "Analysis saved", { analysisId: String(analysis._id) });

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
    logger.info("ANALYSIS", "Analysis complete", {
      repoId: String(repository._id),
      userId,
    });

    return {
      repository,
      analysis,
      readme,
      isNew: true,
    };
  },

  async regenerateReadme(repoId: string, userId: string | null) {
    logger.info("ANALYSIS", "Regenerating README", { repoId, userId });

    const repository = await Repository.findById(repoId);
    if (!repository) throw new Error("Repository not found");

    const analysis = await Analysis.findOne({ repoId });
    if (!analysis) throw new Error("Analysis not found");

    const readmeContent = await aiService.generateReadme({
      repoName: repository.repoName,
      explanation: analysis.explanation,
      folderTree: [],
      packageJson: null,
    });

    const readme = await readmeService.saveReadme(
      repository._id,
      analysis._id,
      readmeContent,
      userId
    );

    logger.info("ANALYSIS", "README regenerated", { repoId });

    return { readme };
  },
};
