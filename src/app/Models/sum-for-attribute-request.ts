export class SumForAttributeRequest {
  id: number ;

  startDate: Date;

  endDate: Date;

  attributeName: string;

  constructor(_id: number=0, _startDate: Date=new Date(), _endDate: Date=new Date(), _attributeName: string="") {
    this.id = _id;
    this.startDate = _startDate;
    this.endDate = _endDate;
    this.attributeName = _attributeName;
  }
}
