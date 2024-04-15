import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";
import {Stock} from "./stock";
import {Sblf} from "./sblf";

export class Sbl extends Stock{


  private _sblfs: Sblf[];
  private _analysesChimiques: AnalysesChimique[];
  private _analysesPhysiques: AnalysesPhysique[];
  constructor(id: number, reference: string, description: string, dateStock: string, emplacement: string, etat: string, quantite: number, sblfs?: Sblf[], analysesChimiques?: AnalysesChimique[], analysesPhysiques?: AnalysesPhysique[]) {
    super(id, reference, description, dateStock, emplacement, etat, quantite);

    this._sblfs = sblfs||[];
    this._analysesChimiques = analysesChimiques||[];
    this._analysesPhysiques = analysesPhysiques||[];
  }

  get sblfs(): Sblf[] {
    return this._sblfs;
  }

  set sblfs(value: Sblf[]) {
    this._sblfs = value;
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
