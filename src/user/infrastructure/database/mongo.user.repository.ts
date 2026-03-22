import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/domain/entities/user.entity";
import { UserRepository } from "src/user/domain/repositories/user.repository";

@Injectable()
export class MongoUserRepository implements UserRepository {
    constructor(
        @InjectModel('User') private readonly userModel: Model<any>,
    ) { }

    async save(user: any): Promise<void> {
        await this.userModel.findOneAndUpdate(
            { userId: user.userId },
            {
                ...user,
                updatedAt: new Date(),
            },
            { upsert: true, new: true, setDefaultsOnInsert: true },
        );
    }

    async findByUserId(userId: string): Promise<User | null> {
        const raw = await this.userModel.findOne({ userId });
        return raw ? User.fromPrimitives(raw) : null;
    }
}