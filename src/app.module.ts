import {Module, CacheModule, CacheInterceptor} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';

import {AppSettingsModule} from './appSettings/appSettings.module';
import {HealthcheckModule} from './healthcheck/healthcheck.module';
import {PermissionGroupsModule} from './permissionGroups/permissionGroups.module';
import {PermissionsModule} from './permissions/permissions.module';
import {RulesModule} from './rules/rules.module';
import {UserModule} from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            autoLoadEntities: true,
        }),
        CacheModule.register(),
        UserModule,
        HealthcheckModule,
        AppSettingsModule,
        PermissionsModule,
        PermissionGroupsModule,
        RulesModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class ApplicationModule {
    constructor(private readonly connection: Connection) {}
}
