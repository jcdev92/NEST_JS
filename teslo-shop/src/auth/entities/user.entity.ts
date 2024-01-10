import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  email: string;

  @Column('text', {
    nullable: false,
    select: false,
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value,
    },
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];
}
