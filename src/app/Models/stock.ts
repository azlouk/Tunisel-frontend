import { StockType } from "../Enum/stock-type";

interface Stock {
  id: number;
  reference: string;
  description: string;
  dateStock: string;
  emplacement: string;
  etat: string;
  quantite: number;
  stockType?: StockType;
}

export default Stock;
