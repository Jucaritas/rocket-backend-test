import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InterceptorService } from './interceptor.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Registrar el interceptor a nivel global
  app.useGlobalInterceptors(new InterceptorService());
  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('🚀 Rocket API REST')
    .setDescription('API para el TEST de Rocket')
    .setVersion('1.0')
    .addTag('Articles')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documentFactory);

  app.setGlobalPrefix('/api/v1');
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
