// src/auth/dto/login.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'john.doe@example.com', description: 'Email de l\'utilisateur' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'mypassword', description: 'Mot de passe de l\'utilisateur' })
    @IsString()
    password: string;
}
