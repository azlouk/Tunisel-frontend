import {ResultConcasseur} from "./result-concasseur";
import {Crible} from "./crible";

export class Concasseur {

   id: number;
   nom: string;
   reference: string;
   description: string;
   etat: string;

   cribleList: Crible[];
   resultConcasseurs: ResultConcasseur[];


  constructor(_id: number=0, _nom: string="", _reference: string="", _description: string="", _etat: string="", _cribleList: Crible[]=[], _resultConcasseurs: ResultConcasseur[]=[]) {
    this.id = _id;
    this.nom = _nom;
    this.reference = _reference;
    this.description = _description;
    this.etat = _etat;
    this.cribleList = _cribleList;
    this.resultConcasseurs = _resultConcasseurs;
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

  public get _reference(): string {
    return this.reference;
  }

  public set _reference(value: string) {
    this.reference = value;
  }

  public get _description(): string {
    return this.description;
  }

  public set _description(value: string) {
    this.description = value;
  }

  public get _etat(): string {
    return this.etat;
  }

  public set _etat(value: string) {
    this.etat = value;
  }

  public get _cribleList(): Crible[] {
    return this.cribleList;
  }

  public set _cribleList(value: Crible[]) {
    this.cribleList = value;
  }

  public get _resultConcasseurs(): ResultConcasseur[] {
    return this.resultConcasseurs;
  }

  public set _resultConcasseurs(value: ResultConcasseur[]) {
    this.resultConcasseurs = value;
  }
}
