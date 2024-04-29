import {Tamis} from "./tamis";

export interface AnalysesPhysique  {
  id?: number;
  reference?: string;
  dateAnalyse?: Date;
  temperature?: number;
  vent?: number;
  bande?:number;
  conformite?:string;
  tamisList?:Tamis[];
}
