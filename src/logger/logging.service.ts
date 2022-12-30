import { ALLOW_LOG } from './utility/logger-constants';
import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as fs from 'fs';
import { LogDto } from './dto/log.dto';
import { SuccessResponse } from './response/response';

@Injectable()
export class LoggingService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async getServerStatus(): Promise<any> {
    return new Promise((resolve) => {
      fs.readFile('log/sever_status.log', 'utf8', function (err, buffer) {
        if (err || buffer === undefined) {
          resolve(null);
          return;
        }
        const string = buffer.toString();
        if (!string || string.length === 0) {
          resolve(null);
          return;
        }
        resolve(JSON.parse(string));
        return;
      });
    });
  }

  log(data: LogDto, allowSplitter = false) {
    const { type, message } = data;

    if (!ALLOW_LOG) {
      return;
    }
    if (type === 'error') {
      if (typeof message === 'string') {
        this.logger.error(
          `${
            allowSplitter
              ? '----------   ' + new Date().toISOString() + ' '
              : ''
          }${message}${allowSplitter ? '   ----------' : ''}`,
        );
      } else {
        this.logger.error(
          `${
            allowSplitter
              ? '----------   ' + new Date().toISOString() + ' '
              : ''
          }${JSON.stringify(message)}${allowSplitter ? '   ----------' : ''}`,
        );
      }
    } else if (type === 'warn') {
      if (typeof message === 'string') {
        this.logger.warn(
          `${
            allowSplitter
              ? '----------   ' + new Date().toISOString() + ' '
              : ''
          }${message}${allowSplitter ? '   ----------' : ''}`,
        );
      } else {
        this.logger.warn(
          `${
            allowSplitter
              ? '----------   ' + new Date().toISOString() + ' '
              : ''
          }${JSON.stringify(message)}${allowSplitter ? '   ----------' : ''}`,
        );
      }
    } else {
      if (typeof message === 'string') {
        this.logger.log(
          `${
            allowSplitter
              ? '----------   ' + new Date().toISOString() + ' '
              : ''
          }${message}${allowSplitter ? '   ----------' : ''}`,
        );
      } else {
        this.logger.log(
          `${
            allowSplitter
              ? '----------   ' + new Date().toISOString() + ' '
              : ''
          }${JSON.stringify(message)}${allowSplitter ? '   ----------' : ''}`,
        );
      }
    }
  }

  async removeLog(): Promise<SuccessResponse> {
    try {
      await fs.writeFileSync('log/warn.log', '');
      await fs.writeFileSync('log/error.log', '');
      await fs.writeFileSync('log/info.log', '');
    } catch (e) {}
    return new SuccessResponse(true);
  }
}
