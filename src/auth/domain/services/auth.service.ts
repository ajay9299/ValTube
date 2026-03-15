import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId, Types } from 'mongoose';
import { VaultService } from './vault.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly vaultService: VaultService
    ) {}

    async logIn(
        userId: Types.ObjectId
    ): Promise<{ access_token: string }> {
        const keys = await this.vaultService.getJwtKeys();

        const privateKey = `-----BEGIN RSA PRIVATE KEY-----
${keys.privateKey}  
-----END RSA PRIVATE KEY-----`;
        const payload = { userId };
        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: privateKey,
                expiresIn: '10m',
                algorithm: 'RS256',
            }),
        };
    }
}
