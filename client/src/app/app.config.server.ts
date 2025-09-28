import { ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HIGH_CONTRAST_MODE_ACTIVE } from '@angular/cdk/platform';

export const config: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    ...appConfig.providers,
    { provide: HIGH_CONTRAST_MODE_ACTIVE, useValue: false }
  ]
};
