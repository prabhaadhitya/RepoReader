import Readme from './readme.model';

export const readmeService = {
    
    async saveReadme(repoId: string, analysisId: string, content: string, userId: string) {
        await Readme.updateMany(
            { repoId },
            { isLatest: false }
        );

        const count = await Readme.countDocuments({ repoId });

        return Readme.create({
            repoId,
            analysisId,
            content,
            userId,
            version: `v${count + 1}`,
            isLatest: true,
        });
    },
};