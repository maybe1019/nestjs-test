import { ApiProperty } from '@nestjs/swagger';
export class SuccessResponse {
  @ApiProperty()
  readonly success: boolean;

  @ApiProperty()
  readonly message?: string;

  constructor(success: boolean, message = '') {
    this.success = success;
    this.message = message;
  }
}
