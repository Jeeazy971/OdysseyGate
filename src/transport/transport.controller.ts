import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransportService } from './transport.service';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { TransportEntity } from './entities/transport.entity';

@ApiTags('transport')
@Controller('transport')
export class TransportController {
    constructor(private readonly transportService: TransportService) {
  }

  @Post()
  @ApiOperation({ summary: 'Créer un transport' })
  @ApiResponse({ status: 201, type: TransportEntity })
  create(@Body() dto: CreateTransportDto) {
    return this.transportService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les transports' })
  @ApiResponse({ status: 200, type: [TransportEntity] })
  findAll() {
    return this.transportService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un transport par ID' })
  @ApiResponse({ status: 200, type: TransportEntity })
  findOne(@Param('id') id: number) {
    return this.transportService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un transport' })
  @ApiResponse({ status: 200, type: TransportEntity })
  update(@Param('id') id: number, @Body() dto: UpdateTransportDto) {
    return this.transportService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un transport' })
  @ApiResponse({ status: 200, type: TransportEntity })
  remove(@Param('id') id: number) {
    return this.transportService.remove(+id);
  }
}
