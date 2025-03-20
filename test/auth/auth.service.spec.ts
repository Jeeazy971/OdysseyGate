// test/auth/auth.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from '../../src/auth/dto/register-user.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('AuthService', () => {
    let service: AuthService;
    let userRepositoryMock: MockRepository<UserEntity>;

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

        service = module.get<AuthService>(AuthService);
    });

    it('should register a new user successfully', async () => {
        // Simuler qu'aucun utilisateur n'existe pour l'email donné
        userRepositoryMock.findOneBy.mockResolvedValue(null);
        // Simuler la création en mémoire de l'utilisateur
        userRepositoryMock.create.mockImplementation((dto) => dto);
        // Simuler la sauvegarde et retourner un utilisateur avec un id généré
        userRepositoryMock.save.mockImplementation(async (user) => ({
            ...user,
            id: 1,
        }));

        const dto: RegisterUserDto = {
            nom: 'Doe',
            prenom: 'John',
            email: 'john.doe@example.com',
            password: 'mypassword',
            confirmPassword: 'mypassword',
        };

        const result = await service.register(dto);
        expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({ email: dto.email });
        expect(userRepositoryMock.save).toHaveBeenCalled();
        expect(result).toHaveProperty('id', 1);
        // Vérifier que le mot de passe est bien haché
        const isHashed = await bcrypt.compare(dto.password, result.password);
        expect(isHashed).toBe(true);
    });

    it('should throw a ConflictException if email already exists', async () => {
        // Simuler qu'un utilisateur existe déjà avec cet email
        userRepositoryMock.findOneBy.mockResolvedValue({ id: 42, email: 'existing@example.com' });
        const dto: RegisterUserDto = {
            nom: 'Alice',
            prenom: 'Smith',
            email: 'existing@example.com',
            password: 'secret123',
            confirmPassword: 'secret123',
        };

        await expect(service.register(dto)).rejects.toThrow(ConflictException);
    });
});
