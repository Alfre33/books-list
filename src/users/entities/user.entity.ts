import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true, unique: true })
  @Field(() => String)
  email: string;

  @Prop({ required: true })
  @Field(() => String)
  name: string;

  @Prop({ required: true })
  @Field(() => Int)
  age: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);