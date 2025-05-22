import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('transports')
export class TransportEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Identifiant unique du transport' })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Avion',
    description: 'Type de transport (Avion, Train, etc.)',
  })
  type: string;

  @Column()
  @ApiProperty({ example: 'AF1234', description: 'Numéro de vol/train, etc.' })
  numero: string;

  @Column()
  @ApiProperty({ example: 'Air France', description: 'Compagnie de transport' })
  compagnie: string;

  @Column()
  @ApiProperty({ example: 'Paris', description: 'Ville de départ' })
  depart: string;

  @Column()
  @ApiProperty({ example: 'New York', description: "Ville d'arrivée" })
  arrivee: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({
    example: '2025-05-22T12:00:00Z',
    description: 'Date et heure de départ',
  })
  dateDepart: Date;

  @Column({ type: 'timestamp' })
  @ApiProperty({
    example: '2025-05-22T20:00:00Z',
    description: "Date et heure d'arrivée",
  })
  dateArrivee: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
