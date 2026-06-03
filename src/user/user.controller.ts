import { Controller, Get, UseGuards } from '@nestjs/common';
import { type User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard) // This protects the route!
  @Get('me')
  getMe(@GetUser() user: User) {
    // Because of your Strategy, req.user is now populated
    return user;
  }
}
