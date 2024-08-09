import {StockType} from "../Enum/stock-type";
import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";
import {Sbl} from "./sbl";
import {Bassin} from "./bassin";
import {TransferToBand} from "./transfer-to-band";

export interface Sbnl {

  id?: number;
  reference?: string;
  description?: string;
  dateStock?: Date;
  emplacement?: string;
  etat?: string;
  quantite?: number;
  stockType?:StockType ;
  // sbnlBassin?: Bassin;
  analysesChimiques?: AnalysesChimique[];
  analysesPhysiques?: AnalysesPhysique[];
  bassinList?:Bassin[];
  transferToBands?:TransferToBand[];
}
