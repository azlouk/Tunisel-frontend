import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ProductService} from "./Services/product.service";
import {ButtonModule} from "primeng/button";
import {SidebarComponent} from "./Components/sidebar/sidebar.component";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ProductService,MessageService]
})
export class AppComponent {
  title = 'tuniselfrontend';

}
