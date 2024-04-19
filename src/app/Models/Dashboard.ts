export class Dashboard {
  private _nbrBassin: number;
  private _nbrPuit: number;

  constructor(nbrBassin: number, nbrPuit: number) {
    this._nbrBassin = nbrBassin;
    this._nbrPuit = nbrPuit;
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
