import { Controller, Get, Post, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Public } from 'src/auth/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './domain/services/video.service';
import { UploadVideoCommand } from './command/video.upload.command';

@Controller('video')
export class VideoController {
  constructor(private readonly UploadVideoCommand: UploadVideoCommand) {}

  @Public()
  @Get()
  getHello(): string {
    return 'Hello Video!';
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    const userId = req.user.userId;
    
    return this.UploadVideoCommand.execute(userId, file);
    // return "File uploaded successfully";
  }

}
