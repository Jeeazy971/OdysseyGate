import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { VoyageModule } from './voyage/voyage.module';
import { UserEntity } from './auth/entities/user.entity';
import { VoyageEntity } from './voyage/entities/voyage.entity';
import { ActiviteEntity } from './voyage/entities/activite.entity';
import { LogementEntity } from './voyage/entities/logement.entity';
import { TransportEntity } from './voyage/entities/transport.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'odysseygate',
      entities: [
        UserEntity,
        VoyageEntity,
        TransportEntity,
        LogementEntity,
        ActiviteEntity,
      ],
      synchronize: true, // à n'utiliser qu'en développement
    }),
    AuthModule,
    VoyageModule,
  ],
})
export class AppModule {}
