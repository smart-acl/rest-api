import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {CreatePermissionDto} from './dto';
import {PermissionsEntity} from './permissions.entity';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(PermissionsEntity)
        private readonly permissionsRepository: Repository<PermissionsEntity>,
    ) {}

    requestAll() {
        return this.permissionsRepository.find();
    }

    async createOne(body: CreatePermissionDto): Promise<{message: string; isOk: boolean}> {
        try {
            await this.permissionsRepository.save(body);
            return {message: 'ok', isOk: true};
        } catch (_error) {
            if (_error.toString().includes('duplicate')) {
                return {message: 'duplicate error', isOk: false};
            }

            return {message: 'save error', isOk: false};
        }
    }
}
