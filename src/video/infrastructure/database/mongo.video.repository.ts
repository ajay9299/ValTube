import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { VideoRepository } from "src/video/domain/repository/video.repository";

@Injectable()
export class MongoVideoRepository implements VideoRepository {
    constructor(
        @InjectModel('Video') private readonly videoModel: Model<any>
    ) { }

    async save(video: any): Promise<void> {
        await new this.videoModel(video).save();
    }

    async findById(id: string): Promise<any> {
        return await this.videoModel.findById(id);
    }

    async findByUserId(userId: string): Promise<any[]> {
        return await this.videoModel.find({ userId });
    }
}