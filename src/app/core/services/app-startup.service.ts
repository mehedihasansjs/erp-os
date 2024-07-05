import { Observable, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { AppConfig } from '../models';

@Injectable()
export class AppStartupService {
  private config!: AppConfig;

  private static localConfig: AppStartupServiceConfig;

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  static forRoot(config: AppStartupServiceConfig): typeof AppStartupService {
    AppStartupService.localConfig = config;
    return this;
  }

  /**
   * Load application configuration
   */
  loadConfig(): Observable<AppConfig> {
    const configUrl: string = AppStartupService.localConfig.configUrl;

    if (!configUrl) {
      throw new Error('Application configuration URL is not provided');
    }

    const config$ = this.http.get<AppConfig>(
      AppStartupService.localConfig.configUrl
    );

    return config$.pipe(
      take(1),
      tap({
        next: config => {
          this.logger.debug('Application configuration loaded:', config);
          this.config = config;
        },
      })
    );
  }

  /**
   * Get application configuration
   */
  getAppConfig(): AppConfig {
    return this.config;
  }
}

export class AppStartupServiceConfig {
  configUrl!: string;
}
