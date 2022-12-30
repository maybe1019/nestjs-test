import { Controller, Post, Body } from '@nestjs/common';
import { TestDto } from './dto/request.dto';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @Post()
  doSomething(@Body() data: TestDto) {
    this.testService.registerRequests(data);
  }
}
