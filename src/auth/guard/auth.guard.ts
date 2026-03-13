import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SetMetadata } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { Request } from 'express';
import { VaultService } from "../domain/services/vault.service";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector,
       private readonly vaultService: VaultService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
        const keys = await this.vaultService.getJwtKeys();
        const publickkey = `-----BEGIN PUBLIC KEY-----
${keys.publicKey}  
-----END PUBLIC KEY-----`;
      console.log('publicKey',publickkey);
      const payload = await this.jwtService.verifyAsync(token, {
        secret: publickkey});
    console.log('payload',payload);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
