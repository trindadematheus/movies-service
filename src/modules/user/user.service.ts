import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO, QueryDTO, UpdateUserDTO } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  index(query: QueryDTO) {
    const order = query.order || 'desc';

    const take = parseInt(query.take) || 10;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * take;

    return this.userRepository.find({
      where: {
        is_admin: false,
        is_active: true,
      },
      order: {
        name: order,
      },
      take: take,
      skip: skip,
    });
  }

  async show(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('This user was not found');
    }

    return user;
  }

  async create(createUserDTO: CreateUserDTO) {
    const user = await this.userRepository.findOneBy({
      email: createUserDTO.email,
    });

    if (user) {
      throw new ConflictException('This email has already been taken');
    }

    const newUser = {
      ...createUserDTO,
      is_active: true,
    };

    return this.userRepository.save(newUser);
  }

  async update(id: string, updateUserDTO: UpdateUserDTO) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('This user was not found');
    }

    if (updateUserDTO.email) {
      const userByEmail = await this.userRepository.findOneBy({
        email: updateUserDTO.email,
      });

      if (userByEmail) {
        throw new ConflictException('This email has already been taken');
      }
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
