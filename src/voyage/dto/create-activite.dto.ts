import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateActiviteDto {
  @ApiProperty({
    example: 'Visite du Louvre',
    description: 'Nom de l\'activité',
  })
  @IsString()
  nom: string;

  @ApiProperty({
    example: 'Visite guidée de l\'un des plus grands musées du monde',
    description: 'Description de l\'activité',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
