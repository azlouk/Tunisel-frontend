import {TypePompe} from "../Enum/TypePompe";

export class Pompe {
   id: number;
   typePompe: TypePompe;
   model: string;
   dimension: number;
   poids: number;
   puissance: number;

  constructor(_id: number=0, _typePompe: TypePompe=TypePompe.SOLAR, _model: string="", _dimension: number=0, _poids: number=0, _puissance: number=0) {
    this.id = _id;
    this.typePompe = _typePompe;
    this.model = _model;
    this.dimension = _dimension;
    this.poids = _poids;
    this.puissance = _puissance;
  }

  public get _id(): number {
    return this.id;
  }

  public set _id(value: number) {
    this.id = value;
  }

  public get _typePompe(): TypePompe {
    return this.typePompe;
  }

  public set _typePompe(value: TypePompe) {
    this.typePompe = value;
  }

  public get _model(): string {
    return this.model;
  }

  public set _model(value: string) {
    this.model = value;
  }

  public get _dimension(): number {
    return this.dimension;
  }

  public set _dimension(value: number) {
    this.dimension = value;
  }

  public get _poids(): number {
    return this.poids;
  }

  public set _poids(value: number) {
    this.poids = value;
  }

  public get _puissance(): number {
    return this.puissance;
  }

  public set _puissance(value: number) {
    this.puissance = value;
  }
}
