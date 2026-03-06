import Repository from "./repository.model";

export const repoService = {
    
    async createOrUpdateRepo(data: any) {
        return Repository.findOneAndUpdate(
            { repoUrl: data.repoUrl }, 
            data,
            { new: true, upsert: true }
        );
    },
};