import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateTransportDto {
  @ApiProperty({
    example: 'Avion',
    description: 'Type de transport (ex: Avion, Train, Bus, etc.)',
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: 'Air France',
    description: 'Nom de la compagnie de transport',
    required: false,
  })
  @IsString()
  @IsOptional()
  compagnie?: string;
}
