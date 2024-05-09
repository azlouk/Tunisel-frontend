export class Dashboard {
  private _nbrBassin: number = 0;
  private _nbrPuit: number = 0;
  private _nbrProduit: number = 0;
  private _nbrArticle: number = 0;
  constructor(nbrBassin: number, nbrPuit: number,nbrArticle: number,nbrProduit: number) {
    this._nbrBassin = nbrBassin;
    this._nbrPuit = nbrPuit;
    this._nbrPuit = nbrProduit;
    this._nbrPuit = nbrArticle;

  }

  get nbrProduit(): number {
    return this._nbrProduit;
  }

  set nbrProduit(value: number) {
    this._nbrProduit = value;
  }

  get nbrArticle(): number {
    return this._nbrArticle;
  }

  set nbrArticle(value: number) {
    this._nbrArticle = value;
  }

  get nbrBassin(): number {
    return this._nbrBassin;
  }

  set nbrBassin(value: number) {
    this._nbrBassin = value;
  }

  get nbrPuit(): number {
    return this._nbrPuit;
  }

  set nbrPuit(value: number) {
    this._nbrPuit = value;
  }
}
