import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';

import {AppSettingsModule} from './appSettings/appSettings.module';
import {HealthcheckModule} from './healthcheck/healthcheck.module';
import {UserModule} from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(),
        UserModule,
        HealthcheckModule,
        AppSettingsModule,
    ],
    controllers: [],
    providers: [],
})
export class ApplicationModule {
    constructor(private readonly connection: Connection) {}
}
