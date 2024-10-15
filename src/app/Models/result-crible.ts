export class ResultCrible {

 id: number ;
 dateCreation: Date ;
 bigSalt: number ;
 refus: number ;
 calibre :number


  constructor(_id: number=0, _dateCreation: Date=new Date(), _bigSalt: number=0, _refus: number=0, _calibre: number=0) {
    this.id = _id;
    this.dateCreation = _dateCreation;
    this.bigSalt = _bigSalt;
    this.refus = _refus;
    this.calibre = _calibre;
  }

  get _id(): number {
    return this.id;
  }

  set _id(value: number) {
    this.id = value;
  }

  get _dateCreation(): Date {
    return this.dateCreation;
  }

  set _dateCreation(value: Date) {
    this.dateCreation = value;
  }

  get _bigSalt(): number {
    return this.bigSalt;
  }

  set _bigSalt(value: number) {
    this.bigSalt = value;
  }

  get _refus(): number {
    return this.refus;
  }

  set _refus(value: number) {
    this.refus = value;
  }

  get _calibre(): number {
    return this.calibre;
  }

  set _calibre(value: number) {
    this.calibre = value;
  }
}
