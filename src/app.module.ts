import { WinstonModule } from 'nest-winston';
import { ConfigModule } from './config/config.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import winstonConfig from './logger/utility/winston-config';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    WinstonModule.forRoot(winstonConfig),
    UserModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
