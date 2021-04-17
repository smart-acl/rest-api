import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {JwtStrategy} from 'src/user/strategies/jwt.strategy';
import {UserModule} from 'src/user/user.module';

import {PermissionsController} from './permissions.controller';
import {PermissionsEntity} from './permissions.entity';
import {PermissionsService} from './permissions.service';

@Module({
    controllers: [PermissionsController],
    providers: [PermissionsService, JwtStrategy],
    imports: [
        TypeOrmModule.forFeature([PermissionsEntity]),
        UserModule,
    ],
    exports: [
        PermissionsService,
    ],
})
export class PermissionsModule {
}
