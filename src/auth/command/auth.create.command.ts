// 👉 Notice:
// No Mongo
// No Express
// No DTO
// Pure business logic

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY } from '../domain/repositories/auth.repository';
import type { AuthRepository } from '../domain/repositories/auth.repository';
import { Auth } from '../domain/entities/auth.entity';
import { Types } from 'mongoose';

@Injectable()
export class CreateAuthCommand {
  constructor( 
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository
  ) {}

  async execute(username: string, password: string) {
    const existingAuth = await this.authRepository.findByUsername(username);

    if (existingAuth) {
        throw new BadRequestException('Username already exists', {
            cause: new Error(),
            description: 'The provided username is already in use. Please choose a different username.',
        });
    }

    const userId = new Types.ObjectId();

    const user = new Auth(userId as unknown as string, username, password);

    await this.authRepository.save(user);

    return user;
  }
}