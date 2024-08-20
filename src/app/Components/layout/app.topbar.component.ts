import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {LoginService} from "../../Services/login.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {getToken} from "../../../main";
import {UserService} from "../../Services/user.service";
import {RegisterRequest} from "../../Models/register-request";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
userConnect:RegisterRequest=new RegisterRequest()
    constructor(public layoutService: LayoutService, public loginservice:LoginService, public route:Router,
                private userService:UserService,private router:Router) { }

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
  public getUserConnected(){
    this.userService.getUserConnect().subscribe(value => {
      this.userConnect = value
    },error => {
     localStorage.clear();

    })
  }
  ngOnInit() {
  this.getUserConnected();
  }
  protected readonly getToken = getToken;
}
