import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './infrastructure/schema/user.schema';
import { UserProfileCommand } from './command/user.profile.create.command';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { MongoUserRepository } from './infrastructure/database/mongo.user.repository';
import { GetUserProfileCommand } from './command/user.profile.get.command';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
  ])],
  controllers: [UserController],
  providers: [UserService, UserProfileCommand, GetUserProfileCommand, { provide: USER_REPOSITORY, useClass: MongoUserRepository }],
})
export class UserModule { }
