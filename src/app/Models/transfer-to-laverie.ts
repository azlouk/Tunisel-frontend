
export class TransferToLaverie {
  id: number;
  dateCreation: Date;
  quantityTransfer: number;
 referenceLaverie:string;


  constructor(_id: number=0, _dateCreation: Date=new Date(), _quantityTransfer: number=0, _referenceLaverie: string="") {
    this.id = _id;
    this.dateCreation = _dateCreation;
    this.quantityTransfer = _quantityTransfer;
    this.referenceLaverie = _referenceLaverie;
  }

  public get _referenceLaverie(): string {
    return this.referenceLaverie;
  }

  public set _referenceLaverie(value: string) {
    this.referenceLaverie = value;
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

}
