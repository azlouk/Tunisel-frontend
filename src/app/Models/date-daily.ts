import {DataDaily} from "./data-daily";

export class DateDaily {
 date: Date;
 dataDaily: DataDaily;
  observationsHarvest: String;
  observationsProduction: String;
  observationsTransfer: String;


  constructor(_date: Date=new Date(), _dataDaily: DataDaily=new DataDaily(), _observationsHarvest: String="", _observationsProduction: String="", _observationsTransfer: String="") {
    this.date = _date;
    this.dataDaily = _dataDaily;
    this.observationsHarvest = _observationsHarvest;
    this.observationsProduction = _observationsProduction;
    this.observationsTransfer = _observationsTransfer;
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


  public get _observationsHarvest(): String {
    return this.observationsHarvest;
  }

  public set _observationsHarvest(value: String) {
    this.observationsHarvest = value;
  }

  public get _observationsProduction(): String {
    return this.observationsProduction;
  }

  public set _observationsProduction(value: String) {
    this.observationsProduction = value;
  }

  public get _observationsTransfer(): String {
    return this.observationsTransfer;
  }

  public set _observationsTransfer(value: String) {
    this.observationsTransfer = value;
  }
}
