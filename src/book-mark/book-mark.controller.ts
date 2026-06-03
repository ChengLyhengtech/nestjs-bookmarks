import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BookMarkService } from './book-mark.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { CreateBookmarkDto } from 'src/auth/dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard) // 👈 Applies to ALL routes inside this controller
@Controller('book-mark')
export class BookMarkController {
  constructor(private readonly bookMarkService: BookMarkService) {}

  @Get()
  findAll(@GetUser('id') userId: number) {
    return this.bookMarkService.findAll(userId);
  }

  @Post()
  create(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {
    return this.bookMarkService.create(userId, dto);
  }

  @Put(':id')
  update(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookMarkService.update(userId, bookmarkId, dto);
  }

  @Delete(':id')
  delete(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookMarkService.delete(userId, bookmarkId);
  }

  @Get(':id')
  getBookmarkById(
    @Param('id', ParseIntPipe) bookmarkId: number,
    @GetUser('id') userId: number,
  ) {
    return this.bookMarkService.getBookmarkById(userId, bookmarkId);
  }
}
