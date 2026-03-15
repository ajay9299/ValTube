import { IsEnum, IsString, MaxLength, MinLength } from "class-validator";

export class UserProfileDto {
    
    @IsString()
    @MinLength(1)
    @MaxLength(15)
    firstName: string;

    @IsString()
    @MinLength(2)
    @MaxLength(15)
    lastName: string;

    @IsEnum(['male', 'female','other'])
    gender: string;

}

enum Gender {
    Male = 'male',
    Female = 'female',
    other = 'other'
}

export interface UserProfileInterface {
    firstName: string;
    lastName: string;
    gender: Gender;
}
