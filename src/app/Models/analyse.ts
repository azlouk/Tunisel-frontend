export class Analyse {

  private _id: number;
  private _reference: string;
  private _dateAnalyse: string;
  private _temperature: number;
  private _vent: number;

  constructor(id?: number, reference?: string, dateAnalyse?: string, temperature?: number, vent?: number) {
    this._id = id||0;
    this._reference = reference||'';
    this._dateAnalyse = dateAnalyse||'';
    this._temperature = temperature||0;
    this._vent = vent||0;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get reference(): string {
    return this._reference;
  }

  set reference(value: string) {
    this._reference = value;
  }

  get dateAnalyse(): string {
    return this._dateAnalyse;
  }

  set dateAnalyse(value: string) {
    this._dateAnalyse = value;
  }

  get temperature(): number {
    return this._temperature;
  }

  set temperature(value: number) {
    this._temperature = value;
  }

  get vent(): number {
    return this._vent;
  }

  set vent(value: number) {
    this._vent = value;
  }
}
