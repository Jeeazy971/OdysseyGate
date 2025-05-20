// src/auth/dto/register-user.dto.ts

import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
    @ApiProperty({ example: 'Doe', description: 'Nom de l\'utilisateur' })
    @IsString()
    nom: string;

    @ApiProperty({ example: 'John', description: 'Prénom de l\'utilisateur' })
    @IsString()
    prenom: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Adresse email de l\'utilisateur' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'mypassword', description: 'Mot de passe (minimum 6 caractères)' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'mypassword', description: 'Confirmation du mot de passe' })
    @IsString()
    @MinLength(6)
    confirmPassword: string;
}
