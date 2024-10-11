import {StockType} from "../Enum/stock-type";
import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";
import {Bassin} from "./bassin";
import {TransferToCribleLiwell} from "./TransferToCribleLiwell";
import {TransferToCrible} from "./transfer-to-crible";
import {TransferToLaverie} from "./transfer-to-laverie";

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
  transferToCribleLiwellList?:TransferToCribleLiwell[];
  transferToCribleVertList?:TransferToCrible[];
  transferToLaverieList?:TransferToLaverie[];
  dateDebutHarvest?:Date;
  dateFinHarvest?:Date;
}
