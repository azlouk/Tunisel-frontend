import {From} from "./From";
import {To} from "./To";
import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";

export class Band {
   id: number ;
   from: From;
   to: To;
   analysesChimiques: AnalysesChimique[];
   analysesPhysiques: AnalysesPhysique[];
   description: string;
   reference: string;
   dateCreation:Date;


  constructor(_id: number=0, _from: From=new From(), _to: To=new To(), _analysesChimiques: AnalysesChimique[]=[], _analysesPhysiques: AnalysesPhysique[]=[], _description: string="", _reference: string="", _dateCreation: Date=new Date()) {
    this.id = _id;
    this.from = _from;
    this.to = _to;
    this.analysesChimiques = _analysesChimiques;
    this.analysesPhysiques = _analysesPhysiques;
    this.description = _description;
    this.reference = _reference;
    this.dateCreation = _dateCreation;
  }

  public get _id(): number {
    return this.id;
  }

  public set _id(value: number) {
    this.id = value;
  }

  public get _from(): From {
    return this.from;
  }

  public set _from(value: From) {
    this.from = value;
  }

  public get _to(): To {
    return this.to;
  }

  public set _to(value: To) {
    this.to = value;
  }

  public get _analysesChimiques(): AnalysesChimique[] {
    return this.analysesChimiques;
  }

  public set _analysesChimiques(value: AnalysesChimique[]) {
    this.analysesChimiques = value;
  }

  public get _analysesPhysiques(): AnalysesPhysique[] {
    return this.analysesPhysiques;
  }

  public set _analysesPhysiques(value: AnalysesPhysique[]) {
    this.analysesPhysiques = value;
  }

  public get _description(): string {
    return this.description;
  }

  public set _description(value: string) {
    this.description = value;
  }

  public get _reference(): string {
    return this.reference;
  }

  public set _reference(value: string) {
    this.reference = value;
  }

  public get _dateCreation(): Date {
    return this.dateCreation;
  }

  public set _dateCreation(value: Date) {
    this.dateCreation = value;
  }
}
