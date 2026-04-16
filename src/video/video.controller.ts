import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from 'src/auth/guard/auth.guard';
import { UploadVideoCommand } from './command/video.upload.command';
import { UploadPartUrlDto, VideoDto } from './presentation/video.dto';
import { UploadVideoUrlCommand } from './command/video.uploadUrl.command';

@Controller('video')
export class VideoController {
  constructor(
    private readonly UploadVideoCommand: UploadVideoCommand,
    private readonly UploadVideoUrlCommand: UploadVideoUrlCommand
  ) { }

  @Public()
  @Get()
  getHello(): string {
    return 'Hello Video!';
  }

  @Post('upload-key')
  uploadFile(@Request() req, @Body() videoDto: VideoDto) {
    const userId = req.user.userId;
    return this.UploadVideoCommand.execute(userId, videoDto);
  }

  @Post('upload-part-url')
  getUploadPartUrl(@Body() body: UploadPartUrlDto) {
    return this.UploadVideoUrlCommand.execute(body);
  }

}
