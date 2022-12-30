import { LogType } from '../../utils/enums';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';

const moduleName = 'Test Backend';

const winstonConfig = {
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike(moduleName, {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    new winston.transports.File({
      filename: 'log/warn.log',
      level: LogType.WARN,
    }),
    new winston.transports.File({
      filename: 'log/error.log',
      level: LogType.ERROR,
    }),
    new winston.transports.File({
      filename: 'log/info.log',
      level: LogType.INFO,
    }),
  ],
};

export default winstonConfig;
