import { Inject } from "@nestjs/common";
import { VIDEO_REPOSITORY } from "../domain/repository/video.repository";
import type { VideoRepository } from "../domain/repository/video.repository";
import { VideoService } from "../domain/services/video.service";


export class UploadVideoCommand {
  constructor(
    @Inject(VIDEO_REPOSITORY)
    private readonly videoRepository: VideoRepository,
    private readonly VideoService: VideoService

  ) {}

  async execute(userId: string, file: Express.Multer.File) {
    const data = this.VideoService.uploadFile(file);
    
  }
}