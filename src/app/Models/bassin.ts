import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";
import {Sbnl} from "./sbnl";
import {Puit} from "./puit";
import {Recolte} from "./recolte";
import {Sondage} from "./sondage";

export interface Bassin {
  id?: number;
  reference?: string;
  description?: string;
  dateCreation?: string;
  nom?: string;
  emplacement?: string;
  etat?: string;
  surface?: number;
  // sbnls?: Sbnl[];
  analysesChimiques?: AnalysesChimique[];
  analysesPhysiques?: AnalysesPhysique[];
  bassinPuit?:Puit;
  recolteList?: Recolte[];
  sondageList?: Sondage[];
}
