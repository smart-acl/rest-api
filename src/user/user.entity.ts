import argon2 from 'argon2';
import {IsEmail} from 'class-validator';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    OneToMany,
} from 'typeorm';

import {PermissionsEntity} from 'src/permissions/permissions.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => PermissionsEntity, p => p.name)
    permissions: string[];

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await argon2.hash(this.password);
    }
}
