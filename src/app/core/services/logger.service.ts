import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  debug(message: string, ...optionalParams: unknown[]): void {
    console.debug(message, ...optionalParams);
  }
}
