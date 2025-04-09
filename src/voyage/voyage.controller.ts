import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
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
  @ApiOperation({
    summary: "Création d'un nouveau voyage avec toutes les informations",
  })
  @ApiResponse({
    status: 201,
    description: 'Le voyage a été créé avec succès.',
    type: VoyageEntity,
  })
  async create(
    @Body() createVoyageDto: CreateVoyageDto,
    @Req() req: RequestWithUser,
  ): Promise<VoyageEntity> {
    const userId = req.user.id;
    return this.voyageService.createVoyage(createVoyageDto, userId);
  }
}
