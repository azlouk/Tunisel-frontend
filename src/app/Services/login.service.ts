import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment/environment";
import {User} from "../Models/user";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) {
  }


  loggdinUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/login`, user)
      .pipe(
        catchError(error => {
          // Gérer l'erreur et renvoyer une observable avec l'erreur
          console.error('Erreur lors de la tentative de connexion de l\'utilisateur:', error);
          throw error; // renvoie l'erreur pour que le gestionnaire d'erreur de l'observateur puisse le gérer
        })
      );
  }



}
