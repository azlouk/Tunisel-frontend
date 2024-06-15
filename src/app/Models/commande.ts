import {LineCommande} from "./lineCommande";
import {Bassin} from "./bassin";
import {Bande} from "./bande";
import {Sblf} from "./sblf";
import {Sbl} from "./sbl";
import {Sbnl} from "./sbnl";
import {Column} from "../Components/ajouter-commande/ajouter-commande.component";
import {StockOrder} from "./stock-order";



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
  calibre?:string

  datestart?:Date;
  dateend?:Date;
  quality?:string;
  laycan?:string;
  purchaseOrder?:string;
  volume?:number;
  customer?:string;
  dateCustomer?:Date;
   cumPass?:string;
   h2o?:string;
   mg?:string;
   so4?:string;
   nacl?:string;
   mi?:string;
   fecn6?:string;
  stockOrder?:StockOrder;
}

