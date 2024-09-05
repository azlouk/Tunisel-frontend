export class ResultConcasseur {

  id: number ;
  dateCreation: Date ;
  result: number ;


  constructor(_id: number=0, _dateCreation: Date=new Date(), _result: number=0) {
    this.id = _id;
    this.dateCreation = _dateCreation;
    this.result = _result;
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

  public get _result(): number {
    return this.result;
  }

  public set _result(value: number) {
    this.result = value;
  }
}
