import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ProductService} from "./Services/product.service";
import {ButtonModule} from "primeng/button";

import {MessageService} from "primeng/api";
import {AppLayoutModule} from "./Components/layout/app.layout.module";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonModule, AppLayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ProductService,MessageService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppComponent {
  title = 'tuniselfrontend';

}
