import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {AppSettingsEntity} from './appSettings.entity';
import {resetSettings} from './utils/prepareSettings';

const emptySettings = resetSettings();

@Injectable()
export class AppSettingsService {
    constructor(
        @InjectRepository(AppSettingsEntity)
        private readonly appSettingsRepository: Repository<AppSettingsEntity>,
    ) {}

    async update() {
        // Find first item
        // If it's not -> save new
        const item = await this.appSettingsRepository.findOne(1);
        if (!item) {
            await this.appSettingsRepository.save(emptySettings);
            return;
        }

        const resp = await this.appSettingsRepository.save({
            accessRegister: true,
            authDomainRegexp: 'str',
        });
        console.log(resp);
    }

    async get() {
        return await this.appSettingsRepository.findOne(1);
    }
}
