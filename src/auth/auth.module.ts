import { Module } from '@nestjs/common';
import { AuthService } from './domain/services/auth.service';
import { AuthController } from './auth.controller';
import { CreateAuthCommand } from './command/auth.create.command';
import { AUTH_REPOSITORY } from './domain/repositories/auth.repository';
import { MongoAuthRepository } from './infrastructure/database/mongo.auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './infrastructure/schema/auth.schema';
import { LoginAuthCommand } from './command/auth.login.command';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([
      { name: 'Auth', schema: AuthSchema },
    ]),],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    CreateAuthCommand,
    LoginAuthCommand,
    { provide: AUTH_REPOSITORY, useClass: MongoAuthRepository }
  ],
})
export class AuthModule {}
