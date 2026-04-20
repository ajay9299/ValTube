import { Inject, Injectable } from "@nestjs/common";
import { VIDEO_REPOSITORY, type VideoRepository } from "../domain/repository/video.repository";

@Injectable()
export class GetMyVideoQuery {

    constructor(
        @Inject(VIDEO_REPOSITORY)
        private readonly videoRepository: VideoRepository,
    ) { }

    async execute(userId: string) {
        const videos = await this.videoRepository.findByUserId(userId);
        return videos;
    }
}   