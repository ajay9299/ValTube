import { Schema } from "mongoose";

export const VideoSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: String,
    description: String,
    url: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})