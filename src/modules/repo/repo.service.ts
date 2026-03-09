import Repository from "./repository.model";
import type { RepoInput } from "@/types";

export const repoService = {
    
    async createOrUpdateRepo(data: RepoInput) {
        return Repository.findOneAndUpdate(
            { repoUrl: data.repoUrl },
            data,
            { returnDocument: "after", upsert: true }
        );
    },
};