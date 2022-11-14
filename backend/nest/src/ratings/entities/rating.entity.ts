import { Topic } from 'src/topics/entities/topic.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { RatingValue } from '../enums/rating-value.enum';

@Entity()
export class Rating {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  topicId: string;

  @Column({
    type: 'enum',
    enum: RatingValue,
  })
  value: RatingValue;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @ManyToOne(() => Topic, (topic) => topic.ratings)
  topic: Topic;
}
