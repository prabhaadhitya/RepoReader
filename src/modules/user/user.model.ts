import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    githubId: String,
    name: String,
    avatar: String,
    plan: { type: String, default: "free" },
    credits: { type: Number, default: 10 },
    beginnerMode: { type: Boolean, default: true },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;