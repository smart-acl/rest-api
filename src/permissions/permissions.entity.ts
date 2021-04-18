import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Unique,
} from 'typeorm';

import {UserEntity} from 'src/user/user.entity';

@Entity('permissions')
export class PermissionsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    name: string;

    @CreateDateColumn()
    created: Date;
}

@Entity('userPermissions')
@Unique('data', ['user', 'permission'])
export class UserPermissionsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    user: UserEntity;

    @ManyToOne(() => PermissionsEntity)
    permission: PermissionsEntity;

    @CreateDateColumn({nullable: true})
    created: Date;
}
