import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {JwtStrategy} from 'src/user/strategies/jwt.strategy';
import {UserEntity} from 'src/user/user.entity';
import {UserModule} from 'src/user/user.module';

import {PermissionsController} from './permissions.controller';
import {PermissionsEntity, UserPermissionsEntity} from './permissions.entity';
import {PermissionsService} from './permissions.service';

@Module({
    controllers: [PermissionsController],
    providers: [PermissionsService, JwtStrategy],
    imports: [
        TypeOrmModule.forFeature([
            PermissionsEntity,
            UserEntity,
            UserPermissionsEntity,
        ]),
        UserModule,
    ],
    exports: [
        PermissionsService,
    ],
})
export class PermissionsModule {
}
