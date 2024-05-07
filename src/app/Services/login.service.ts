import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment/environment";
import {User} from "../Models/user";
import {catchError, Observable} from "rxjs";
import {JsonPipe} from "@angular/common";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl=environment.apiUrl
  public Islogin: boolean=false;
  public tokenKey: string="token";

  constructor(private http: HttpClient ,   private router: Router) {
  }


  loggdinUser(user: User) {

    console.log(new JsonPipe().transform(user))
      this.http.post<any>(`${this.apiUrl}/users/login`, user).subscribe((token:User) => {
        console.log("response data :"+new JsonPipe().transform(token))
        if((token!=null && token.userType!=undefined)|| true) {
          // @ts-ignore
          localStorage.setItem(this.tokenKey, token.userType.toString());
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

  GetPassword(user: User):Observable<User> {

      return this.http.post<User>(`${this.apiUrl}/users/pass`, user) ;


  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
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
