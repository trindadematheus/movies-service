import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  createMockRepository,
  MockRepository,
} from '../../utils/mock-repository';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find user by id', () => {
    it('should return user', async () => {
      const userId = '1';
      const expectedUser = {};
      userRepository.findOneBy.mockReturnValue(expectedUser);

      const user = await service.show(userId);
      expect(user).toEqual(expectedUser);
    });

    it('should return NotFound when dont find user', async () => {
      const userId = '1';
      userRepository.findOneBy.mockReturnValue(undefined);

      try {
        await service.show(userId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
