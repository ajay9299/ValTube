import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserRepository } from "src/user/domain/repositories/user.repository";

@Injectable()
export class MongoUserRepository implements UserRepository {
    constructor(
        @InjectModel('User') private readonly userModel: Model<any>,
    ) { }

    async save(user: any): Promise<void> {
        await new this.userModel(user).save();
    }

    async findByUserId(userId: string): Promise<any> {
        return await this.userModel.findOne({ userId });
    }
}