import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';

import {handleCSRFError} from 'src/csrf/utils/middleware';
import {ValidationPipe} from 'src/shared/pipes/validation.pipe';

import {ApplicationModule} from './app.module';

(async function () {
    const app = await NestFactory.create(ApplicationModule, {
        cors: true,
    });
    app
        .setGlobalPrefix('api')
        .useGlobalPipes(new ValidationPipe())
        .use(bodyParser.urlencoded({extended: false}))
        .use(cookieParser())
        .use(csurf({cookie: true}))
        .use(handleCSRFError);

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
