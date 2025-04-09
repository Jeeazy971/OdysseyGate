// src/voyage/entities/voyage.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../auth/entities/user.entity';
import { TransportEntity } from './transport.entity';
import { LogementEntity } from './logement.entity';
import { ActiviteEntity } from './activite.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('voyages')
export class VoyageEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Identifiant unique du voyage' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Paris', description: 'Destination du voyage' })
  destination: string;

  @Column()
  @ApiProperty({
    example: '2025-04-10T00:00:00.000Z',
    description: 'Date de départ',
  })
  dateDepart: Date;

  @Column()
  @ApiProperty({
    example: '2025-04-20T00:00:00.000Z',
    description: "Date d'arrivée",
  })
  dateArrivee: Date;

  @Column()
  @ApiProperty({ example: 2, description: 'Nombre de voyageurs' })
  nombreVoyageurs: number;

  @ManyToOne(() => UserEntity, (user) => user.voyages, { eager: true })
  @ApiProperty({
    type: () => UserEntity,
    description: 'Utilisateur propriétaire du voyage',
  })
  user: UserEntity;

  @OneToOne(() => TransportEntity, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  @ApiProperty({
    type: () => TransportEntity,
    description: 'Transport associé au voyage (optionnel)',
  })
  transport?: TransportEntity;

  @OneToOne(() => LogementEntity, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  @ApiProperty({
    type: () => LogementEntity,
    description: 'Logement associé au voyage (optionnel)',
  })
  logement?: LogementEntity;

  @OneToOne(() => ActiviteEntity, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  @ApiProperty({
    type: () => ActiviteEntity,
    description: 'Activité associée au voyage (optionnel)',
  })
  activite?: ActiviteEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
