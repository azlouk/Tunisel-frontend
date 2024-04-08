import {Component, ViewChild} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {Sidebar, SidebarModule} from "primeng/sidebar";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    AvatarModule,
    ButtonModule,
    SidebarModule,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  // @ts-ignore
  closeCallback(e): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
}
