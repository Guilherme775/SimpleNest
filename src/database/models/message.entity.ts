import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import User from './user.entity';

@ObjectType()
@Entity({ name: 'messages' })
export default class Message {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  message: string;

  @Field()
  @Column({ name: 'users_id' })
  usersId: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => User)
  user: User;

  // Associations

  @ManyToOne(
    () => User,
    user => user.messageConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'users_id' })
  userConnection: Promise<User>;
}
