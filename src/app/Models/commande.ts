import {LineCommande} from "./lineCommande";
import {Bassin} from "./bassin";


export interface Commande {
  id?: number;
  nom?: string;
  etat?: string;
  dateCommande?: Date;
  ligneCommandes?:LineCommande[];
  bassins?:Bassin[];
}
