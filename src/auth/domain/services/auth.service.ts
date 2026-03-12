import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId, Types } from 'mongoose';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService
    ) {}

    async logIn(
        userId: Types.ObjectId
    ): Promise<{ access_token: string }> {
      
        const payload = { userId };
        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: '123',
                expiresIn: '1m',
            }),
        };
    }
}
