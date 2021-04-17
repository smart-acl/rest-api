import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {JwtStrategy} from 'src/user/strategies/jwt.strategy';
import {UserModule} from 'src/user/user.module';

import {AppSettingsController} from './appSettings.controller';
import {AppSettingsEntity} from './appSettings.entity';
import {AppSettingsService} from './appSettings.service';

@Module({
    controllers: [AppSettingsController],
    providers: [AppSettingsService, JwtStrategy],
    imports: [
        TypeOrmModule.forFeature([AppSettingsEntity]),
        UserModule,
    ],
    exports: [
        AppSettingsService,
    ],
})
export class AppSettingsModule {
}
