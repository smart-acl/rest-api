import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
} from 'typeorm';

import {Rules} from './rules.interface';

@Entity('rules')
export class RulesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({type: 'jsonb'})
    rules: Rules;

    @CreateDateColumn()
    created: Date;

    @BeforeInsert()
    transformNameToCaps() {
        this.name = this.name.toUpperCase();
    }
}
