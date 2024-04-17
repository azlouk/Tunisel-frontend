import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";
import {Sbnl} from "./sbnl";
import {Puit} from "./puit";

export interface Bassin {
  id?: number;
  reference?: string;
  description?: string;
  dateCreation?: string;
  nom?: string;
  emplacement?: string;
  etat?: string;
  surface?: number;
  sbnls?: Sbnl[];
  analysesChimiques?: AnalysesChimique[];
  analysesPhysiques?: AnalysesPhysique[];
  bassinPuit?:Puit;
}
