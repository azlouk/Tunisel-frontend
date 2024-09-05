export class ResultCrible {

  id: number ;
  dateCreation: Date ;
  bigSalt: number ;
  refus: number ;

  constructor(_id: number=0, _dateCreation: Date=new Date(), _bigSalt: number=0, _refus: number=0) {
    this.id = _id;
    this.dateCreation = _dateCreation;
    this.bigSalt = _bigSalt;
    this.refus = _refus;
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

  public get _bigSalt(): number {
    return this.bigSalt;
  }

  public set _bigSalt(value: number) {
    this.bigSalt = value;
  }

  public get _refus(): number {
    return this.refus;
  }

  public set _refus(value: number) {
    this.refus = value;
  }
}
