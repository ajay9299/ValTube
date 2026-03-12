import { Controller, Get } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getHello(): string {
    return 'Hello Video!';
  }
}
