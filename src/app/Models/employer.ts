import {User} from "./user";

export class Employer implements User{
  constructor( id: number,
               nom: string,
               telephone: number,
               poste: string,
               pseudo: string,
               mp: string,) {
    // super(id,nom,telephone,poste,pseudo,mp);
  }
}
