import { Injectable } from "@nestjs/common";
import { VideoService } from "../domain/services/video.service";
import { VideoDto } from "../presentation/video.dto";

@Injectable()
export class UploadVideoCommand {
  constructor(
    private readonly videoService: VideoService
  ) {}

  async execute(userId: string, file: VideoDto) {
    const data = await this.videoService.createMultipartUpload(file)
    return data;
  }
}