import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  index() {
    return this.userRepository.find();
  }

  async show(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('This user was not found');
    }

    return user;
  }

  create(createUserDTO: CreateUserDTO) {
    const user = this.userRepository.create({
      ...createUserDTO,
      is_active: true,
    });

    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDTO: UpdateUserDTO) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('This user was not found');
    }

    return this.userRepository.save({
      ...user,
      ...updateUserDTO,
    });
  }

  async destroy(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('This user was not found');
    }

    return this.userRepository.save({
      ...user,
      is_active: false,
    });
  }
}
