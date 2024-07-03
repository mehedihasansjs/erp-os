import { Injectable } from "@angular/core";

@Injectable()
export class LoggerService {
    debug(message: string, ...optionalParams: any[]): void {
        console.debug(message, ...optionalParams);
    }
}
