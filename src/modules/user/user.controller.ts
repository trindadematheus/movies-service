import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index() {
    return this.userService.index();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.userService.show(id);
  }

  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this.userService.update(id, updateUserDTO);
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.userService.destroy(id);
  }
}
