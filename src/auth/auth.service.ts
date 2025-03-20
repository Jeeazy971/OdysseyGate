import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
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

    async login(dto: LoginDto): Promise<{ access_token: string }> {
        // 1. Trouver l'utilisateur par email
        const user = await this.userRepository.findOneBy({ email: dto.email });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials (email)');
        }

        // 2. Comparer le mot de passe
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials (password)');
        }

        // 3. Générer un token
        const payload = { sub: user.id, email: user.email };
        const access_token = await this.jwtService.signAsync(payload);

        // 4. Retourner le token
        return { access_token };
    }
}
