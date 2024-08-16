export class Production {
   calibre: number;
   value: number;
   pondeName: string;


  constructor(_calibre: number=0, _value: number=0, _pondeName: string="") {
    this.calibre = _calibre;
    this.value = _value;
    this.pondeName = _pondeName;
  }

  public get _calibre(): number {
    return this.calibre;
  }

  public set _calibre(value: number) {
    this.calibre = value;
  }

  public get _value(): number {
    return this.value;
  }

  public set _value(value: number) {
    this.value = value;
  }

  public get _pondeName(): string {
    return this.pondeName;
  }

  public set _pondeName(value: string) {
    this.pondeName = value;
  }
}
