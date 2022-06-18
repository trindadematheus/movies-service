import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
  @HttpCode(201)
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  @Put(':id')
  @HttpCode(204)
  update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this.userService.update(id, updateUserDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  destroy(@Param('id') id: string) {
    return this.userService.destroy(id);
  }
}
