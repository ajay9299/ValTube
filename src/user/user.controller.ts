import { Body, Controller, Get, Patch, Request } from '@nestjs/common';
import { UserProfileDto } from './presentation/user.create.dto';
import { UserProfileCommand } from './command/user.profile.create.command';
import { GetUserProfileCommand } from './command/user.profile.get.command';
import { Public } from 'src/auth/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly UserProfileCommand: UserProfileCommand,
    private readonly GetUserProfileCommand: GetUserProfileCommand
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return 'Hello User!';
  }

  @Patch()
  async updateUser(@Request() req, @Body() UserProfileDto: UserProfileDto) {
    const userId = req.user?.userId;
    console.log('userId', userId);
    return await this.UserProfileCommand.execute(UserProfileDto, userId);
  }

  @Get('/profile')
  async getUserProfile(@Request() req) {
    const userId = req.user?.userId;
    console.log('userId', userId);
    return await this.GetUserProfileCommand.execute(userId);
  }
}
