import {Analyse} from "./analyse";

export class AnalysesChimique extends Analyse{


  private _h2o: number;
  private _ca: number;
  private _mg: number;
  private _so4: number;
  private _nacl: number;
  private _k: number;
  private _cl: number;
  private _na: number;
  private _mi: number;

  constructor(id: number, reference: string, dateAnalyse: string, temperature: number, vent: number, h2o?: number, ca?: number, mg?: number, so4?: number, nacl?: number, k?: number, cl?: number, na?: number, mi?: number) {
    super(id, reference, dateAnalyse, temperature, vent);
    this._h2o = h2o||0;
    this._ca = ca||0;
    this._mg = mg||0;
    this._so4 = so4||0;
    this._nacl = nacl||0;
    this._k = k||0;
    this._cl = cl||0;
    this._na = na||0;
    this._mi = mi||0;
  }


  get h2o(): number {
    return this._h2o;
  }

  set h2o(value: number) {
    this._h2o = value;
  }

  get ca(): number {
    return this._ca;
  }

  set ca(value: number) {
    this._ca = value;
  }

  get mg(): number {
    return this._mg;
  }

  set mg(value: number) {
    this._mg = value;
  }

  get so4(): number {
    return this._so4;
  }

  set so4(value: number) {
    this._so4 = value;
  }

  get nacl(): number {
    return this._nacl;
  }

  set nacl(value: number) {
    this._nacl = value;
  }

  get k(): number {
    return this._k;
  }

  set k(value: number) {
    this._k = value;
  }

  get cl(): number {
    return this._cl;
  }

  set cl(value: number) {
    this._cl = value;
  }

  get na(): number {
    return this._na;
  }

  set na(value: number) {
    this._na = value;
  }

  get mi(): number {
    return this._mi;
  }

  set mi(value: number) {
    this._mi = value;
  }
}
