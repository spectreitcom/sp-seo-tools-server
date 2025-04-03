import './instrument';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('SEO Tool')
    .setDescription('The SEO Tool API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        description: 'JWT for regular users',
        bearerFormat: 'JWT',
        scheme: 'bearer',
      },
      'user-auth',
    )
    .addBearerAuth(
      {
        type: 'http',
        description: 'JWT for admin users',
        bearerFormat: 'JWT',
        scheme: 'bearer',
      },
      'admin-auth',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
