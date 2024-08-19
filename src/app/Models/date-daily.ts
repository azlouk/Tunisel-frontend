import {DataDaily} from "./data-daily";

export class DateDaily {
 date: Date;
 dataDaily: DataDaily;
  private observations: String;


  constructor(_date: Date=new Date(), _dataDaily: DataDaily=new DataDaily(), _observations: String="") {
    this.date = _date;
    this.dataDaily = _dataDaily;
    this.observations = _observations;
  }

  public get _observations(): String {
    return this.observations;
  }

  public set _observations(value: String) {
    this.observations = value;
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
