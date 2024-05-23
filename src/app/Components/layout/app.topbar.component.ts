import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {LoginService} from "../../Services/login.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {getToken} from "../../../main";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, public loginservice:LoginService, public route:Router) { }

  dec() {
    Swal.fire({
      title: "Are you sure?",
      text: "You can log in again with your username and password",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Disconnect",
      cancelButtonText:"keep"
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginservice.logout()
      }
    });


  }

  protected readonly getToken = getToken;
}
