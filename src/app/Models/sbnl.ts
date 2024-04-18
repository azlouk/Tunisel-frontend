import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";

import {Sbl} from "./sbl";
import {StockType} from "../Enum/stock-type";

export interface Sbnl {

   id?: number;reference?: string;
  description?: string;
  dateStock?: Date;
  emplacement?: string;
  etat?: string;
  quantite?: number;
  stockType?:StockType ;
  sbls?: Sbl[];
analysesChimiques?: AnalysesChimique[];
analysesPhysiques?: AnalysesPhysique[];
}
// export class Sbnl extends Stock{
//
//
//   private sbls: Sbl[];
//   private analysesChimiques: AnalysesChimique[];
//   private analysesPhysiques: AnalysesPhysique[];
//
//   constructor(
//     id?: number,
//     reference?: string,
//     description?: string,
//     dateStock?: Date,
//     emplacement?: string,
//     etat?: string,
//     quantite?: number,
//     stockType?:StockType.SBNL,
//     sbls?: Sbl[],
//     analysesChimiques?: AnalysesChimique[],
//     analysesPhysiques?: AnalysesPhysique[])
//   {
//     super(id, reference, description, dateStock, emplacement, etat, quantite,stockType);
//
//     this.sbls = sbls||[];
//     this.analysesChimiques = analysesChimiques||[];
//     this.analysesPhysiques = analysesPhysiques||[];
//   }
//
//
//    getsbls(): Sbl[] {
//     return this.sbls;
//   }
//
//    setsbls(value: Sbl[]) {
//     this.sbls = value;
//   }
//
//   getanalysesChimiques(): AnalysesChimique[] {
//     return this.analysesChimiques;
//   }
//
//   setanalysesChimiques(value: AnalysesChimique[]) {
//     this.analysesChimiques = value;
//   }
//
//   getanalysesPhysiques(): AnalysesPhysique[] {
//     return this.analysesPhysiques;
//   }
//
//   setanalysesPhysiques(value: AnalysesPhysique[]) {
//     this.analysesPhysiques = value;
//   }
// }
