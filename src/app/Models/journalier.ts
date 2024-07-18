import {LigneJournalier} from "./ligne-journalier";

export class Journalier {
  id: number;
  dateCreation: Date;
  nom: string;
  reference: string;
  ligneJournalierList: LigneJournalier[];

  constructor(_id: number=0, _dateCreation: Date=new Date(), _nom: string="", _reference: string="", _ligneJournalierList: LigneJournalier[]=[]) {
    this.id = _id;
    this.dateCreation = _dateCreation;
    this.nom = _nom;
    this.reference = _reference;
    this.ligneJournalierList = _ligneJournalierList;
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

  public get _ligneJournalierList(): LigneJournalier[] {
    return this.ligneJournalierList;
  }

  public set _ligneJournalierList(value: LigneJournalier[]) {
    this.ligneJournalierList = value;
  }
}
