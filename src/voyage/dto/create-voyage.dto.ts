// src/voyage/dto/create-voyage.dto.ts
import {
  IsString,
  IsDateString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class TransportInfo {
  @ApiProperty({ example: 'Train', description: 'Type de transport' })
  @IsString()
  type: string;

  @ApiPropertyOptional({
    example: 'SNCF',
    description: 'Compagnie de transport',
  })
  @IsOptional()
  @IsString()
  compagnie?: string;
}

class LogementInfo {
  @ApiProperty({ example: 'Hôtel XYZ', description: 'Nom du logement' })
  @IsString()
  nom: string;

  @ApiPropertyOptional({
    example: '12 rue de la Paix, Paris',
    description: 'Adresse du logement',
  })
  @IsOptional()
  @IsString()
  adresse?: string;
}

class ActiviteInfo {
  @ApiProperty({
    example: 'Visite guidée',
    description: "Description de l'activité",
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    example: 'Louvre, Paris',
    description: "Lieu de l'activité",
  })
  @IsOptional()
  @IsString()
  lieu?: string;
}

export class CreateVoyageDto {
  @ApiProperty({ example: 'Paris', description: 'Destination du voyage' })
  @IsString()
  destination: string;

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

  @ApiPropertyOptional({
    description: 'Informations de transport',
    type: TransportInfo,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TransportInfo)
  transport?: TransportInfo;

  @ApiPropertyOptional({
    description: 'Informations de logement',
    type: LogementInfo,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LogementInfo)
  logement?: LogementInfo;

  @ApiPropertyOptional({
    description: "Informations d'activité",
    type: ActiviteInfo,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ActiviteInfo)
  activite?: ActiviteInfo;
}
