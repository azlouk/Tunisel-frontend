
import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../Services/login.service";
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {Router, RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ChipsModule} from "primeng/chips";
import Swal from "sweetalert2";
import {AuthenticationRequest} from "../../Models/authentication-request";

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
  authentificationRequest:AuthenticationRequest=new AuthenticationRequest();


  ngOnInit() {
    if(this.loginService.isLoggedIn()    ){
      this.router.navigate(["/dash"])
    }
     }


 authUser(){
  this.loginService.loggdinUser(this.authentificationRequest)

}

getPassWord(){
  Swal.fire({
    title: "Veuillez vous saisie vote numéro téléphone",
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "Récupérer",
    showLoaderOnConfirm: true,

    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {

    }
  });
}


}
