import {AnalysesChimique} from "./analyses-chimique";
import {AnalysesPhysique} from "./analyses-physique";
import {Sbnl} from "./sbnl";

export class Bassin {
  private _id: number;
  private _reference: string;
  private _description: string;
  private _dateCreation: string;
  private _nom: string;
  private _emplacement: string;
  private _etat: string;
  private _surface: number;
  private _sbnls: Sbnl[];
  private _analysesChimiques: AnalysesChimique[];
  private _analysesPhysiques: AnalysesPhysique[];


  constructor(id?: number, reference?: string, description?: string, dateCreation?: string, nom?: string, emplacement?: string, etat?: string, surface?: number, sbnls?: Sbnl[], analysesChimiques?: AnalysesChimique[], analysesPhysiques?: AnalysesPhysique[]) {
    this._id = id||0;
    this._reference = reference||'';
    this._description = description||'';
    this._dateCreation = dateCreation||'';
    this._nom = nom||'';
    this._emplacement = emplacement||'';
    this._etat = etat||'';
    this._surface = surface||0;
    this._sbnls = sbnls||[];
    this._analysesChimiques = analysesChimiques||[];
    this._analysesPhysiques = analysesPhysiques||[];
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

  get dateCreation(): string {
    return this._dateCreation;
  }

  set dateCreation(value: string) {
    this._dateCreation = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
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

  get surface(): number {
    return this._surface;
  }

  set surface(value: number) {
    this._surface = value;
  }

  get sbnls(): Sbnl[] {
    return this._sbnls;
  }

  set sbnls(value: Sbnl[]) {
    this._sbnls = value;
  }

  get analysesChimiques(): AnalysesChimique[] {
    return this._analysesChimiques;
  }

  set analysesChimiques(value: AnalysesChimique[]) {
    this._analysesChimiques = value;
  }

  get analysesPhysiques(): AnalysesPhysique[] {
    return this._analysesPhysiques;
  }

  set analysesPhysiques(value: AnalysesPhysique[]) {
    this._analysesPhysiques = value;
  }
}
