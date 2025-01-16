import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from '../../../config';
import { GlobalExceptionFilter } from '../../../libs/common/src/exeptions/global-exeption';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.setGlobalPrefix("api");

    const swagger = new DocumentBuilder()
        .setTitle('Simple Microservice')
        .setDescription('REST API Documentation')
        .setVersion('1.0.0')
        .addTag('Nestjs, postgreSQL, typeORM')
        .build();
    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(config.PORT, () => {
        console.log(config.PORT);
    });
}
bootstrap();
