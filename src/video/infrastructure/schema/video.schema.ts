import { Schema } from "mongoose";

export const VideoSchema = new Schema({
    title: String,
    description: String,
    url: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})