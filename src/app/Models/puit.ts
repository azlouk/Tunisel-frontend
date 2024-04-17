import {Bassin} from "./bassin";
import {AnalysesChimique} from "./analyses-chimique";
export interface Puit{
  id?: number;
  reference?: string;
  description?: string;
  dateCreation?: Date;
  nom?: string;
  emplacement?: string;
  etat?: string;
  dateFermeture?: Date;
  bassins?: Bassin[];
  analysesChimiques?: AnalysesChimique[];

// }
// export class Puit {
//   private _id: number;
//   private _reference: string;
//   private _description: string;
//   private _dateCreation: string;
//   private _nom: string;
//   private _emplacement: string;
//   private _etat: string;
//   private _dateFermeture: string;
//   private _bassins: Bassin[];
//   private _analysesChimiques: AnalysesChimique[];
//
//
//   constructor(
//     id?: number,
//     reference?: string,
//     description?: string,
//     dateCreation?: string,
//     nom?: string,
//     emplacement?: string,
//     etat?: string,
//     dateFermeture?: string,
//     bassins?: Bassin[],
//     analysesChimiques?: AnalysesChimique[])
//   {
//     this._id = id||0;
//     this._reference = reference||'';
//     this._description = description||'';
//     this._dateCreation = dateCreation||'';
//     this._nom = nom||'';
//     this._emplacement = emplacement||'';
//     this._etat = etat||'';
//     this._dateFermeture = dateFermeture||'';
//     this._bassins = bassins||[];
//     this._analysesChimiques = analysesChimiques||[];
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
//   get reference(): string {
//     return this._reference;
//   }
//
//   set reference(value: string) {
//     this._reference = value;
//   }
//
//   get description(): string {
//     return this._description;
//   }
//
//   set description(value: string) {
//     this._description = value;
//   }
//
//   get dateCreation(): string {
//     return this._dateCreation;
//   }
//
//   set dateCreation(value: string) {
//     this._dateCreation = value;
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
//   get emplacement(): string {
//     return this._emplacement;
//   }
//
//   set emplacement(value: string) {
//     this._emplacement = value;
//   }
//
//   get etat(): string {
//     return this._etat;
//   }
//
//   set etat(value: string) {
//     this._etat = value;
//   }
//
//   get dateFermeture(): string {
//     return this._dateFermeture;
//   }
//
//   set dateFermeture(value: string) {
//     this._dateFermeture = value;
//   }
//
//   get bassins(): Bassin[] {
//     return this._bassins;
//   }
//
//   set bassins(value: Bassin[]) {
//     this._bassins = value;
//   }
//
//   get analysesChimiques(): AnalysesChimique[] {
//     return this._analysesChimiques;
//   }
//
//   set analysesChimiques(value: AnalysesChimique[]) {
//     this._analysesChimiques = value;
//   }
}
