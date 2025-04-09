import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('activites')
export class ActiviteEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Identifiant unique de l'activité" })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Visite guidée',
    description: "Description de l'activité",
  })
  description: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'Louvre, Paris',
    description: "Lieu de l'activité",
    required: false,
  })
  lieu?: string;
}
