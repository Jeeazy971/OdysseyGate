// test/voyage/voyage.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VoyageService } from '../../src/voyage/voyage.service';
import { VoyageEntity } from '../../src/voyage/entities/voyage.entity';
import { Repository } from 'typeorm';
import { CreateVoyageDto } from '../../src/voyage/dto/create-voyage.dto';

type MockRepository<T = any> = {
  [P in keyof Omit<Repository<T>, 'manager'>]?: jest.Mock;
} & {
  manager: {
    findOne: jest.Mock;
  };
};

describe('VoyageService', () => {
  let service: VoyageService;
  let voyageRepositoryMock: MockRepository<VoyageEntity>;

  beforeEach(async () => {
    voyageRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      manager: {
        findOne: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoyageService,
        {
          provide: getRepositoryToken(VoyageEntity),
          useValue: voyageRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<VoyageService>(VoyageService);
  });

  it('should create a new voyage with required fields', async () => {
    const dto: CreateVoyageDto = {
      destination: 'Paris',
      dateDepart: '2025-04-10',
      dateArrivee: '2025-04-20',
      nombreVoyageurs: 2,
      villeDepart: 'Lyon',
    };

    voyageRepositoryMock.manager.findOne.mockResolvedValue({
      id: 1,
      nom: 'Doe',
      prenom: 'John',
      email: 'john.doe@example.com',
    });

    voyageRepositoryMock.create.mockImplementation((data) => data);
    voyageRepositoryMock.save.mockImplementation(async (entity) => ({
      ...entity,
      id: 1,
    }));

    const result = await service.createVoyage(dto, 1);

    expect(voyageRepositoryMock.manager.findOne).toHaveBeenCalledWith(
      expect.any(Function),
      { where: { id: 1 } },
    );

    expect(voyageRepositoryMock.create).toHaveBeenCalledWith({
      destination: 'Paris',
      dateDepart: new Date('2025-04-10'),
      dateArrivee: new Date('2025-04-20'),
      nombreVoyageurs: 2,
      villeDepart: 'Lyon',
      imageUrl: undefined,
      user: {
        id: 1,
        nom: 'Doe',
        prenom: 'John',
        email: 'john.doe@example.com',
      },
    });

    expect(voyageRepositoryMock.save).toHaveBeenCalled();
    expect(result.id).toBe(1);
    expect(result.destination).toBe('Paris');
  });

  it('should create a new voyage with optional fields', async () => {
    const dto: CreateVoyageDto = {
      destination: 'Paris',
      dateDepart: '2025-04-10',
      dateArrivee: '2025-04-20',
      nombreVoyageurs: 2,
      villeDepart: 'Lyon',
      imageUrl: 'https://example.com/paris.jpg',
    };

    voyageRepositoryMock.manager.findOne.mockResolvedValue({
      id: 1,
      nom: 'Doe',
      prenom: 'John',
      email: 'john.doe@example.com',
    });

    voyageRepositoryMock.create.mockImplementation((data) => data);
    voyageRepositoryMock.save.mockImplementation(async (entity) => ({
      ...entity,
      id: 2, // Par exemple, un id différent pour différencier le test
    }));

    const result = await service.createVoyage(dto, 1);

    expect(voyageRepositoryMock.manager.findOne).toHaveBeenCalledWith(
      expect.any(Function),
      { where: { id: 1 } },
    );

    expect(voyageRepositoryMock.create).toHaveBeenCalledWith({
      destination: 'Paris',
      dateDepart: new Date('2025-04-10'),
      dateArrivee: new Date('2025-04-20'),
      nombreVoyageurs: 2,
      villeDepart: 'Lyon',
      imageUrl: 'https://example.com/paris.jpg',
      user: {
        id: 1,
        nom: 'Doe',
        prenom: 'John',
        email: 'john.doe@example.com',
      },
    });

    expect(voyageRepositoryMock.save).toHaveBeenCalled();
    expect(result.id).toBe(2);
    expect(result.destination).toBe('Paris');
    expect(result.imageUrl).toBe('https://example.com/paris.jpg');
    expect(result.villeDepart).toBe('Lyon');
  });
});
