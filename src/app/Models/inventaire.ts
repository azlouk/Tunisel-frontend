import {InventaireProduitAssociation} from "./InventaireProduitAssociation";

class Article {
}

export interface Inventaire {
  id?: number;
  reference?: string;
  dateInventaire?: Date;
  inventaireProduitAssociations?:InventaireProduitAssociation[];

}
