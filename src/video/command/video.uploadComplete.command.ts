import { Inject, Injectable } from "@nestjs/common";
import { VideoService } from "../domain/services/video.service";
import { CompleteUploadDto } from "../presentation/video.dto";
import { VIDEO_REPOSITORY } from "../domain/repository/video.repository";
import type { VideoRepository } from "../domain/repository/video.repository";

@Injectable()
export class UploadCompleteCommand {
    constructor(
        @Inject(VIDEO_REPOSITORY)
        private readonly videoRepository: VideoRepository,
        private readonly videoService: VideoService
    ) { }

    async execute(userId: string, info: CompleteUploadDto) {
        const { key, uploadId, parts } = info;
        const data = await this.videoService.completeUpload(key, uploadId, parts);
        console.log('Upload complete data:', data);
        const savedVideo = await this.videoRepository.save({
            title: '',
            description: '',
            url: data.Location as string,
            userId: userId
        });
        return savedVideo;
    }
}