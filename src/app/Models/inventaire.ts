import {User} from "./user";
import {ProduitDefectueux} from "./produitDefectueux";
import {InventaireProduitAssociation} from "./InventaireProduitAssociation";

class Article {
}

export interface Inventaire {
  id?: number;
  reference?: string;
  dateInventaire?: Date;
  InventaireProduitAssociation?:InventaireProduitAssociation[];

}
