import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('appSettings')
export class AppSettingsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accessRegister: boolean;

    @Column()
    authDomainRegexp: string;
}
