import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from 'src/auth/guard/auth.guard';
import { UploadVideoCommand } from './command/video.upload.command';
import { CompleteUploadDto, UploadPartUrlDto, VideoDto } from './presentation/video.dto';
import { UploadVideoUrlCommand } from './command/video.uploadUrl.command';
import { UploadCompleteCommand } from './command/video.uploadComplete.command';
import { GetMyVideoQuery } from './query/getMyVideo.query';

@Controller('video')
export class VideoController {
  constructor(
    private readonly UploadVideoCommand: UploadVideoCommand,
    private readonly UploadVideoUrlCommand: UploadVideoUrlCommand,
    private readonly UploadCompleteCommand: UploadCompleteCommand,
    private readonly getMyVideosCommand: GetMyVideoQuery
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

  @Post('upload-complete')
  completeUpload(@Request() req, @Body() body: CompleteUploadDto) {
    const userId = req.user.userId;
    return this.UploadCompleteCommand.execute(userId, body);
  }

  @Get('my-videos')
  getMyVideos(@Request() req) {
    const userId = req.user.userId;
    return this.getMyVideosCommand.execute(userId);
  }
}
