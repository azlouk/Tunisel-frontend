import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {TranslateCompiler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateMessageFormatCompiler} from "ngx-translate-messageformat-compiler";

const httpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, '../assets/i18n/', '.json');
const translateCompilerFactory = () => new TranslateMessageFormatCompiler();
const translateLoader: Provider = {
  provide: TranslateLoader,
  useFactory: httpLoaderFactory,
  deps: [HttpClient]
};
const translateCompiler: Provider = {
  provide: TranslateCompiler,
  useFactory: translateCompilerFactory
}

@NgModule()
export class AppTranslateModule {

  static forRoot(): ModuleWithProviders<AppTranslateModule> {
    return TranslateModule.forRoot({
      loader: translateLoader,
      compiler: translateCompiler
    });
  }

  static forChild(): ModuleWithProviders<AppTranslateModule> {
    return TranslateModule.forRoot({
      loader: translateLoader,
      compiler: translateCompiler,
      isolate: false
    });
  }
}


// import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
// import { TranslateLoader, TranslateModule, TranslateCompiler } from '@ngx-translate/core';
// import { HttpClient } from '@angular/common/http';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
//
// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http, 'assets/i18n', '.json');
// }
//
// const translateLoader: Provider = {
//   provide: TranslateLoader,
//   useFactory: HttpLoaderFactory,
//   deps: [HttpClient]
// };
//
// const translateCompiler: Provider = {
//   provide: TranslateCompiler,
//   useClass: TranslateMessageFormatCompiler
// };
//
// @NgModule()
// export class AppTranslateModule {
//   static forRoot(): ModuleWithProviders<TranslateModule> {
//     return {
//       ngModule: TranslateModule,
//       providers: [
//         translateLoader,
//         translateCompiler
//       ]
//     };
//   }
//
//   static forChild(): ModuleWithProviders<TranslateModule> {
//     return {
//       ngModule: TranslateModule,
//       providers: [
//         translateLoader,
//         translateCompiler
//       ]
//     };
//   }
// }
