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

import {CreateGroupDto, PushPermissionsDto} from './dto';
import {PermissionGroupsService} from './permissionGroups.service';

@ApiTags('Permissions Groups')
@Controller('permission-groups')
export class PermissionGroupsController {
    constructor(private permissionsService: PermissionGroupsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: 200, description: 'list of all permissions'})
    @Get('')
    requestAll() {
        return this.permissionsService.requestAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: 201, description: 'create one permission'})
    @Post('create')
    async createOne(@Body('') body: CreateGroupDto) {
        const {message, isOk} = await this.permissionsService.createOne(body);

        if (!isOk) {
            throw new HttpException({message}, HttpStatus.BAD_REQUEST);
        }

        return message;
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: 201, description: 'create one permission'})
    @Post('permissions/push')
    async push(@Body('') body: PushPermissionsDto) {
        await this.permissionsService.push(body);
        return DEFAULT_RESPONSES.CHANGE;
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: 201, description: 'create one permission'})
    @Post('permissions/pop')
    async pop(@Body('') body: PushPermissionsDto) {
        await this.permissionsService.pop(body);
        return DEFAULT_RESPONSES.CHANGE;
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: 200, description: 'set new user permissions'})
    @Post('set')
    @HttpCode(HttpStatus.OK)
    async set(@Body() body: any) {
        // await this.permissionsService.set(body);
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: 200, description: 'unset user permissions'})
    @Post('unset')
    @HttpCode(HttpStatus.OK)
    async unset(@Body() body: any) {
        // await this.permissionsService.unset(body);
    }
}
