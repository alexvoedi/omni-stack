import { IsEnum, IsNotEmpty } from 'class-validator';
import { Language } from '../enums/language.enum';

export class CreateTopicDto {
  @IsEnum(Language)
  language: Language;

  @IsNotEmpty()
  title: string;
}
