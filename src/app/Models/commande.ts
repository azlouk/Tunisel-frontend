import {LineCommande} from "./lineCommande";


export interface Commande {
  id?: number;
  nom?: string;
  etat?: string;
  dateCommande?: Date;
  ligneCommandes?:LineCommande[];
}
