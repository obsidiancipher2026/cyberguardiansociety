import morgan from 'morgan';
import logger from '../utils/logger';

const stream: morgan.StreamOptions = {
  write: (message: string) => logger.http(message.trim()),
};

const skip = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

const httpLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

export default httpLogger;
