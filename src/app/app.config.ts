import {ApplicationConfig, importProvidersFrom, NO_ERRORS_SCHEMA} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient} from "@angular/common/http";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async"
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppTranslateModule} from "./modules/app-translate.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withComponentInputBinding()),
    provideHttpClient(),provideAnimationsAsync(),CommonModule,ReactiveFormsModule,FormsModule,
 provideAnimationsAsync(),BrowserAnimationsModule,
    importProvidersFrom(HttpClientModule),
  importProvidersFrom(AppTranslateModule.forRoot())
  ]
};


// // AoT requires an exported function for factories
// export function HttpLoaderFactory(httpClient: HttpClient) {
//   return  new  TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
// }
//
// export const provideTranslation = () => ({
//   defaultLanguage: 'en',
//   loader: {
//     provide: TranslateLoader,
//     useFactory: HttpLoaderFactory,
//     deps: [HttpClient],
//   },
// });
//
// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideAnimations(), // required animations providers
//     provideHttpClient(),
//     importProvidersFrom([
//       HttpClientModule,
//       TranslateModule.forRoot(provideTranslation())
//     ]),
//     provideRouter(routes),
//
//   ]
// };
