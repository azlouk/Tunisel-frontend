import {User} from "./user";
import {ProduitDefectueux} from "./produitDefectueux";

class Article {
}

export interface Inventaire {
  id?: number;
  reference?: string;
  dateInventaire?: Date;
  users?: User[];
  articles?: Article[];
  produitDefectueuxes?: ProduitDefectueux[];
}
