export class TraitementStock {
  id: number ;
  dateCreation: Date ;
  sortieB1: number ;
  sortieB2: number ;
  refus: number ;

  constructor(_id: number=0, _dateCreation: Date=new Date(), _sortieB1: number=0, _sortieB2: number=0, _refus: number=0) {
    this.id = _id;
    this.dateCreation = _dateCreation;
    this.sortieB1 = _sortieB1;
    this.sortieB2 = _sortieB2;
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

  public get _sortieB1(): number {
    return this.sortieB1;
  }

  public set _sortieB1(value: number) {
    this.sortieB1 = value;
  }

  public get _sortieB2(): number {
    return this.sortieB2;
  }

  public set _sortieB2(value: number) {
    this.sortieB2 = value;
  }

  public get _refus(): number {
    return this.refus;
  }

  public set _refus(value: number) {
    this.refus = value;
  }
}
