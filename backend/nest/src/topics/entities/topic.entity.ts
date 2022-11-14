import { Comment } from 'src/comments/entities/comment.entity';
import { Rating } from 'src/ratings/entities/rating.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from '../enums/language.enum';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.topics)
  @JoinColumn()
  author: User;

  @ManyToOne(() => Comment, (comment) => comment.topic)
  comments: Comment[];

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.English,
  })
  language: string;

  @OneToMany(() => Rating, (rating) => rating.topic)
  ratings: Rating[];

  @CreateDateColumn()
  createdAt: Date;
}
