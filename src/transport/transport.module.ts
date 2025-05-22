import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportController } from './transport.controller';
import { TransportService } from './transport.service';
import { TransportEntity } from './entities/transport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransportEntity])],
  controllers: [TransportController],
  providers: [TransportService],
  exports: [TransportService],
})
export class TransportModule {}
