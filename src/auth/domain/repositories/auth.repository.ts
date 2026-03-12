import { Auth } from "../entities/auth.entity";

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface AuthRepository {
  save(user: Auth): Promise<void>;
  findByUsername(username: string): Promise<Auth | null>;
}