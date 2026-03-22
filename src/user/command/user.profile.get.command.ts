import { Inject } from "@nestjs/common";
import { User } from "../domain/entities/user.entity";
import { USER_REPOSITORY } from "../domain/repositories/user.repository";
import type { UserRepository } from "../domain/repositories/user.repository";

export class GetUserProfileCommand {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    async execute(userId: string) {
        const existingUser: User | null = await this.userRepository.findByUserId(userId);
        return existingUser;
    }
}