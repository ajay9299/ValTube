import { Injectable } from "@nestjs/common";
import { VideoService } from "../domain/services/video.service";
import { UploadPartUrlDto } from "../presentation/video.dto";

@Injectable()
export class UploadVideoUrlCommand {
  constructor(
    private readonly videoService: VideoService
  ) { }

  async execute(info: UploadPartUrlDto) {
    const data = await this.videoService.getUploadPartUrl(info.key, info.uploadId, info.partNumber);
    return data;
  }
}