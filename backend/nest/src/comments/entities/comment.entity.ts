import { Topic } from 'src/topics/entities/topic.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryColumn()
  authorId: number;

  @PrimaryColumn()
  topicId: number;

  @Column()
  content: string;

  @ManyToMany(() => User, (user) => user.comments)
  @JoinColumn()
  author: User;

  @ManyToMany(() => Topic, (topic) => topic.comments)
  @JoinColumn()
  topic: Topic;
}
