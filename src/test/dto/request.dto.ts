import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class TestDto {
  @ApiProperty({ required: true })
  @Expose()
  id: string;

  @ApiProperty({ required: false })
  @Expose()
  name: string;
}
