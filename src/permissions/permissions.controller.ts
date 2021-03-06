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
import {User} from 'src/user/user.decorator';
import {UserEntity} from 'src/user/user.entity';
import {DEFAULT_RESPONSES} from 'src/utils/http/response';

import {CreatePermissionDto, SetUserPermissionsDto} from './dto';
import {PermissionsService} from './permissions.service';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
    constructor(private permissionsService: PermissionsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.OK, description: 'list of all permissions'})
    @Get('')
    requestAll() {
        return this.permissionsService.requestAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.OK, description: 'list of user permissions'})
    @Get('me')
    async requestAllByUser(@User() user: UserEntity) {
        return this.permissionsService.requestAllByUser(user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.CREATED, description: 'create one permission'})
    @Post('create')
    async createOne(@Body('') body: CreatePermissionDto) {
        const {message, isOk} = await this.permissionsService.createOne(body);

        if (!isOk) {
            throw new HttpException({message}, HttpStatus.BAD_REQUEST);
        }

        return message;
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.OK, description: 'set new user permissions'})
    @Post('set')
    @HttpCode(HttpStatus.OK)
    async set(@Body() body: SetUserPermissionsDto) {
        await this.permissionsService.set(body);
        return DEFAULT_RESPONSES.CHANGE;
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.OK, description: 'unset user permissions'})
    @Post('unset')
    @HttpCode(HttpStatus.OK)
    async unset(@Body() body: SetUserPermissionsDto) {
        await this.permissionsService.unset(body);
        return DEFAULT_RESPONSES.CHANGE;
    }
}
