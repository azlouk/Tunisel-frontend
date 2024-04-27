import {Article} from "./article";

export interface ProduitDefectueux {
  id?: number;
  nom?: string;
  quantite?: number;
  designation?: string;
  reference?: string;
  article?: Article;
  produitDefectueux?: ProduitDefectueux;
  description?: string;
  dateDeffectation?: Date;
}
