// src/auth/auth.controller.ts

import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from './entities/user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: `Inscription d\'un nouvel utilisateur` })
    @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.', type: UserEntity })
    @ApiResponse({ status: 400, description: 'Les mots de passe ne correspondent pas ou les données sont invalides.' })
    @ApiResponse({ status: 409, description: 'L\'email est déjà utilisé.' })
    async register(@Body() dto: RegisterUserDto): Promise<UserEntity> {
        if (dto.password !== dto.confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }
        return this.authService.register(dto);
    }
}
