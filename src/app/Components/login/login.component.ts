// @ts-ignore

import {Component, OnInit} from '@angular/core';

import {LoginService} from "../../Services/login.service";

import {User} from "../../Models/user";
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {Router, RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ChipsModule} from "primeng/chips";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    FormsModule,
    CheckboxModule,
    RouterLink,
    ButtonModule,
    RippleModule,
    ChipsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent implements OnInit{

  constructor(private loginService: LoginService,private router: Router) {

  }
  user: User = {};



  ngOnInit() {

    }


 authUser(){
  this.loginService.loggdinUser(this.user)
.subscribe(() => {

  console.log("L'utilisateur est authentifié avec succès");
  this.router.navigate(['/dash']);
}, error => {
  console.log('Erreur lors de la vérification de lauthentification ');
  Swal.fire({
    icon: "error",
    title: "Erreur d'authentification",
    text: "Utilisateur invalide ou mot de passe incorrect!",
    // confirmButtonColor: '#d33',
    confirmButtonText: 'Réessayer'

  });
});
}}
