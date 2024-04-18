import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";
import {Stock} from "./stock";
import {Sbl} from "./sbl";
import {StockType} from "../Enum/stock-type";

export class Sbnl extends Stock{


  private _sbls: Sbl[];
  private _analysesChimiques: AnalysesChimique[];
  private _analysesPhysiques: AnalysesPhysique[];

  constructor(
    id: number,
  reference: string,
  description: string,
  dateStock: Date,
  emplacement: string,
  etat: string,
  quantite: number, stockType:StockType,sbls?: Sbl[], analysesChimiques?: AnalysesChimique[], analysesPhysiques?: AnalysesPhysique[]) {
    super(id, reference, description, dateStock, emplacement, etat, quantite,stockType);

    this._sbls = sbls||[];
    this._analysesChimiques = analysesChimiques||[];
    this._analysesPhysiques = analysesPhysiques||[];
  }


  get sbls(): Sbl[] {
    return this._sbls;
  }

  set sbls(value: Sbl[]) {
    this._sbls = value;
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
