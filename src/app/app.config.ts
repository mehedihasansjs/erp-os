import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_CONFIG, AppStartupService, LoggerService } from '@core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([])),
    provideZoneChangeDetection({
      eventCoalescing: true,
    }),
    provideRouter(routes),
    LoggerService,
    AppStartupService.forRoot({
      configUrl: '/data/config.json',
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: (startupService: AppStartupService) => () =>
        startupService.loadConfig(),
      deps: [AppStartupService, LoggerService],
      multi: true,
    },
    {
      provide: APP_CONFIG,
      useFactory: (startupService: AppStartupService) =>
        startupService.getAppConfig(),
      deps: [AppStartupService],
      multi: true,
    },
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
