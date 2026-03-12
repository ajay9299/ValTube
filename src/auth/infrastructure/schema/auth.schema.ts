import { Schema } from 'mongoose';

export const AuthSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    username: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});