import * as argon2 from 'argon2';
import {IsEmail} from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({default: ''})
  bio: string;

  @Column({default: ''})
  image: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
      this.password = await argon2.hash(this.password);
  }
}
