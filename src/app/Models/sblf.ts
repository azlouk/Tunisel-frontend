import {StockType} from "../Enum/stock-type";

import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";
import {Sbl} from "./sbl";


export interface Sblf {

  id?: number;reference?: string;
  description?: string;
  dateStock?: Date;
  emplacement?: string;
  etat?: string;
  quantite?: number;
  stockType?:StockType ;
  sblfSbl?:Sbl;
  analysesChimiques?: AnalysesChimique[];
  analysesPhysiques?: AnalysesPhysique[];
}
