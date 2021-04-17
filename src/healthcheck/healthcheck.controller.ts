import {Get, Controller} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

import {Pong} from './healthcheck.interface';
import {HealthcheckService} from './healthcheck.service';

@ApiBearerAuth()
@ApiTags('healthcheck')
@Controller('healthcheck')
export class HealthcheckController {
    constructor(private readonly service: HealthcheckService) {}

    @Get('/ping')
    async pong(): Promise<Pong> {
        return await this.service.pong();
    }
}
