
import {Role} from "../Enum/Role";

export class User {
  id: number;
  nom: string;
  telephone: number;
  poste: string;
  email: string;
  password: string;
  role: Role;

  constructor(_id: number=0, _nom: string="", _telephone: number=0, _poste: string="", _email: string="", _password: string="", _role: Role=Role.ADMIN) {
    this.id = _id;
    this.nom = _nom;
    this.telephone = _telephone;
    this.poste = _poste;
    this.email = _email;
    this.password = _password;
    this.role = _role;
  }

  public get _id(): number {
    return this.id;
  }

  public set _id(value: number) {
    this.id = value;
  }

  public get _nom(): string {
    return this.nom;
  }

  public set _nom(value: string) {
    this.nom = value;
  }

  public get _telephone(): number {
    return this.telephone;
  }

  public set _telephone(value: number) {
    this.telephone = value;
  }

  public get _poste(): string {
    return this.poste;
  }

  public set _poste(value: string) {
    this.poste = value;
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

  public get _role(): Role {
    return this.role;
  }

  public set _role(value: Role) {
    this.role = value;
  }
}




