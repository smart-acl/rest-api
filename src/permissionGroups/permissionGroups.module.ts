import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {PermissionsEntity, UserPermissionsEntity} from 'src/permissions/permissions.entity';
import {PermissionsService} from 'src/permissions/permissions.service';
import {JwtStrategy} from 'src/user/strategies/jwt.strategy';
import {UserEntity} from 'src/user/user.entity';
import {UserModule} from 'src/user/user.module';

import {PermissionGroupsController} from './permissionGroups.controller';
import {PermissionsGroupsEntity, PermissionsGroupsMapEntity} from './permissionGroups.entity';
import {PermissionGroupsService} from './permissionGroups.service';

@Module({
    controllers: [PermissionGroupsController],
    providers: [PermissionsService, PermissionGroupsService, JwtStrategy],
    imports: [
        TypeOrmModule.forFeature([
            PermissionsGroupsEntity,
            UserEntity,
            PermissionsGroupsMapEntity,
            PermissionsEntity,
            UserPermissionsEntity,
        ]),
        UserModule,
    ],
    exports: [
        PermissionGroupsService,
    ],
})
export class PermissionGroupsModule {
}
