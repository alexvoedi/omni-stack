import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  topicId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
