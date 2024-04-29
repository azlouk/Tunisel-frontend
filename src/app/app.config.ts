import { ApplicationConfig ,NO_ERRORS_SCHEMA} from '@angular/core';
import {provideRouter} from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async"
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),provideAnimationsAsync(),CommonModule,ReactiveFormsModule,FormsModule

  ]
};
