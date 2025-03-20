// test/auth/auth.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from '../../src/auth/dto/register-user.dto';

// Petit helper pour générer un mock de repository
type MockType<T> = {
    [P in keyof T]?: jest.Mock<any>;
};

describe('AuthService', () => {
    let authService: AuthService;
    let userRepositoryMock: MockType<Repository<UserEntity>>;

    beforeEach(async () => {
        userRepositoryMock = {
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: userRepositoryMock,
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it('should register a new user successfully', async () => {
        // Simuler que l'email n'est pas déjà utilisé
        userRepositoryMock.findOneBy.mockResolvedValue(null);
        userRepositoryMock.create.mockImplementation((entity) => entity);
        userRepositoryMock.save.mockImplementation(async (entity) => ({
            ...entity,
            id: 1, // on simule un ID auto-généré
        }));

        // Données de test
        const dto: RegisterUserDto = {
            nom: 'John',
            prenom: 'Doe',
            email: 'john.doe@example.com',
            password: 'password',
            confirmPassword: 'password',
        };

        const result = await authService.register(dto);

        expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({ email: 'john.doe@example.com' });
        expect(userRepositoryMock.save).toHaveBeenCalledTimes(1);
        expect(result).toHaveProperty('id', 1);
        expect(result).toHaveProperty('email', 'john.doe@example.com');
        // Vérifier que le mot de passe est haché
        const isHashed = await bcrypt.compare(dto.password, result.password);
        expect(isHashed).toBe(true);
    });

    it('should throw ConflictException if email is already taken', async () => {
        // Simuler qu'un user existe déjà avec cet email
        userRepositoryMock.findOneBy.mockResolvedValue({ id: 42, email: 'existing@example.com' });

        const dto: RegisterUserDto = {
            nom: 'Alice',
            prenom: 'Smith',
            email: 'existing@example.com',
            password: 'mypassword',
            confirmPassword: 'mypassword',
        };

        await expect(authService.register(dto)).rejects.toThrow(ConflictException);
    });
});
