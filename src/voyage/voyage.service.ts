import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoyageEntity } from './entities/voyage.entity';
import { CreateVoyageDto } from './dto/create-voyage.dto';
import { UserEntity } from '../auth/entities/user.entity';
import { TransportEntity } from './entities/transport.entity';
import { LogementEntity } from './entities/logement.entity';
import { ActiviteEntity } from './entities/activite.entity';

@Injectable()
export class VoyageService {
  constructor(
    @InjectRepository(VoyageEntity)
    private readonly voyageRepository: Repository<VoyageEntity>,
  ) {}

  async createVoyage(
    dto: CreateVoyageDto,
    userId: number,
  ): Promise<VoyageEntity> {
    const depart = new Date(dto.dateDepart);
    const arrivee = new Date(dto.dateArrivee);
    if (isNaN(depart.getTime()) || isNaN(arrivee.getTime())) {
      throw new InternalServerErrorException('Invalid date format.');
    }

    const user = await this.voyageRepository.manager.findOne(UserEntity, {
      where: { id: userId },
    });
    if (!user) {
      throw new InternalServerErrorException(
        `User with id ${userId} not found.`,
      );
    }

    const voyage = this.voyageRepository.create({
      destination: dto.destination,
      dateDepart: depart,
      dateArrivee: arrivee,
      nombreVoyageurs: dto.nombreVoyageurs,
      villeDepart: dto.villeDepart,
      imageUrl: dto.imageUrl,
      user,
    });

    if (dto.transport) {
      const transport = new TransportEntity();
      transport.type = dto.transport.type;
      transport.compagnie = dto.transport.compagnie;
      voyage.transport = transport;
    }

    if (dto.logement) {
      const logement = new LogementEntity();
      logement.nom = dto.logement.nom;
      logement.adresse = dto.logement.adresse;
      voyage.logement = logement;
    }

    if (dto.activite) {
      const activite = new ActiviteEntity();
      activite.description = dto.activite.description;
      activite.lieu = dto.activite.lieu;
      voyage.activite = activite;
    }

    return this.voyageRepository.save(voyage);
  }

  async getVoyagesByUser(userId: number): Promise<VoyageEntity[]> {
    return this.voyageRepository.find({ where: { user: { id: userId } } });
  }
}
