import {Pompe} from "./pompe";

export class JournalierPompe {
   id: number;
   dureePompage: number;
   debit: number;
    volumePompage: number;
   heursPanne: string;
   heursArret: string;
   pompe!: Pompe;
  densitePuit:number;

  constructor(_id: number=0, _dureePompage: number=0, _debit: number=0, _volumePompage: number=0, _heursPanne: string="", _heursArret: string="", _pompe: Pompe,_densitePuit: number=0) {
    this.id = _id;
    this.dureePompage = _dureePompage;
    this.debit = _debit;
    this.volumePompage = _volumePompage;
    this.heursPanne = _heursPanne;
    this.heursArret = _heursArret;
    this.pompe = _pompe;
    this.densitePuit=_densitePuit;
  }

  public get _id(): number {
    return this.id;
  }

  public get _densitePuit(): number {
    return this.densitePuit;
  }

  public set _densitePuit(value: number) {
    this.densitePuit = value;
  }

  public set _id(value: number) {
    this.id = value;
  }

  public get _dureePompage(): number {
    return this.dureePompage;
  }

  public set _dureePompage(value: number) {
    this.dureePompage = value;
  }

  public get _debit(): number {
    return this.debit;
  }

  public set _debit(value: number) {
    this.debit = value;
  }

  public get _volumePompage(): number {
    return this.volumePompage;
  }

  public set _volumePompage(value: number) {
    this.volumePompage = value;
  }

  public get _heursPanne(): string {
    return this.heursPanne;
  }

  public set _heursPanne(value: string) {
    this.heursPanne = value;
  }

  public get _heursArret(): string {
    return this.heursArret;
  }

  public set _heursArret(value: string) {
    this.heursArret = value;
  }

  public get _pompe(): Pompe {
    return this.pompe;
  }

  public set _pompe(value: Pompe) {
    this.pompe = value;
  }
}
