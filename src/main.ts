import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
// import csurf from 'csurf';

import {ApplicationModule} from './app.module';

(async function () {
    const app = await NestFactory.create(ApplicationModule, {
        cors: true,
    });
    app.setGlobalPrefix('api');

    const options = new DocumentBuilder()
        .setTitle('Smart ACL Admin REST API')
        .setDescription('REST API of ACL Admin')
        .setVersion('1.0')
        .setBasePath('api')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);

    await app.listen(process.env.PORT);
})();
