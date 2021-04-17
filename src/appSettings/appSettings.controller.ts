import {
    Controller,
    Post,
    Get,
    Body,
    Res,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Response} from 'express';
import isEmpty from 'lodash/isEmpty';

import {JwtAuthGuard} from 'src/user/guards/jwt-auth.guard';
import {DEFAULT_RESPONSES, makeDataResponse} from 'src/utils/http/response';

import {AppSettingsRequest} from './appSettings.interface';
import {AppSettingsService} from './appSettings.service';

@ApiTags('App settings')
@Controller('appSettings')
export class AppSettingsController {
    constructor(private appSettingsService: AppSettingsService) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    async request(@Res() res: Response) {
        const item = await this.appSettingsService.find();

        if (!item) {
            makeDataResponse(res, {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: {message: 'app config is not created'},
            });
            return;
        }

        makeDataResponse(res, {data: item});
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async update(@Body() data: Partial<AppSettingsRequest>) {
        if (isEmpty(data)) {
            return DEFAULT_RESPONSES.NO_CHANGES;
        }

        await this.appSettingsService.update(data);
        return DEFAULT_RESPONSES.CHANGE;
    }
}
