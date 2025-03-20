// src/auth/dto/register-user.dto.ts

import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    nom: string;

    @IsString()
    prenom: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @MinLength(6)
    confirmPassword: string;
}
