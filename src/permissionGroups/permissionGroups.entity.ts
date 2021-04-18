import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Unique,
} from 'typeorm';

import {PermissionsEntity} from 'src/permissions/permissions.entity';

@Entity('permissionsGroups')
export class PermissionsGroupsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    name: string;

    @CreateDateColumn()
    created: Date;
}

@Entity('permissionsGroupsMap')
@Unique('permissionsGroupsMap_data', ['group', 'permission'])
export class PermissionsGroupsMapEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PermissionsGroupsEntity)
    group: PermissionsGroupsEntity;

    @ManyToOne(() => PermissionsEntity)
    permission: PermissionsEntity;

    @CreateDateColumn()
    created: Date;
}
