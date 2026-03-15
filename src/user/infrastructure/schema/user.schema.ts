import { Schema } from "mongoose";

export const UserSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'Auth' },
    firstName: String,
    lastName: String,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})