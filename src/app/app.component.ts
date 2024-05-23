import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, NO_ERRORS_SCHEMA, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
 import {ButtonModule} from "primeng/button";

import {MessageService} from "primeng/api";
import {AppLayoutModule} from "./Components/layout/app.layout.module";
import {LoginService} from "./Services/login.service";
import {TranslateLoader, TranslatePipe, TranslateService, TranslateStore} from "@ngx-translate/core";
import {forkJoin} from "rxjs";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonModule, AppLayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ MessageService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class AppComponent implements OnInit{
     title = 'tuniselfrontend';
constructor(public loginservice:LoginService, public route:Router) {
}

  ngOnInit(): void {
  }

}
