import { LogType } from '../utils/enums';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoggingService } from '../logger/logging.service';
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
    private logger: LoggingService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(createUserDto);
    if (!user) {
      this.logger.log({
        type: LogType.WARN,
        message: 'User not created',
      });
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
      this.logger.log({
        type: LogType.WARN,
        message: error.message,
      });
      return false;
    }
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      this.logger.log({
        type: LogType.WARN,
        message: 'User not found',
      });
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async removeUser(id: string): Promise<boolean> {
    try {
      await this.userRepository.delete({ id });
      return true;
    } catch (error) {
      this.logger.log({
        type: LogType.WARN,
        message: error.message,
      });
      return false;
    }
  }
}
