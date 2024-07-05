export class AuthenticationRequest {

   email: string;
   password: string;

  constructor(_email: string="", _password: string="") {
    this.email = _email;
    this.password = _password;
  }

  public get _email(): string {
    return this.email;
  }

  public set _email(value: string) {
    this.email = value;
  }

  public get _password(): string {
    return this.password;
  }

  public set _password(value: string) {
    this.password = value;
  }
}
