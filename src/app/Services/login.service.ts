import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment/environment";
import {catchError, Observable} from "rxjs";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {AuthenticationRequest} from "../Models/authentication-request";
import {AuthenticationResponse} from "../Models/authentication-response";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  apiUrl=environment.apiUrl
  public Islogin: boolean=false;
  public  tokenKey: string="token";

  constructor(private http: HttpClient ,   private router: Router,private userService:UserService) {
  }


  loggdinUser(request:AuthenticationRequest) {

    this.http.post<AuthenticationResponse>(`${this.apiUrl}/users/auth/authenticate`, request).subscribe((token:AuthenticationResponse) => {
      // console.log("response data :"+new JsonPipe().transform(token))
      if((token!=null && token!=undefined)|| true) {

        localStorage.setItem(this.tokenKey,token.access_token );
        this.userService.getUserConnect().subscribe(value => {

        localStorage.setItem("role",value.role);
        })
        this.router.navigate(['dash']);
      }else {
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
}
