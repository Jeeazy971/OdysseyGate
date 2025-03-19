// test/database.e2e-spec.ts

import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

describe('Database Connection (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        // On récupère l'instance TypeORM (DataSource) injectée par Nest
        dataSource = moduleFixture.get(DataSource);
    });

    it('should be connected to MySQL', () => {
        expect(dataSource.isInitialized).toBe(true);
    });

    afterAll(async () => {
        await dataSource.destroy();
        await app.close();
    });
});
