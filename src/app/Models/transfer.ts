export class Transfer {


      calibre: number;
      masse: number;

  constructor(_calibre: number=0, _masse: number=0) {
    this.calibre = _calibre;
    this.masse = _masse;
  }

  public get _calibre(): number {
    return this.calibre;
  }

  public set _calibre(value: number) {
    this.calibre = value;
  }

  public get _masse(): number {
    return this.masse;
  }

  public set _masse(value: number) {
    this.masse = value;
  }
}
