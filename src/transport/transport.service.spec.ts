import { Test, TestingModule } from '@nestjs/testing';
import { TransportService } from './transport.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransportEntity } from './entities/transport.entity';
import { Repository } from 'typeorm';

describe('TransportService', () => {
  let service: TransportService;
  let repo: Repository<TransportEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransportService,
        {
          provide: getRepositoryToken(TransportEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TransportService>(TransportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
