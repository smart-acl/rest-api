import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('permissions')
export class PermissionsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    name: string;
}
