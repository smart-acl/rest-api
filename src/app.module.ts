import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';

import {AppController} from './app.controller';
import {ArticleModule} from './article/article.module';
import {ProfileModule} from './profile/profile.module';
import {TagModule} from './tag/tag.module';
import {UserModule} from './user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ArticleModule,
        UserModule,
        ProfileModule,
        TagModule,
    ],
    controllers: [
        AppController,
    ],
    providers: [],
})
export class ApplicationModule {
    constructor(private readonly connection: Connection) {}
}
