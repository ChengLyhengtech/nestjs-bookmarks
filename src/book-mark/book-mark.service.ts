import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookMarkService {
  constructor(private readonly prisma: PrismaService) {}
  findAll(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async create(userId: number, dto: any) {
    return this.prisma.bookmark.create({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: {
        userId: userId, // 👈 Must be a valid integer passed from the controller
        ...dto,
      },
    });
  }

  async update(userId: number, bookmarkId: number, dto: any) {
    // 1. Check if the bookmark exists and belongs to the user
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId: userId,
      },
    });

    // 2. If it returns null, throw the 404 error safely
    if (!bookmark) {
      throw new NotFoundException(
        `Bookmark with ID ${bookmarkId} not found or unauthorized`,
      );
    }

    // 3. If it exists, proceed with the update safely
    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: dto,
    });
  }

  async delete(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
        userId: userId,
      },
    });
    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId: userId,
      },
    });
    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }
    return bookmark;
  }
}
