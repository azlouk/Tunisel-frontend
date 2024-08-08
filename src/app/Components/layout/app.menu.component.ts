
import { OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';
import { getToken} from "../../../main";
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
