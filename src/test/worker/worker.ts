import { Logger } from '@nestjs/common';
import { parentPort, workerData } from 'worker_threads';
const { data } = workerData;
const logger = new Logger('Worker');

// process request
logger.log(`Request processed - ${data.id} - ${data.name}`);
parentPort.postMessage(data);
