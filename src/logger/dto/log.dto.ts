import { LogType } from '../../utils/enums';
export type LogDto = {
  type: LogType;
  message?: string | unknown;
};
