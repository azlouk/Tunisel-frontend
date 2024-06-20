import {Bassin} from "./bassin";
import {Commande} from "./commande";

export class StockOrder {

 id: number;
 reference: string;
 dateCreation: Date;
 nom: string;
 calibre: number;
 volumeSaline: number;
 volumeTerrain: number;
 volumePort: number;
 volumeQuai: number;
 bassinList: Bassin[];
 commandeList:Commande[];

  constructor(_id: number, _reference: string, _dateCreation: Date, _nom: string, _calibre: number, _volumeSaline: number, _volumeTerrain: number, _volumePort: number, _volumeQuai: number, _bassinList: Bassin[], _commandeList: Commande[]) {
    this.id = _id;
    this.reference = _reference;
    this.dateCreation = _dateCreation;
    this.nom = _nom;
    this.calibre = _calibre;
    this.volumeSaline = _volumeSaline;
    this.volumeTerrain = _volumeTerrain;
    this.volumePort = _volumePort;
    this.volumeQuai = _volumeQuai;
    this.bassinList = _bassinList;
    this.commandeList = _commandeList;
  }

  public get _id(): number {
    return this.id;
  }

  public set _id(value: number) {
    this.id = value;
  }

  public get _reference(): string {
    return this.reference;
  }

  public set _reference(value: string) {
    this.reference = value;
  }

  public get _dateCreation(): Date {
    return this.dateCreation;
  }

  public set _dateCreation(value: Date) {
    this.dateCreation = value;
  }

  public get _nom(): string {
    return this.nom;
  }

  public set _nom(value: string) {
    this.nom = value;
  }

  public get _calibre(): number {
    return this.calibre;
  }

  public set _calibre(value: number) {
    this.calibre = value;
  }

  public get _volumeSaline(): number {
    return this.volumeSaline;
  }

  public set _volumeSaline(value: number) {
    this.volumeSaline = value;
  }

  public get _volumeTerrain(): number {
    return this.volumeTerrain;
  }

  public set _volumeTerrain(value: number) {
    this.volumeTerrain = value;
  }

  public get _volumePort(): number {
    return this.volumePort;
  }

  public set _volumePort(value: number) {
    this.volumePort = value;
  }

  public get _volumeQuai(): number {
    return this.volumeQuai;
  }

  public set _volumeQuai(value: number) {
    this.volumeQuai = value;
  }

  public get _bassinList(): Bassin[] {
    return this.bassinList;
  }

  public set _bassinList(value: Bassin[]) {
    this.bassinList = value;
  }

  public get _commandeList(): Commande[] {
    return this.commandeList;
  }

  public set _commandeList(value: Commande[]) {
    this.commandeList = value;
  }
}
