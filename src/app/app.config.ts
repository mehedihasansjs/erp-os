import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CONFIG, ConfigService } from '@aitsgenesis/services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([])
    ),
    provideZoneChangeDetection({
      eventCoalescing: true
    }),
    provideRouter(routes),
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (service: ConfigService) => () => service.load('/data/config.json'),
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: CONFIG,
      useFactory: (service: ConfigService) => service.get(),
      deps: [ConfigService],
    }
  ]
};
