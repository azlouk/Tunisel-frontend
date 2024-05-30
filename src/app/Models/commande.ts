import {LineCommande} from "./lineCommande";
import {Bassin} from "./bassin";
import {Bande} from "./bande";
import {Sblf} from "./sblf";
import {Sbl} from "./sbl";
import {Sbnl} from "./sbnl";
import {Column} from "../Components/ajouter-commande/ajouter-commande.component";



export interface Commande {
  id?: number;
  nom?: string;
  etat?: string;
  dateCommande?: Date;
  ligneCommandes?:LineCommande[];
  bassins?:Bassin[];
  sbnls?:Sbnl[];
  sbls?:Sbl[];
  sblfs?:Sblf[];
  bandes?:Bande[];
  dataHeaders?:Column[];
}

