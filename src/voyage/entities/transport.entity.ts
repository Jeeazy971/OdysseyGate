// src/voyage/entities/transport.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('transports')
export class TransportEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Identifiant unique du transport' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Train', description: 'Type de transport' })
  type: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'SNCF',
    description: 'Compagnie de transport (optionnel)',
  })
  compagnie?: string;
}
