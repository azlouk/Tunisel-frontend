import {Stock} from "./stock";
import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";
import {StockType} from "../Enum/stock-type";

export class Sblf extends Stock{
  private _analysesChimiques: AnalysesChimique[];
  private _analysesPhysiques: AnalysesPhysique[];
  constructor(id: number, reference: string, description: string, dateStock: Date, emplacement: string, etat: string, quantite: number,  stockType:StockType, analysesChimiques?: AnalysesChimique[], analysesPhysiques?: AnalysesPhysique[]) {
    super(id, reference, description, dateStock, emplacement, etat, quantite,stockType);


    this._analysesChimiques = analysesChimiques||[];
    this._analysesPhysiques = analysesPhysiques||[];
  }

  get analysesChimiques(): AnalysesChimique[] {
    return this._analysesChimiques;
  }

  set analysesChimiques(value: AnalysesChimique[]) {
    this._analysesChimiques = value;
  }

  get analysesPhysiques(): AnalysesPhysique[] {
    return this._analysesPhysiques;
  }

  set analysesPhysiques(value: AnalysesPhysique[]) {
    this._analysesPhysiques = value;
  }
}
