import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {AppSettingsController} from './appSettings.controller';
import {AppSettingsEntity} from './appSettings.entity';
import {AppSettingsService} from './appSettings.service';

@Module({
    controllers: [AppSettingsController],
    providers: [AppSettingsService],
    imports: [
        TypeOrmModule.forFeature([AppSettingsEntity]),
    ],
    exports: [
        AppSettingsService,
    ],
})
export class AppSettingsModule {
}
