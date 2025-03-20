import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Odyssey Gate API')
    .setDescription("Documentation de l'API pour l'application Odyssey Gate")
    .setVersion('1.0')
    // La configuration du Bearer Token
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token' // nom de la stratégie (sera utilisé dans les décorateurs que j'ai mis)
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Et la redirection de la racine vers Swagger
  app.getHttpAdapter().get('/', (req, res) => {
    res.redirect('/api-docs');
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
