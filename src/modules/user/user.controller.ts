import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  listAll() {
    return 'Matheus Lindo';
  }
}
