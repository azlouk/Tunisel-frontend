
import {computed, effect, model, OnInit, signal} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';
import {getModelDefault, getModelFiltree, getToken, getTokenn} from "../../../main";
import {count} from "rxjs";
import {UserService} from "../../Services/user.service";
import {RegisterRequest} from "../../Models/register-request";
import {LoginService} from "../../Services/login.service";

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  constructor(public layoutService: LayoutService,public loginService:LoginService) {

  }

ngOnInit() {

 this.loginService.getUserConnect();

  }

  protected readonly getToken = getToken;


}
