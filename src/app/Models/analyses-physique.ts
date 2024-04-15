import {Analyse} from "./analyse";

export class AnalysesPhysique extends Analyse{

  private _bande: number;
  private _conformite: string;



  constructor(id: number, reference: string, dateAnalyse: string, temperature: number, vent: number, bande?: number, conformite?: string) {
    super(id, reference, dateAnalyse, temperature, vent);
    this._bande = bande||0;
    this._conformite = conformite||'';

  }


  get bande(): number {
    return this._bande;
  }

  set bande(value: number) {
    this._bande = value;
  }

  get conformite(): string {
    return this._conformite;
  }

  set conformite(value: string) {
    this._conformite = value;
  }
}
