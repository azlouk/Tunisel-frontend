export class Recolte {

  id: number;
  dateCreation: Date;
  value: number;
  observation:string;
  temperature:  string;
  rainQuantityBengardene:string;


  constructor(_id: number=0, _dateCreation: Date=new Date(), _value: number=0, _observation: string="", _temperature: string="", _rainQuantityBengardene: string="") {
    this.id = _id;
    this.dateCreation = _dateCreation;
    this.value = _value;
    this.observation = _observation;
    this.temperature = _temperature;
    this.rainQuantityBengardene = _rainQuantityBengardene;
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

  public get _value(): number {
    return this.value;
  }

  public set _value(value: number) {
    this.value = value;
  }
}
