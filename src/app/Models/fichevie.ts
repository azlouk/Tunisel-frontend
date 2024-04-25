import {Intervention} from "./intervention";
import {EtatFiche} from "../Enum/etat-fiche";
import {Emplacement} from "../Enum/emplacement";

export interface FicheVie {
  id?: number;
  societe?: string;
  designation?: string;
  code?: string;
  serie?: string;
  marque?: string;
  etalonnage?: string;
  verification?: string;

  dateReception?: Date;
  etatFiche?: EtatFiche;
  emplacement?: Emplacement;
  interventions?: Intervention[];
}
