import { Inject } from "@nestjs/common";
import { USER_REPOSITORY} from "../domain/repositories/user.repository";
import type { UserRepository } from "../domain/repositories/user.repository";
import { UserProfileDto, UserProfileInterface } from "../presentation/user.create.dto";

export class UserProfileCommand {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository
    ) { }

    async execute(userProfile : UserProfileDto, userId: string) {
        console.log('userProfile', userProfile);
        console.log('userId', userId);
        const user = await this.userRepository.findByUserId(userId);

        if (!user) {
            throw new Error('User not found');
        }

       return
    }
}