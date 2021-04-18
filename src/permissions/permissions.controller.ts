import {
    Controller,
    Get,
    Post,
    UseGuards,
    Body,
    HttpException,
    HttpStatus,
    UsePipes,
} from '@nestjs/common';
import {ApiTags, ApiResponse} from '@nestjs/swagger';

import {JwtAuthGuard} from 'src/user/guards/jwt-auth.guard';

import {
    CreatePermissionDto,
    SetUserPermissionsDto,
} from './dto';
import {PermissionsService} from './permissions.service';
import {PermissionsExistsValidator} from './validators/permissions-exists.validator';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
    constructor(private permissionsService: PermissionsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: 200, description: 'list of all permissions'})
    @Get('')
    requestAll() {
        return this.permissionsService.requestAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: 200, description: 'list of user permissions'})
    @Get('')
    async requestAllByUser() {
        return [];
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: 200, description: 'create one permission'})
    @Post('create')
    async createOne(@Body('') body: CreatePermissionDto) {
        const {message, isOk} = await this.permissionsService.createOne(body);

        if (!isOk) {
            throw new HttpException({message}, HttpStatus.BAD_REQUEST);
        }

        return message;
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(PermissionsExistsValidator)
    @ApiResponse({status: 200, description: 'set new user permissions'})
    @Post('set')
    async set(@Body() body: SetUserPermissionsDto) {
        await this.permissionsService.set(body);
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: 200, description: 'set new user permissions'})
    @Post('unset')
    async unset() {
        return [];
    }
}
