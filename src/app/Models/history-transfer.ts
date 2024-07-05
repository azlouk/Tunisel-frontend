export class HistoryTransfer {

  id: number;
  dateCreation: Date;
  startingPoint: string;
  arrivingPoint: string;
  transferQuantity: number;


  constructor(_id: number=0, _dateCreation: Date=new Date(), _startingPoint: string="", _arrivingPoint: string="", _transferQuantity: number=0) {
    this.id = _id;
    this.dateCreation = _dateCreation;
    this.startingPoint = _startingPoint;
    this.arrivingPoint = _arrivingPoint;
    this.transferQuantity = _transferQuantity;
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

  public get _startingPoint(): string {
    return this.startingPoint;
  }

  public set _startingPoint(value: string) {
    this.startingPoint = value;
  }

  public get _arrivingPoint(): string {
    return this.arrivingPoint;
  }

  public set _arrivingPoint(value: string) {
    this.arrivingPoint = value;
  }

  public get _transferQuantity(): number {
    return this.transferQuantity;
  }

  public set _transferQuantity(value: number) {
    this.transferQuantity = value;
  }
}
