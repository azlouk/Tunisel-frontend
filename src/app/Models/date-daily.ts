import {DataDaily} from "./data-daily";

export class DateDaily {
 date: Date;
 dataDaily: DataDaily;


  constructor(_date: Date=new Date(), _dataDaily: DataDaily=new DataDaily()) {
    this.date = _date;
    this.dataDaily = _dataDaily;
  }

  public get _date(): Date {
    return this.date;
  }

  public set _date(value: Date) {
    this.date = value;
  }

  public get _dataDaily(): DataDaily {
    return this.dataDaily;
  }

  public set _dataDaily(value: DataDaily) {
    this.dataDaily = value;
  }
}
