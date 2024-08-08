import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment/environment";
import {catchError, Observable} from "rxjs";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {AuthenticationRequest} from "../Models/authentication-request";
import {AuthenticationResponse} from "../Models/authentication-response";
import {UserService} from "./user.service";
import {getModelDefault, getModelFiltree, getToken} from "../../main";
import {RegisterRequest} from "../Models/register-request";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  apiUrl=environment.apiUrl
  public Islogin: boolean=false;
  public  tokenKey: string="token";
public user:RegisterRequest=new RegisterRequest();
  public model!:any[];
  constructor(private http: HttpClient ,   private router: Router,private userService:UserService) {
  }


async  loggdinUser(request:AuthenticationRequest) {

    this.http.post<AuthenticationResponse>(`${this.apiUrl}/users/auth/authenticate`, request).subscribe(async (token: AuthenticationResponse) => {
      // console.log("response data :"+new JsonPipe().transform(token))
      if ((token != null && token != undefined) || true) {

        localStorage.setItem(this.tokenKey, token.access_token);
        await this.getUserConnect()

      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur d'authentification",
          text: "Utilisateur invalide ou mot de passe incorrect!",
          // confirmButtonColor: '#d33',
          confirmButtonText: 'Réessayer'

        });
      }
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Erreur d'authentification",
        text: "Utilisateur invalide ou mot de passe incorrect!",
        // confirmButtonColor: '#d33',
        confirmButtonText: 'Réessayer'

      });

    }) ;

  }

  authenticate(request:AuthenticationRequest ): Observable<AuthenticatorResponse>{
    return this.http.post<AuthenticatorResponse>(`${this.apiUrl}/users/auth/authenticate`, request);
  }


  public logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem("role");
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

 async getUserConnect(){
    this.userService.getUserConnect().subscribe(value => {
      this.user=value

      localStorage.setItem("role",value.role);
      if (this.user.role == "ADMIN" || this.user.role == "EMPLOYER") {
       this. model=getModelDefault();
       if(!this.isLoggedIn())
        this.router.navigate(['dash']);
      } else if (this.user.role == "COSTUMER") {
        this.model=getModelFiltree();
        if(!this.isLoggedIn())
        this.router.navigate(['commande']);
      }

    })
  }
}
