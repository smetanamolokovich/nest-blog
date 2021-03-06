import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipes } from './pipes/validation.pipe';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog REST API')
    .setDescription('Blog REST API by Aitu')
    .setVersion('1.0.0')
    .addTag('smetanamolokovich')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipes());

  await app.listen(port, () => {
    console.log(`Works! Running on port: ${port}`);
  });
}
bootstrap();
