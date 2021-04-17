import {Controller, Post, Get, Body} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {DEFAULT_RESPONSES} from 'src/utils/http/response';

import {AppSettingsRequest} from './appSettings.interface';
import {AppSettingsService} from './appSettings.service';

@ApiTags('App settings')
@Controller('appSettings')
export class AppSettingsController {
    constructor(private appSettingsService: AppSettingsService) {}

    @Get('/')
    async request() {
        return await this.appSettingsService.get();
    }

    @Post('/update')
    async update(@Body() data: Partial<AppSettingsRequest>) {
        await this.appSettingsService.update();
        return DEFAULT_RESPONSES.CHANGE;
    }
}
