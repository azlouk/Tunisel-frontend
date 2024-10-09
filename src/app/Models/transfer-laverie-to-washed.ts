export class TransferLaverieToWashed {
  id: number;
  dateCreation: Date;
  quantityTransfer: number;
  washedReference:string;

  constructor(_id: number=0, _dateCreation: Date=new Date(), _quantityTransfer: number=0, _washedReference: string="") {
    this.id = _id;
    this.dateCreation = _dateCreation;
    this.quantityTransfer = _quantityTransfer;
    this.washedReference = _washedReference;
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

  public get _quantityTransfer(): number {
    return this.quantityTransfer;
  }

  public set _quantityTransfer(value: number) {
    this.quantityTransfer = value;
  }

  public get _washedReference(): string {
    return this.washedReference;
  }

  public set _washedReference(value: string) {
    this.washedReference = value;
  }
}
