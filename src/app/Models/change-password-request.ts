export class ChangePasswordRequest {

   currentPassword: string;
   newPassword: string;
   confirmationPassword: string;


  constructor(_currentPassword: string="", _newPassword: string="", _confirmationPassword: string="") {
    this.currentPassword = _currentPassword;
    this.newPassword = _newPassword;
    this.confirmationPassword = _confirmationPassword;
  }

  public get _currentPassword(): string {
    return this.currentPassword;
  }

  public set _currentPassword(value: string) {
    this.currentPassword = value;
  }

  public get _newPassword(): string {
    return this.newPassword;
  }

  public set _newPassword(value: string) {
    this.newPassword = value;
  }

  public get _confirmationPassword(): string {
    return this.confirmationPassword;
  }

  public set _confirmationPassword(value: string) {
    this.confirmationPassword = value;
  }
}
