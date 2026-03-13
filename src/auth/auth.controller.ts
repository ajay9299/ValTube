import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { CreateAuthCommand } from './command/auth.create.command';
import { CreateUserDto } from './presentation/create.auth.dto';
import { LoginAuthCommand } from './command/auth.login.command';
import { AuthGuard, Public } from './guard/auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly createAuthCommand: CreateAuthCommand, private readonly loginAuthCommand: LoginAuthCommand) {}
  @Public()
  @Get()
  getHello(): string {
    return 'Hello Auth!';
  }

  @Public()
  @Post()
  async createAuth(@Body() CreateUserDto: CreateUserDto) {
    const { username, password } = CreateUserDto;
    return await this.createAuthCommand.execute(username, password);
  }

  @Public()
  @Post('login')
  async login(@Body() CreateUserDto: CreateUserDto) {
    const { username, password } = CreateUserDto;
    return await this.loginAuthCommand.execute(username, password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
