import {
    Controller,
    Get,
    Post,
    UseGuards,
    Body,
    HttpException,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import {ApiTags, ApiResponse} from '@nestjs/swagger';

import {JwtAuthGuard} from 'src/user/guards/jwt-auth.guard';
import {DEFAULT_RESPONSES} from 'src/utils/http/response';

import {CreateGroupDto, PushPermissionsDto, SetGroupToUserDto} from './dto';
import {PermissionGroupsService} from './permissionGroups.service';

@ApiTags('Permissions Groups')
@Controller('permission-groups')
export class PermissionGroupsController {
    constructor(private permissionsService: PermissionGroupsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.OK, description: 'list of all groups'})
    @Get('')
    requestAll() {
        return this.permissionsService.requestAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.CREATED, description: 'create group'})
    @Post('create')
    async createOne(@Body('') body: CreateGroupDto) {
        const {message, isOk} = await this.permissionsService.createOne(body);

        if (!isOk) {
            throw new HttpException({message}, HttpStatus.BAD_REQUEST);
        }

        return message;
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.CREATED, description: 'push permissions to group'})
    @Post('permissions/push')
    async push(@Body('') body: PushPermissionsDto) {
        await this.permissionsService.push(body);
        return DEFAULT_RESPONSES.CHANGE;
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.CREATED, description: 'pop permissions from group'})
    @Post('permissions/pop')
    async pop(@Body('') body: PushPermissionsDto) {
        await this.permissionsService.pop(body);
        return DEFAULT_RESPONSES.CHANGE;
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.OK, description: 'set permissions by group'})
    @Post('set')
    @HttpCode(HttpStatus.OK)
    async set(@Body() body: SetGroupToUserDto) {
        await this.permissionsService.set(body);
        return DEFAULT_RESPONSES.CHANGE;
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.OK, description: 'unset permissions by group'})
    @Post('unset')
    @HttpCode(HttpStatus.OK)
    async unset(@Body() body: SetGroupToUserDto) {
        await this.permissionsService.unset(body);
        return DEFAULT_RESPONSES.CHANGE;
    }
}
