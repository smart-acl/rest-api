import {Post, Controller, Req} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Request} from 'express';

@ApiBearerAuth()
@ApiTags('CSRF')
@Controller('csrf')
export class CsrfController {
    @Post('/')
    makeToken(@Req() request: Request): Promise<{token: string}> {
        return Promise.resolve({
            token: request.csrfToken(),
        });
    }
}
