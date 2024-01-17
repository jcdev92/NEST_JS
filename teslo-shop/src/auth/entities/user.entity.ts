import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: 'd9d9d9d9-d9d9-d9d9-d9d9-d9d9d9d9d9d9',
    description: 'User ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'user@mail.com',
    description: 'User email',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    example: '$2b$10$x4ZOUs4V6P5wjIdpYp/gYOewxRzuCFahEYbObL06k6eySRjl4jNHm',
    description: 'User password',
    uniqueItems: true,
  })
  @Column('text', {
    nullable: false,
    select: false,
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value,
    },
  })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
  })
  @Column('text')
  fullName: string;

  @ApiProperty({
    example: true,
    description: 'User status',
    default: true,
    nullable: false,
  })
  @Column('bool', {
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @ApiProperty({
    example: ['user'],
    description: 'User roles',
    default: ['user'],
    nullable: false,
    isArray: true,
    uniqueItems: true,
    enum: ['admin', 'user'],
    enumName: 'Roles',
  })
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFiledsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
