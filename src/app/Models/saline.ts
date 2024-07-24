

export class Saline {
 id: number;
 dateCreation: Date;
 volumeSaline: number;


  constructor(_id: number=0, _dateCreation: Date=new Date(), _volumeSaline: number=0) {
    this.id = _id  ;
    this.dateCreation = _dateCreation;
    this.volumeSaline = _volumeSaline;
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

  public get _volumeSaline(): number {
    return this.volumeSaline;
  }

  public set _volumeSaline(value: number) {
    this.volumeSaline = value;
  }


}
