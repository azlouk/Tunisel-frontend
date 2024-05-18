import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



const modules=[
  TranslateModule,
  CommonModule,
  FormsModule,
  BrowserAnimationsModule,
]

@NgModule({
  declarations: [],
  imports:
    modules,
    exports:[
      ...modules
    ]

})
export class SharedModule { }
