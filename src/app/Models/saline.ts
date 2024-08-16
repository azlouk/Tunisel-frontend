

export class Saline {

 id: number;
 dateCreation: Date;
 volumeSaline: number;
 observation:string;
 temperature:  string;
 rainQuantityBengardene:string;
 nomBassin:string | undefined;


  constructor(_id: number=0, _dateCreation: Date=new Date(), _volumeSaline: number=0, _observation: string="", _temperature: string="", _rainQuantityBengardene: string="", _nomBassin: string="") {
    this.id = _id;
    this.dateCreation = _dateCreation;
    this.volumeSaline = _volumeSaline;
    this.observation = _observation;
    this.temperature = _temperature;
    this.rainQuantityBengardene = _rainQuantityBengardene;
    this.nomBassin = _nomBassin;
  }

  public get _id(): number {
    return this.id;
  }

  public get _nomBassin(): string {
    return <string>this.nomBassin;
  }

  public set _nomBassin(value: string) {
    this.nomBassin = value;
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
  public get _observation(): string {
    return this.observation;
  }

  public set _observation(value: string) {
    this.observation = value;
  }

  public get _temperature(): string {
    return this.temperature;
  }

  public set _temperature(value: string) {
    this.temperature = value;
  }

  public get _rainQuantityBengardene(): string {
    return this.rainQuantityBengardene;
  }

  public set _rainQuantityBengardene(value: string) {
    this.rainQuantityBengardene = value;
  }

}
