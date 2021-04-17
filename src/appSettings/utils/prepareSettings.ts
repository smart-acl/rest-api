import {AppSettingsEntity} from '../appSettings.entity';

export function resetSettings(): Omit<AppSettingsEntity, 'id'> {
    return {
        accessRegister: false,
        authDomainRegexp: null,
    };
}
