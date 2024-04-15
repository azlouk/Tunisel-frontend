import {User} from "./user";

export class Admin extends User{
  constructor( id: number,
               nom: string,
               telephone: number,
               poste: string,
               pseudo: string,
               mp: string,) {
    super(id,nom,telephone,poste,pseudo,mp);
  }

}
