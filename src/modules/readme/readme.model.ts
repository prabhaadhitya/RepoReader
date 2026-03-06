import mongoose, { Schema } from "mongoose";

const ReadmeSchema = new Schema({
    repoId: { type: mongoose.Schema.Types.ObjectId, ref: "Repository" },
    analysisId: { type: mongoose.Schema.Types.ObjectId, ref: "Analysis" },
    userId: { type: String, required: false },
    content: { type: String, required: true },
    version: String,
    isLatest: { type: Boolean, default: true },
  }, { timestamps: true });

  export default mongoose.models.Readme || mongoose.model("Readme", ReadmeSchema);