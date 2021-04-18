import argon2 from 'argon2';
import {IsEmail} from 'class-validator';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @CreateDateColumn({nullable: true})
    created: Date;

    @UpdateDateColumn({nullable: true})
    updated: Date;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await argon2.hash(this.password);
    }

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}
