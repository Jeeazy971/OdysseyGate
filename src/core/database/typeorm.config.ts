import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = async (
  config: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const type = config.get<'postgres' | 'mysql'>('DB_TYPE');
  // en production on privilégie DATABASE_URL
  if (config.get<string>('DATABASE_URL')) {
    return {
      type,
      url: config.get<string>('DATABASE_URL'),
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: config.get<boolean>('DB_SYNCHRONIZE'),
    };
  }
  return {
    type,
    host: config.get<string>('DB_HOST'),
    port: config.get<number>('DB_PORT'),
    username: config.get<string>('DB_USER'),
    password: config.get<string>('DB_PASS'),
    database: config.get<string>('DB_NAME'),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: config.get<boolean>('DB_SYNCHRONIZE'),
  };
};
