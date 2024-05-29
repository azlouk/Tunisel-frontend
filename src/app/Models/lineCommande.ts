import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";


export interface LineCommande {
  id?: number;
  quantityRecolte?: number;
  quantityProduction?: number;
  quantityPluieBengarden?: number;
  quantityPluieZarzis?: number;
  quantiteTransfert?: number;
  decisionTransfert?:string;
  numeroLot?: number;
  poidsLot?: number;
  emplassementLot?:string;
  lieuxPrelevement?: string ;
  matCamiont?: string ;
  conformite?: string ;
  analyseChimique:AnalysesChimique| null;
  analysePhysique:AnalysesPhysique | null;
  dateCreation?:Date;
}
