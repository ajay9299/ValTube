import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './domain/services/video.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from './infrastructure/schema/video.schema';
import { VIDEO_REPOSITORY } from './domain/repository/video.repository';
import { MongoVideoRepository } from './infrastructure/database/mongo.video.repository';
import { UploadVideoCommand } from './command/video.upload.command';
import { UploadVideoUrlCommand } from './command/video.uploadUrl.command';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Video', schema: VideoSchema },
  ]),],
  controllers: [VideoController],
  providers: [UploadVideoCommand, UploadVideoUrlCommand, VideoService, { provide: VIDEO_REPOSITORY, useClass: MongoVideoRepository}],
})
export class VideoModule { }
