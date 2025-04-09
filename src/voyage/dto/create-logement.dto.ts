import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateLogementDto {
  @ApiProperty({
    example: 'Hôtel Le Grand',
    description: 'Nom ou type de logement',
  })
  @IsString()
  nom: string;

  @ApiProperty({
    example: '123 Rue de Paris',
    description: 'Adresse du logement',
    required: false,
  })
  @IsString()
  @IsOptional()
  adresse?: string;
}
