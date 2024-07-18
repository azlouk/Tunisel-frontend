import {Puit} from "./puit";
import {Bassin} from "./bassin";
import {JournalierPompe} from "./journalier-pompe";

export class LigneJournalier {
   id: number;
   dateCreation: Date;
   etatBassin: string;
   selRecoltable: number;
   profondeurSaumure: number;
   densiteBassin: number;
   densitePuit: number;
   observation: string;
   meteo: string;
   puitUtilises: Puit[];
   bassin: Bassin;
   journalierPompeList: JournalierPompe[];


  constructor(_id: number=0, _dateCreation: Date=new Date(), _etatBassin: string="", _selRecoltable: number=0, _profondeurSaumure: number=0, _densiteBassin: number=0, _densitePuit: number=0, _observation: string="", _meteo: string="", _puitUtilises: Puit[]=[], _bassin: Bassin={}, _journalierPompeList: JournalierPompe[]=[]) {
    this.id = _id;
    this.dateCreation = _dateCreation;
    this.etatBassin = _etatBassin;
    this.selRecoltable = _selRecoltable;
    this.profondeurSaumure = _profondeurSaumure;
    this.densiteBassin = _densiteBassin;
    this.densitePuit = _densitePuit;
    this.observation = _observation;
    this.meteo = _meteo;
    this.puitUtilises = _puitUtilises;
    this.bassin = _bassin;
    this.journalierPompeList = _journalierPompeList;
  }

  public get _id(): number {
    return this.id;
  }

  public set _id(value: number) {
    this.id = value;
  }

  public get _dateCreation(): Date {
    return this.dateCreation;
  }

  public set _dateCreation(value: Date) {
    this.dateCreation = value;
  }

  public get _etatBassin(): string {
    return this.etatBassin;
  }

  public set _etatBassin(value: string) {
    this.etatBassin = value;
  }

  public get _selRecoltable(): number {
    return this.selRecoltable;
  }

  public set _selRecoltable(value: number) {
    this.selRecoltable = value;
  }


  public get _profondeurSaumure(): number {
    return this.profondeurSaumure;
  }

  public set _profondeurSaumure(value: number) {
    this.profondeurSaumure = value;
  }

  public get _densiteBassin(): number {
    return this.densiteBassin;
  }

  public set _densiteBassin(value: number) {
    this.densiteBassin = value;
  }

  public get _densitePuit(): number {
    return this.densitePuit;
  }

  public set _densitePuit(value: number) {
    this.densitePuit = value;
  }

  public get _observation(): string {
    return this.observation;
  }

  public set _observation(value: string) {
    this.observation = value;
  }

  public get _meteo(): string {
    return this.meteo;
  }

  public set _meteo(value: string) {
    this.meteo = value;
  }

  public get _puitUtilises(): Puit[] {
    return this.puitUtilises;
  }

  public set _puitUtilises(value: Puit[]) {
    this.puitUtilises = value;
  }

  public get _bassin(): Bassin {
    return this.bassin;
  }

  public set _bassin(value: Bassin) {
    this.bassin = value;
  }

  public get _journalierPompeList(): JournalierPompe[] {
    return this.journalierPompeList;
  }

  public set _journalierPompeList(value: JournalierPompe[]) {
    this.journalierPompeList = value;
  }
}
