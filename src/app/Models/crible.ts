import {Bande} from "./bande";
import {ResultCrible} from "./result-crible";

export class Crible {

   id: number ;
   nom: string;
   reference: string;
   description: string;
   etat: string;
   bandeList: Bande[];
   resultCribles: ResultCrible[];


  constructor(_id: number=0, _nom: string="", _reference: string="", _description: string="", _etat: string="", _bandeList: Bande[]=[], _resultCribles: ResultCrible[]=[]) {
    this.id = _id;
    this.nom = _nom;
    this.reference = _reference;
    this.description = _description;
    this.etat = _etat;
    this.bandeList = _bandeList;
    this.resultCribles = _resultCribles;
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

  public get _bandeList(): Bande[] {
    return this.bandeList;
  }

  public set _bandeList(value: Bande[]) {
    this.bandeList = value;
  }

  public get _resultCribles(): ResultCrible[] {
    return this.resultCribles;
  }

  public set _resultCribles(value: ResultCrible[]) {
    this.resultCribles = value;
  }
}
