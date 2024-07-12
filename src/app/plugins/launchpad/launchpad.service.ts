import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG, AppConfig } from "@core";
import { of } from "rxjs";
import { App } from "./app";

@Injectable()
export class LaunchpadService {
    constructor(
        @Inject(APP_CONFIG) private config: AppConfig
    ) {}

    getApps() {
        return of(this.config.apps.map(app => new App(app)));
    }
}
