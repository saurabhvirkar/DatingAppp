import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { ErrorInterceptor } from './app/_interceptors/error.interceptor';
import { JwtInterceptor } from './app/_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './app/_interceptors/loading.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule, HttpClientModule, MatProgressSpinnerModule),
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    provideNativeDateAdapter()
  ]
}).catch(err => console.error(err));
