import {Article} from "./article";
import {Produit} from "./produit";

export interface ProduitDefectueux{
  id?: number;
  nom?:string;
  idProduit?: number;
  idInventaire?: number;
  quantiteDefectueux?: number;
  description?: string;
  dateDeffectuation?: Date;
}
