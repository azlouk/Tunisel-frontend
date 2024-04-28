import {Article} from "./article";
import {Produit} from "./produit";

export interface ProduitDefectueux extends Produit {
  quantiteDef?: number;
 //produitDefectueux?: ProduitDefectueux;
  description?: string;
  dateDeffectation?: Date;
}
