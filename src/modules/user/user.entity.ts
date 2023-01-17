import {
  Entity, Column, PrimaryGeneratedColumn, PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
    id: number;

  @Column()
    firstName: string;

  @Column()
    lastName: string;
}
