import { Inject } from "@nestjs/common";
import { USER_REPOSITORY} from "../domain/repositories/user.repository";
import type { UserRepository } from "../domain/repositories/user.repository";
import { UserProfileDto } from "../presentation/user.create.dto";
import { User } from "../domain/entities/user.entity";

export class UserProfileCommand {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    async execute(userProfile: UserProfileDto, userId: string) {
        if (!userId) {
            throw new Error('Missing authenticated userId');
        }

        const existingUser: User | null = await this.userRepository.findByUserId(userId);

        if (!existingUser) {
            // Create a new user profile record
            const newUser = new User(
                userId,
                userProfile.firstName,
                userProfile.lastName,
                userProfile.gender,
            );

            await this.userRepository.save(newUser);
            return newUser;
        }

        existingUser.updateUser({
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            gender: userProfile.gender,
        });


        await this.userRepository.save(existingUser);
        return existingUser;
    }
}