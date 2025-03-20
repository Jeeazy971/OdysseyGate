import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from '../../src/auth/dto/register-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('AuthService - Registration', () => {
    let service: AuthService;
    let userRepositoryMock: MockRepository<UserEntity>;
    let jwtServiceMock: Partial<JwtService>;

    beforeEach(async () => {
        userRepositoryMock = {
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
        };
        jwtServiceMock = {
            signAsync: jest.fn().mockResolvedValue('dummyToken'),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: userRepositoryMock,
                },
                {
                    provide: JwtService,
                    useValue: jwtServiceMock,
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

describe('AuthService - Login', () => {
    let authService: AuthService;
    let userRepositoryMock: Partial<Repository<UserEntity>>;
    let jwtServiceMock: Partial<JwtService>;

    beforeEach(async () => {
        userRepositoryMock = {
            findOneBy: jest.fn(),
        };
        jwtServiceMock = {
            signAsync: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: userRepositoryMock,
                },
                {
                    provide: JwtService,
                    useValue: jwtServiceMock,
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it('should throw UnauthorizedException if email not found', async () => {
        (userRepositoryMock.findOneBy as jest.Mock).mockResolvedValue(null);
        const dto: LoginDto = { email: 'notfound@example.com', password: 'test123' };
        await expect(authService.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password mismatch', async () => {
        (userRepositoryMock.findOneBy as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'john.doe@example.com',
            password: 'hashedpassword',
        });
        // Utilisation de mockImplementation pour forcer le retour de false
        jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);
        const dto: LoginDto = { email: 'john.doe@example.com', password: 'wrongpass' };
        await expect(authService.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should return access_token if credentials are valid', async () => {
        (userRepositoryMock.findOneBy as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'john.doe@example.com',
            password: 'hashedpassword',
        });
        // Utilisation de mockImplementation pour forcer le retour de true
        jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
        (jwtServiceMock.signAsync as jest.Mock).mockResolvedValue('mockedToken');
        const dto: LoginDto = { email: 'john.doe@example.com', password: 'correctpass' };
        const result = await authService.login(dto);
        expect(result).toEqual({ access_token: 'mockedToken' });
    });
});
