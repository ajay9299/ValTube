import { Inject, UnauthorizedException } from "@nestjs/common";
import { AUTH_REPOSITORY } from "../domain/repositories/auth.repository";
import type { AuthRepository } from "../domain/repositories/auth.repository";
import { AuthService } from "../domain/services/auth.service";
import { Types } from "mongoose";

export class LoginAuthCommand {
    constructor(
        @Inject(AUTH_REPOSITORY)
        private readonly authRepository: AuthRepository,
        private readonly authService: AuthService
    ) { }

    async execute(username: string, password: string) {
        const existingAuth = await this.authRepository.findByUsername(username);
        
        if (!existingAuth || existingAuth.password !== password) {
            throw new UnauthorizedException('Invalid username or password', {
                cause: new Error(),
                description: 'Please check your credentials and try again.',
            });
        }

        return this.authService.logIn(existingAuth.userId as unknown as Types.ObjectId);
            
    }
}