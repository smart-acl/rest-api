import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';

import {CsrfController} from './csrf.controller';

@Module({
    imports: [],
    providers: [],
    controllers: [
        CsrfController,
    ],
    exports: [],
})
export class CsrfModule implements NestModule {
    public configure(_consumer: MiddlewareConsumer): void {
    }
}
