import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportEntity } from './entities/transport.entity';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';

@Injectable()
export class TransportService {
  constructor(
    @InjectRepository(TransportEntity)
    private readonly transportRepository: Repository<TransportEntity>,
  ) {}

  async create(dto: CreateTransportDto): Promise<TransportEntity> {
    const transport = this.transportRepository.create(dto);
    return this.transportRepository.save(transport);
  }

  async findAll(): Promise<TransportEntity[]> {
    return this.transportRepository.find();
  }

  async findOne(id: number): Promise<TransportEntity> {
    const transport = await this.transportRepository.findOne({ where: { id } });
    if (!transport) throw new NotFoundException(`Transport #${id} non trouvé`);
    return transport;
  }

  async update(id: number, dto: UpdateTransportDto): Promise<TransportEntity> {
    await this.findOne(id);
    await this.transportRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.transportRepository.delete(id);
  }
}
