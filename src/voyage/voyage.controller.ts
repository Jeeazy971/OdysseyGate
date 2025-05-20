import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { VoyageService } from './voyage.service';
import { CreateVoyageDto } from './dto/create-voyage.dto';
import { Request } from 'express';
import { VoyageEntity } from './entities/voyage.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
  };
}

@ApiTags('Voyages')
@ApiBearerAuth('access-token')
@Controller('voyages')
export class VoyageController {
  constructor(private readonly voyageService: VoyageService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new voyage with all information' })
  @ApiResponse({
    status: 201,
    description: 'The voyage has been successfully created.',
    type: VoyageEntity,
  })
  async create(
    @Body() createVoyageDto: CreateVoyageDto,
    @Req() req: RequestWithUser,
  ): Promise<VoyageEntity> {
    const userId = req.user.id;
    return this.voyageService.createVoyage(createVoyageDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Retrieve the list of voyages for the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'List of voyages retrieved successfully.',
    type: [VoyageEntity],
  })
  async getMyVoyages(@Req() req: RequestWithUser): Promise<VoyageEntity[]> {
    const userId = req.user.id;
    return this.voyageService.getVoyagesByUser(userId);
  }
}
