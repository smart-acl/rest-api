import {AppSettingsEntity} from './appSettings.entity';

export type AppSettingsRequest = Omit<AppSettingsEntity, 'id'>;
