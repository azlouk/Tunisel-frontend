export class Harvest {
  t: number;
  pondeName: string;

  constructor(_t: number=0, _pondeName: string="") {
    this.t = _t;
    this.pondeName = _pondeName;
  }

  public get _t(): number {
    return this.t;
  }

  public set _t(value: number) {
    this.t = value;
  }

  public get _pondeName(): string {
    return this.pondeName;
  }

  public set _pondeName(value: string) {
    this.pondeName = value;
  }
}
