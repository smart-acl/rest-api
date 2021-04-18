import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('appSettings')
export class AppSettingsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accessRegister: boolean;

    @Column({
        nullable: true,
    })
    authDomainRegexp: string;

    @CreateDateColumn({nullable: true})
    created: Date;

    @UpdateDateColumn({nullable: true})
    updated: Date;
}
