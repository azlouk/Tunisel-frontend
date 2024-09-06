import {StockType} from "../Enum/stock-type";
import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";
import {Bande} from "./bande";
import {Crible} from "./crible";
import {Concasseur} from "./concasseur";
import {StockOrder} from "./stock-order";

export interface Sbl {

  id?: number;
  reference?: string;
  description?: string;
  dateStock?: Date;
  emplacement?: string;
  etat?: string;
  quantite?: number;
  stockType?:StockType ;
  analysesChimiques?: AnalysesChimique[];
  analysesPhysiques?: AnalysesPhysique[];
  bandeList?: Bande[];
  cribleList?: Crible[];
  concasseurList?: Concasseur[];
  calibre?: number ;
  stockOrderList?:StockOrder[];
}
