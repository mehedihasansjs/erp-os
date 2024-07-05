import { Injectable } from "@angular/core";

@Injectable()
export class LoggerService {
    log(message: string, data?: unknown) {
        console.log(message, data);
    }
    
    error(message: string, data?: unknown) {
        console.error(message, data);
    }
    
    warn(message: string, data?: unknown) {
        console.warn(message, data);
    }
}
