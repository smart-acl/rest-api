import {
    Controller,
    Get,
    Post,
    UseGuards,
    Body,
    HttpStatus,
    HttpCode,
    Delete,
    Patch,
} from '@nestjs/common';
import {ApiTags, ApiResponse} from '@nestjs/swagger';

import {JwtAuthGuard} from 'src/user/guards/jwt-auth.guard';
import {DEFAULT_RESPONSES} from 'src/utils/http/response';

import {CreateDto, UpdateDto, DeleteDto} from './dto';
import {RulesService} from './rules.service';

@ApiTags('Rules')
@Controller('rules')
export class RulesController {
    constructor(private rulesService: RulesService) {}

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.OK, description: 'list of all permissions'})
    @Get('')
    requestAll() {
        return this.rulesService.requestAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.CREATED, description: 'create one permission'})
    @Post('create')
    async create(@Body('') body: CreateDto) {
        await this.rulesService.create(body);
        return DEFAULT_RESPONSES.CHANGE;
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.OK, description: 'create one permission'})
    @HttpCode(HttpStatus.OK)
    @Patch('update')
    async update(@Body('') body: UpdateDto) {
        await this.rulesService.update(body);
        return DEFAULT_RESPONSES.CHANGE;
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: HttpStatus.OK, description: 'create one permission'})
    @HttpCode(HttpStatus.OK)
    @Delete('delete')
    async delete(@Body('') body: DeleteDto) {
        await this.rulesService.delete(body);
        return DEFAULT_RESPONSES.CHANGE;
    }
}
