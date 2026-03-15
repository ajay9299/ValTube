import { Body, Controller, Get, Patch, Request } from '@nestjs/common';
import { UserProfileDto } from './presentation/user.create.dto';
import { UserProfileCommand } from './command/user.profile.create.command';

@Controller('user')
export class UserController {
  constructor(private readonly UserProfileCommand: UserProfileCommand) {}

  @Get()
  getHello(): string {
    return 'Hello User!';
  }

  @Patch()
  async updateUser(@Request()req, @Body() UserProfileDto: UserProfileDto) {
    const userId = req.user?.userId;
    this.UserProfileCommand.execute(UserProfileDto, userId);
  }
}
