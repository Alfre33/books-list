import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BooksDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
@ObjectType()
export class Book {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true, trim: true, minlength: 1, maxlength: 200 })
  @Field(() => String)
  title: string;

  @Prop({ required: true, trim: true, minlength: 2, maxlength: 100 })
  @Field(() => String)
  author: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  @Field(() => ID)
  userId: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
BookSchema.index({ userId: 1, title: 1, author: 1 }, { unique: true });
