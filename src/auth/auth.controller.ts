import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAuthCommand } from './command/auth.create.command';
import { CreateUserDto } from './presentation/create.auth.dto';
import { LoginAuthCommand } from './command/auth.login.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly createAuthCommand: CreateAuthCommand, private readonly loginAuthCommand: LoginAuthCommand) {}
  @Get()
  getHello(): string {
    return 'Hello Auth!';
  }

  @Post()
  async createAuth(@Body() CreateUserDto: CreateUserDto) {
    const { username, password } = CreateUserDto;
    return await this.createAuthCommand.execute(username, password);
  }

  @Post('login')
  async login(@Body() CreateUserDto: CreateUserDto) {
    const { username, password } = CreateUserDto;
    return await this.loginAuthCommand.execute(username, password);
  }
}
