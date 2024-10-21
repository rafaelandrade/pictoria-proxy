import { Logger } from '@ballin-team/lib-apm';
import { Injectable, ConsoleLogger } from '@nestjs/common';

export const customLogger = new Logger({
  name: 'pictoria-proxy',
  minLevel: 'info',
  suppressStdOutput: true,
  transports: [
    {
      provider: 'gcpLogging',
      minLevel: 'info',
      enabled: true,
    },
  ],
});

@Injectable()
export class LoggerService extends ConsoleLogger {
  client = customLogger;

  constructor() {
    super();
  }

  log(message: any, ...optionalParams: any[]) {
    this.client.info(message, optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]) {
    this.client.fatal(message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.client.error(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.client.warn(message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.client.debug(message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.client.debug(message, optionalParams);
  }
}
