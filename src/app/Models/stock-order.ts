import {Bassin} from "./bassin";
import {Commande} from "./commande";
import {Saline} from "./saline";
import {HistoryTransfer} from "./history-transfer";
import {Sbl} from "./sbl";


export class StockOrder{
  id: number;
  reference: string;
  dateCreation: Date;
  nom: string;
  calibre: number;

  volumeTerrain: number;
  volumePort: number;
  volumeQuai: number;

  bassinList: Bassin[];
  salines: Saline[];
  listHistory: HistoryTransfer[];
  sbl:Sbl;


  constructor(_id: number=0, _reference: string="", _dateCreation: Date=new Date(), _nom: string="", _calibre: number=0, _volumeTerrain: number=0, _volumePort: number=0, _volumeQuai: number=0, _bassinList: Bassin[]=[], _salines: Saline[]=[], _listHistory: HistoryTransfer[]=[], _sbl: Sbl={}) {
    this.id = _id;
    this.reference = _reference;
    this.dateCreation = _dateCreation;
    this.nom = _nom;
    this.calibre = _calibre;
    this.volumeTerrain = _volumeTerrain;
    this.volumePort = _volumePort;
    this.volumeQuai = _volumeQuai;
    this.bassinList = _bassinList;
    this.salines = _salines;
    this.listHistory = _listHistory;
    this.sbl = _sbl;
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

  public get _salines(): Saline[] {
    return this.salines;
  }

  public set _salines(value: Saline[]) {
    this.salines = value;
  }

  public get _listHistory(): HistoryTransfer[] {
    return this.listHistory;
  }

  public set _listHistory(value: HistoryTransfer[]) {
    this.listHistory = value;
  }

  public get _sbl(): Sbl {
    return this.sbl;
  }

  public set _sbl(value: Sbl) {
    this.sbl = value;
  }
}
