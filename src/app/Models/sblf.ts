import {StockType} from "../Enum/stock-type";

import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";


export interface Sblf {

  id?: number;reference?: string;
  description?: string;
  dateStock?: Date;
  emplacement?: string;
  etat?: string;
  quantite?: number;
  stockType?:StockType ;
  sblfSbl?:Sblf;
  analysesChimiques?: AnalysesChimique[];
  analysesPhysiques?: AnalysesPhysique[];
}
