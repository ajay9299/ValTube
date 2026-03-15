import { User } from "../entities/user.entity";

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
    save: (user:User) => Promise<void>;
    findByUserId: (userId: string) => Promise<User | null>;
}