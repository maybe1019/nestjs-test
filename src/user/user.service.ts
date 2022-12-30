import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(createUserDto);
    if (!user) {
      // log
      throw new BadRequestException('User not created');
    }
    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<boolean> {
    try {
      await this.userRepository.update(
        {
          id: updateUserDto.id,
        },
        updateUserDto,
      );
      return true;
    } catch (error) {
      // log
      return false;
    }
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      // log
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async removeUser(id: string): Promise<boolean> {
    try {
      await this.userRepository.delete({ id });
      return true;
    } catch (error) {
      // log
      return false;
    }
  }
}
