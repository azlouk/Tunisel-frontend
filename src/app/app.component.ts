// import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, NO_ERRORS_SCHEMA, OnInit} from '@angular/core';
// import {Router, RouterLink, RouterOutlet} from '@angular/router';
// import {ProductService} from "./Services/product.service";
// import {ButtonModule} from "primeng/button";
//
// import {MessageService} from "primeng/api";
// import {AppLayoutModule} from "./Components/layout/app.layout.module";
// import {LoginService} from "./Services/login.service";
// import {TranslateService} from "@ngx-translate/core";
//
//
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, RouterLink, ButtonModule, AppLayoutModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css',
//   providers: [ProductService,MessageService],
//   schemas: [
//     CUSTOM_ELEMENTS_SCHEMA,
//     NO_ERRORS_SCHEMA
//   ]
// })
// export class AppComponent implements OnInit{
//   title = 'tuniselfrontend';
//     translateService=inject(TranslateService);
// constructor(public loginservice:LoginService, public route:Router) {
// }
//
//   ngOnInit(): void {
//  this.translateService.setDefaultLang('fr');
//   }
//
// }
import {Component, OnInit, inject, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from './Services/product.service';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AppLayoutModule } from './Components/layout/app.layout.module';
import { LoginService } from './Services/login.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    RouterLink,
    ButtonModule,
    AppLayoutModule,
    CommonModule,
    HttpClientModule,

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService, MessageService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ]
})
export class AppComponent implements OnInit {
  title = 'tuniselfrontend';
  translateService = inject(TranslateService);

  constructor(public loginservice: LoginService, public route: Router) {}

  ngOnInit(): void {

    this.translateService.setDefaultLang('en');
  }
}
