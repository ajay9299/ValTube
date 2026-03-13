import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule, UserModule, VideoModule,
    MongooseModule.forRoot('mongodb://admin:password@localhost:27017/valtube?authSource=admin'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
