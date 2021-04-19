import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {PermissionsEntity, UserPermissionsEntity} from 'src/permissions/permissions.entity';
import {PermissionsService} from 'src/permissions/permissions.service';
import {JwtStrategy} from 'src/user/strategies/jwt.strategy';
import {UserEntity} from 'src/user/user.entity';
import {UserModule} from 'src/user/user.module';

import {RulesController} from './rules.controller';
import {RulesEntity} from './rules.entity';
import {RulesService} from './rules.service';

@Module({
    controllers: [RulesController],
    providers: [PermissionsService, RulesService, JwtStrategy],
    imports: [
        TypeOrmModule.forFeature([
            RulesEntity,
            UserEntity,
            PermissionsEntity,
            UserPermissionsEntity,
        ]),
        UserModule,
    ],
    exports: [
        RulesService,
    ],
})
export class RulesModule {
}
