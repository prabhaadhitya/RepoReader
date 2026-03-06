import mongoose, { Schema } from "mongoose";

const AnalysisSchema = new Schema({
    repoId: { type: mongoose.Schema.Types.ObjectId, ref: "Repository" },
    userId: { type: String, required: false },
    explanation: {
      what: String,
      who: String,
      features: [String],
      techStack: [{ name: String, description: String }],
    },
    techExplanation: String,
    folderExplanation: String,
    commands: [String],
    score: Number,
    aiTokensUsed: Number,
  }, { timestamps: true });

  export default mongoose.models.Analysis || mongoose.model("Analysis", AnalysisSchema);