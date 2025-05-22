import { ApiProperty } from '@nestjs/swagger';

export class CreateTransportDto {
  @ApiProperty({ example: 'Avion' })
  type: string;

  @ApiProperty({ example: 'AF1234' })
  numero: string;

  @ApiProperty({ example: 'Air France' })
  compagnie: string;

  @ApiProperty({ example: 'Paris' })
  depart: string;

  @ApiProperty({ example: 'New York' })
  arrivee: string;

  @ApiProperty({ example: '2025-05-22T12:00:00Z' })
  dateDepart: Date;

  @ApiProperty({ example: '2025-05-22T20:00:00Z' })
  dateArrivee: Date;
}
