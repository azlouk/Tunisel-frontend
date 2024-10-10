import {StockType} from "../Enum/stock-type";
import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";
import {CribleLiwell} from "./cribleLiwell";
import {Crible} from "./crible";
import {Concasseur} from "./concasseur";
import {StockOrder} from "./stock-order";
import {Laverie} from "./laverie";

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
  cribleLiwellList?: CribleLiwell[];
  cribleList?: Crible[];
  concasseurList?: Concasseur[];
  calibre?: number ;
  stockOrderList?:StockOrder[];
  laverieList?:Laverie[];
}
