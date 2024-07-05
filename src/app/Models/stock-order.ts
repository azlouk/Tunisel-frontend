import {Bassin} from "./bassin";
import {Commande} from "./commande";
import {Saline} from "./saline";
import {HistoryTransfer} from "./history-transfer";


export class StockOrder implements Object{

id: number;
reference: string;
dateCreation: Date;
nom: string;
calibre: number;
salines: Saline[];
volumeTerrain: number;
volumePort: number;
volumeQuai: number;
bassinList: Bassin[];
commandeList:Commande[];
 listHistory:HistoryTransfer[];

  constructor(_id: number=0, _reference: string="", _dateCreation: Date=new Date(), _nom: string="", _calibre: number=0, _salines: Saline[]=[], _volumeTerrain: number=0, _volumePort: number=0, _volumeQuai: number=0, _bassinList: Bassin[]=[], _commandeList: Commande[]=[], _listHistory: HistoryTransfer[]=[]) {
    this.id = _id;
    this.reference = _reference;
    this.dateCreation = _dateCreation;
    this.nom = _nom;
    this.calibre = _calibre;
    this.salines = _salines;
    this.volumeTerrain = _volumeTerrain;
    this.volumePort = _volumePort;
    this.volumeQuai = _volumeQuai;
    this.bassinList = _bassinList;
    this.commandeList = _commandeList;
    this.listHistory = _listHistory;
  }

  public get _id(): number {
    return this.id;
  }

  public set _id(value: number) {
    this.id = value;
  }

  public get _listHistory(): HistoryTransfer[] {
    return this.listHistory;
  }

  public set _listHistory(value: HistoryTransfer[]) {
    this.listHistory = value;
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

  public get _salines(): Saline[] {
    return this.salines;
  }

  public set _salines(value: Saline[]) {
    this.salines = value;
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
