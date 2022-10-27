import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // base routing
    app.setGlobalPrefix('api');

    await app.listen(3000);
}

bootstrap();
