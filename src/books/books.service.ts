import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { UsersService } from 'src/users/users.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
    private readonly userService: UsersService,
  ) {}

  async create(createBookInput: CreateBookInput) {
    await this.userService.findOne(createBookInput.userId);

    try {
      return await this.bookModel.create(createBookInput);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'A book with this title and author already exists for this user',
        );
      }
      throw error;
    }
  }

  async findAll() {
    return await this.bookModel.find().exec();
  }

  async findAllByUser(userId: string) {
    await this.userService.findOne(userId);
    return await this.bookModel.find({ userId }).exec();
  }

  async findOne(id: string) {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: string, updateBookInput: UpdateBookInput) {
    if (updateBookInput.userId) {
      await this.userService.findOne(updateBookInput.userId);
    }

    try {
      const updatedBook = await this.bookModel
        .findByIdAndUpdate(id, updateBookInput, {
          new: true,
          runValidators: true,
        })
        .exec();

      if (!updatedBook) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }

      return updatedBook;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'A book with this title and author already exists for this user',
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return deletedBook;
  }
}
