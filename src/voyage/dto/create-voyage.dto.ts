import { IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVoyageDto {
  @ApiProperty({ example: 'Paris', description: 'Destination du voyage' })
  @IsString()
  destination: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'Image de la destination (URL)',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 'Lyon', description: 'Ville de départ' })
  @IsString()
  villeDepart: string;

  @ApiProperty({
    example: '2025-04-10',
    description: 'Date de départ (format ISO)',
  })
  @IsDateString()
  dateDepart: string;

  @ApiProperty({
    example: '2025-04-20',
    description: "Date d'arrivée (format ISO)",
  })
  @IsDateString()
  dateArrivee: string;

  @ApiProperty({ example: 2, description: 'Nombre de voyageurs' })
  @IsNumber()
  nombreVoyageurs: number;

  // Propriétés optionnelles pour transport, logement, activité
  @ApiPropertyOptional({ description: 'Informations sur le transport' })
  transport?: {
    type: string;
    compagnie?: string;
  };

  @ApiPropertyOptional({ description: 'Informations sur le logement' })
  logement?: {
    nom: string;
    adresse: string;
  };

  @ApiPropertyOptional({ description: "Informations sur l'activité" })
  activite?: {
    nom?: string;
    description?: string;
    lieu?: string;
  };
}
