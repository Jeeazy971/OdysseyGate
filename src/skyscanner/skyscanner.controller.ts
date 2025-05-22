import { Controller, Get, Query } from '@nestjs/common';
import { SkyscannerService } from './skyscanner.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('skyscanner')
@Controller('skyscanner')
export class SkyscannerController {
  constructor(private readonly skyscannerService: SkyscannerService) {}

  @Get('search')
  @ApiOperation({ summary: 'Recherche de vols avec Skyscanner' })
  @ApiQuery({ name: 'from', required: true, example: 'CDG' })
  @ApiQuery({ name: 'to', required: true, example: 'JFK' })
  @ApiQuery({ name: 'date', required: true, example: '2025-07-12' })
  @ApiResponse({
    status: 200,
    description: 'Résultat de la recherche Skyscanner',
  })
  async search(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('date') date: string,
  ) {
    return this.skyscannerService.searchFlights({ from, to, date });
  }
}
