import {Produit} from "./produit";

export interface InventaireProduitAssociation {
  id?: number;

  produit? : Produit;
  quantitePI?: number;
}
