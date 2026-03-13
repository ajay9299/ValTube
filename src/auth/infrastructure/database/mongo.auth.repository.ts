// 👉 Infrastructure depends on Domain
// 👉 Domain does NOT depend on Infrastructure

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/domain/entities/auth.entity';
import { AuthRepository } from 'src/auth/domain/repositories/auth.repository';

@Injectable()
export class MongoAuthRepository implements AuthRepository {
  constructor(
    @InjectModel('Auth') private readonly userModel: Model<any>,
  ) {}

  async save(user: Auth): Promise<void> {
    await new this.userModel(user).save();
  }

  async findByUsername(username: string): Promise<Auth | null> {
    return await this.userModel.findOne({ username });
  }
}