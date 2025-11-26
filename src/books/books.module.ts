import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { Book, BookSchema } from './entities/book.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    UsersModule,
  ],
  providers: [BooksResolver, BooksService],
  exports: [BooksService],
})
export class BooksModule {}
