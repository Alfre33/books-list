import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, MinLength, MaxLength, IsMongoId } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field(() => String)
  @IsString({ message: 'Title must be a string' })
  @MinLength(1, { message: 'Title must be at least 1 character long' })
  @MaxLength(200, { message: 'Title must be less than 200 characters' })
  title: string;

  @Field(() => String)
  @IsString({ message: 'Author must be a string' })
  @MinLength(2, { message: 'Author must be at least 2 characters long' })
  @MaxLength(100, { message: 'Author must be less than 100 characters' })
  author: string;

  @Field(() => ID)
  @IsMongoId({ message: 'UserId must be a valid MongoDB ObjectId' })
  userId: string;
}
