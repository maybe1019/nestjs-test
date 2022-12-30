import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ required: false })
  @Expose()
  name: string;
}
