import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import {Repository} from 'typeorm';

import {AppSettingsRequest} from 'src/appSettings/appSettings.interface';

import {AppSettingsEntity} from './appSettings.entity';
import {resetSettings} from './utils/prepareSettings';

const emptySettings = resetSettings();

@Injectable()
export class AppSettingsService {
    constructor(
        @InjectRepository(AppSettingsEntity)
        private readonly appSettingsRepository: Repository<AppSettingsEntity>,
    ) {}

    async findItem() {
        const items = await this.appSettingsRepository.find({
            take: 1,
        });

        if (isEmpty(items)) {
            return null;
        }

        return items[0];
    }

    async find() {
        const item = await this.findItem();
        if (!item) {
            return item;
        }

        return omit(item, ['id']);
    }

    async update(data: Partial<AppSettingsRequest>) {
        const item = await this.findItem();
        if (!item) {
            await this.appSettingsRepository.save(emptySettings);
            return;
        }

        await this.appSettingsRepository.update(item.id, data);
    }
}
