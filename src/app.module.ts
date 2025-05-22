import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './core/database/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { VoyageModule } from './voyage/voyage.module';
import { SkyscannerService } from './skyscanner/skyscanner.service';
import { HttpModule } from '@nestjs/axios';
import { TransportModule } from './transport/transport.module';
import { SkyscannerModule } from './skyscanner/skyscanner.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, HttpModule, SkyscannerModule],
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    VoyageModule,
    TransportModule,
  ],
})
export class AppModule {}
