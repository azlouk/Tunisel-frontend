import {CribleLiwell} from "./cribleLiwell";

export class TransferToCribleLiwell {

    id: number;
    dateCreation: Date;
    quantityTransfer: number;
   referenceCribleLiwell:string;


  constructor(_id: number=0, _dateCreation: Date=new Date(), _quantityTransfer: number=0, _referenceCribleLiwell: string='') {
    this.id = _id;
    this.dateCreation = _dateCreation;
    this.quantityTransfer = _quantityTransfer;
    this.referenceCribleLiwell = _referenceCribleLiwell;
  }

  public get _referenceCribleLiwell(): string {
    return this.referenceCribleLiwell;
  }

  public set _referenceCribleLiwell(value: string) {
    this.referenceCribleLiwell = value;
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
