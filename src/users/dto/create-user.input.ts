import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsInt, Min, Max, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @Field(() => String)
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @Field(() => Int)
  @IsInt({ message: 'Age must be an integer' })
  age: number;
}
