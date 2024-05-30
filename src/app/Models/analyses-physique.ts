import {Tamis} from "./tamis";

export interface AnalysesPhysique  {
  matiere?: string;
  id?: number;
  reference?: string;
  dateAnalyse?: Date;
  temperature?: number;
  vent?: number;
  description?: string;
  conformite?:string;
  qualite?:string ;
  tamisList?:Tamis[];
  ref?:string ;
  pluie?:string ;
}
