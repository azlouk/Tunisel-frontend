export class Sondage {
 id: number;
 dateDebut: Date;
 dateFin: Date;
 epaisseur: number;
 densite: number;


  constructor(_id: number=0, _dateDebut: Date=new Date(), _dateFin: Date=new Date(), _epaisseur: number=0, _densite: number=0) {
    this.id = _id;
    this.dateDebut = _dateDebut;
    this.dateFin = _dateFin;
    this.epaisseur = _epaisseur;
    this.densite = _densite;
  }

  public get _id(): number {
    return this.id;
  }

  public set _id(value: number) {
    this.id = value;
  }

  public get _dateDebut(): Date {
    return this.dateDebut;
  }

  public set _dateDebut(value: Date) {
    this.dateDebut = value;
  }

  public get _dateFin(): Date {
    return this.dateFin;
  }

  public set _dateFin(value: Date) {
    this.dateFin = value;
  }

  public get _epaisseur(): number {
    return this.epaisseur;
  }

  public set _epaisseur(value: number) {
    this.epaisseur = value;
  }

  public get _densite(): number {
    return this.densite;
  }

  public set _densite(value: number) {
    this.densite = value;
  }
}
