import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoyageController } from './voyage.controller';
import { VoyageService } from './voyage.service';
import { VoyageEntity } from './entities/voyage.entity';
import { TransportEntity } from '../transport/entities/transport.entity';
import { LogementEntity } from './entities/logement.entity';
import { ActiviteEntity } from './entities/activite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VoyageEntity,
      TransportEntity,
      LogementEntity,
      ActiviteEntity,
    ]),
  ],
  controllers: [VoyageController],
  providers: [VoyageService],
})
export class VoyageModule {}
