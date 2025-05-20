import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('logements')
export class LogementEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Identifiant unique du logement' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Hôtel XYZ', description: 'Nom du logement' })
  nom: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: '12 rue de la Paix, Paris',
    description: 'Adresse du logement',
    required: false,
  })
  adresse?: string;
}
