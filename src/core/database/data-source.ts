// data-source.ts
import 'dotenv/config';
import { UserEntity } from 'src/auth/entities/user.entity';
import { TransportEntity } from 'src/transport/entities/transport.entity';
import { VoyageEntity } from 'src/voyage/entities/voyage.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: (process.env.DB_TYPE as any) || 'postgres',
  url: process.env.DATABASE_URL, // pour prod
  host: process.env.DB_HOST, // pour dev
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [
    UserEntity,
    VoyageEntity,
    TransportEntity,
  ],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
});
