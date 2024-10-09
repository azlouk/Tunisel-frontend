export class From {
   id: number  ;
   type: string;
   typeId: number  ;

  constructor(_id: number=0, _type: string="", _typeId: number=0) {
    this.id = _id;
    this.type = _type;
    this.typeId = _typeId;
  }

  public get _id(): number {
    return this.id;
  }

  public set _id(value: number) {
    this.id = value;
  }

  public get _type(): string {
    return this.type;
  }

  public set _type(value: string) {
    this.type = value;
  }

  public get _typeId(): number {
    return this.typeId;
  }

  public set _typeId(value: number) {
    this.typeId = value;
  }
}
