import {Get, Controller} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

import {Pong} from './healthcheck.interface';
import {HealthcheckService} from './healthcheck.service';

@ApiBearerAuth()
@ApiTags('Healthcheck')
@Controller('healthcheck')
export class HealthcheckController {
    constructor(private readonly service: HealthcheckService) {}

    @Get('/ping')
    pong(): Promise<Pong> {
        return this.service.pong();
    }
}
