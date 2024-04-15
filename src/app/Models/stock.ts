export class Stock {
  private _id: number;
  private _reference: string;
  private _description: string;
  private _dateStock: string;
  private _emplacement: string;
  private _etat: string;
  private _quantite: number;


  constructor(id?: number, reference?: string, description?: string, dateStock?: string, emplacement?: string, etat?: string, quantite?: number) {
    this._id = id||0;
    this._reference = reference||'';
    this._description = description||'';
    this._dateStock = dateStock||'';
    this._emplacement = emplacement||'';
    this._etat = etat||'';
    this._quantite = quantite||0;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get reference(): string {
    return this._reference;
  }

  set reference(value: string) {
    this._reference = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get dateStock(): string {
    return this._dateStock;
  }

  set dateStock(value: string) {
    this._dateStock = value;
  }

  get emplacement(): string {
    return this._emplacement;
  }

  set emplacement(value: string) {
    this._emplacement = value;
  }

  get etat(): string {
    return this._etat;
  }

  set etat(value: string) {
    this._etat = value;
  }

  get quantite(): number {
    return this._quantite;
  }

  set quantite(value: number) {
    this._quantite = value;
  }
}
