import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_CONFIG, AppStartupService, errorInterceptor, LoggerService } from '@core';
import { IconService, ThemeService } from '@plugins';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        errorInterceptor
      ])
    ),
    provideZoneChangeDetection({
      eventCoalescing: true
    }),
    provideRouter(routes),
    ThemeService,
    IconService,
    LoggerService,
    AppStartupService.forRoot({
      configUrl: '/data/config.json',
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: (startupService: AppStartupService) => () => startupService.loadConfig(),
      deps: [AppStartupService, LoggerService],
      multi: true,
    },
    {
      provide: APP_CONFIG,
      useFactory: (startupService: AppStartupService) => startupService.getAppConfig(),
      deps: [AppStartupService],
      multi: true,
    },
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
  ]
};
