import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { Logger, ValidationPipe } from "@nestjs/common";

const logger = new Logger("Main",)
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('E-commerce store backend API')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('git: @klishin16')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document)

    app.enableCors({
        allowedHeaders: "*",
        credentials: true,
    })
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(process.env.PORT || 4000);
}

bootstrap().then(() => logger.log("Server started successfully!"));
