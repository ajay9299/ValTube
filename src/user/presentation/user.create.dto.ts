import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UserProfileDto {
    
    @IsString()
    @MinLength(1)
    @MaxLength(15)
    @IsOptional()
    firstName: string;

    @IsString()
    @MinLength(2)
    @MaxLength(15)
    @IsOptional()
    lastName: string;

    @IsEnum(['male', 'female','other'])
    @IsOptional()
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
