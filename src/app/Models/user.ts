import {UserType} from "../Enum/user-type";

export interface User {
  id?: number;
  nom?: string;
  telephone?: number;
  poste?: string;
  pseudo?: string;
  mp?: string;
  type?: UserType;
}
// export class User {
//     private _id: number;
//    private _nom: string;
//    private _telephone: number;
//    private _poste: string;
//    private _pseudo: string;
//    private _mp: string;
//
//
//   constructor(
//     id?: number,
//     nom?: string,
//     telephone?: number,
//     poste?: string,
//     pseudo?: string,
//     mp?: string,
//
//   ) {
//     this._id = id || 0;
//     this._nom = nom || '';
//     this._telephone = telephone || 0;
//     this._poste = poste || '';
//     this._pseudo = pseudo || '';
//     this._mp = mp || '';
//   }
//
//   get id(): number {
//     return this._id;
//   }
//
//   set id(value: number) {
//     this._id = value;
//   }
//
//   get nom(): string {
//     return this._nom;
//   }
//
//   set nom(value: string) {
//     this._nom = value;
//   }
//
//   get telephone(): number {
//     return this._telephone;
//   }
//
//   set telephone(value: number) {
//     this._telephone = value;
//   }
//
//   get poste(): string {
//     return this._poste;
//   }
//
//   set poste(value: string) {
//     this._poste = value;
//   }
//
//   get pseudo(): string {
//     return this._pseudo;
//   }
//
//   set pseudo(value: string) {
//     this._pseudo = value;
//   }
//
//   get mp(): string {
//     return this._mp;
//   }
//
//   set mp(value: string) {
//     this._mp = value;
//   }
// }
