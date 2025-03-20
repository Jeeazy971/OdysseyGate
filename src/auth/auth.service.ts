// src/auth/auth.service.ts

import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async register(dto: RegisterUserDto): Promise<UserEntity> {
        // Vérifier si l'email existe déjà
        const existingUser = await this.userRepository.findOneBy({ email: dto.email });
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // Créer l'utilisateur
        const user = this.userRepository.create({
            nom: dto.nom,
            prenom: dto.prenom,
            email: dto.email,
            password: hashedPassword,
        });

        // Sauvegarder l'utilisateur en base de données
        return this.userRepository.save(user);
    }
}
