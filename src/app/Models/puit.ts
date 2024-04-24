import {Bassin} from "./bassin";
import {AnalysesChimique} from "./analyses-chimique";
export interface Puit{
  id?: number;
  reference?: string;
  description?: string;
  dateCreation?: Date;
  nom?: string;
  emplacement?: string;
  etat?: string;
  dateFermeture?: Date;
  bassins?: Bassin[];
  analysesChimiques?: AnalysesChimique[];

}
