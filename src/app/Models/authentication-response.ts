export class AuthenticationResponse {

  access_token: string;
  refresh_token: string;


  constructor(_access_token: string="", _refresh_token: string="") {
    this.access_token = _access_token;
    this.refresh_token = _refresh_token;
  }

  public get _access_token(): string {
    return this.access_token;
  }

  public set _access_token(value: string) {
    this.access_token = value;
  }

  public get _refresh_token(): string {
    return this.refresh_token;
  }

  public set _refresh_token(value: string) {
    this.refresh_token = value;
  }
}
