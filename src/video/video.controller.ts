import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { VideoService } from './video.service';
import { Public } from 'src/auth/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Public()
  @Get()
  getHello(): string {
    return 'Hello Video!';
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return "File uploaded successfully";
  }

}
