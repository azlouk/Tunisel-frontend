import {StockType} from "../Enum/stock-type";
import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";
import {Sbnl} from "./sbnl";
import {TraitementStock} from "./traitement-stock";

export interface Bande {
  id?: number;
  reference?: string;
  description?: string;
  dateStock?: Date;
  emplacement?: string;
  etat?: string;
  quantite?: number;
  stockType?:StockType ;
  // bandeSbnl?:Sbnl;
  // quantiteRefus?:number;
  analysesChimiques?: AnalysesChimique[];
  analysesPhysiques?: AnalysesPhysique[];
  traitementStocks?:TraitementStock[];
  sbnlList?:Sbnl[];
}
