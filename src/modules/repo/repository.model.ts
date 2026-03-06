import mongoose, { Schema } from "mongoose";

const RepositorySchema = new Schema({
    repoUrl: { type: String, required: true, index: true },
    repoName: String,
    owner: String,
    primaryLanguage: String,
    techStack: [{ name: String, description: String }],
    structure: { type: Schema.Types.Mixed, default: [] },
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"] },
    structureSummary: String,
    userId: { type: String, required: false },
  }, { timestamps: true }
);

export default mongoose.models.Repository || mongoose.model("Repository", RepositorySchema);