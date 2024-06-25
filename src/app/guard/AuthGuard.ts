 import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {LoginService} from "../Services/login.service";
 import {getToken} from "../../main";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: LoginService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (!this.authService.isLoggedIn() ) {
      this.router.navigate(['/login']);
    }





if(this.authService.isLoggedIn() && getToken()=="COSTUMER" && route.url.find(value => value.path==="commande" || value.path==="updateCommande"   )==undefined ) {

   this.router.navigate(['/commande']);
  return false
  }


    return true;
  }
}
