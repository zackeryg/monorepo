import { Injectable, Scope, ConsoleLogger, ConsoleLoggerOptions } from '@nestjs/common';
import { pino } from 'pino';

// TODO: Maybe we abstract pino to something else for lambda?

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {

  private logger;

  constructor(context: string, options: ConsoleLoggerOptions) {
    super(context, options);
    this.logger = pino();
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  customLog() {
    this.log('This is the custom log!');
  }
}
