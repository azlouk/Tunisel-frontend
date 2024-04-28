import {Article} from "./article";
import {ProduitDefectueux} from "./produitDefectueux";

export interface Produit {
  id?: number;
  nom?: string;
  quantite?: number;
  designation?: string;
  reference?: string;
  article?: Article;
  //produitDefectueux?: ProduitDefectueux;
}
