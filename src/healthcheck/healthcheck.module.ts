import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';

import {HealthcheckController} from './healthcheck.controller';
import {HealthcheckService} from './healthcheck.service';

@Module({
    imports: [],
    providers: [HealthcheckService],
    controllers: [
        HealthcheckController,
    ],
    exports: [],
})
export class HealthcheckModule implements NestModule {
    public configure(_consumer: MiddlewareConsumer): void {
    }
}
