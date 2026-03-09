import { Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth-decorator';
import { CurrentUser } from './decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }

  @Auth()
  @Patch('profile/favorites/:productId')
  async toggleFavorite(
    @Param('productId') productId: string,
    @CurrentUser('id') id: string,
  ) {
    return this.userService.toggleFavorite(productId, id);
  }

  // @Auth()
  // @Get('profile/favorites')
  // async getFavorites(@CurrentUser('id') userId: string) {
  //   const user = await this.userService.getById(userId);
  //   return user!.favorites;
  // }
}
