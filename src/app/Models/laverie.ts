import {Sbnl} from "./sbnl";
import {TransferLaverieToCribleLiwell} from "./transfer-laverie-to-crible-liwell";
import {TransferLaverieToCrible} from "./transfer-laverie-to-crible";
import {TransferLaverieToWashed} from "./transfer-laverie-to-washed";

export class Laverie {
   id: number ;
   nom: string;
   reference: string;
   description: string;
   etat: string;
   sbnlList:Sbnl[];
   transferLaverieToCribleLiwells:TransferLaverieToCribleLiwell[];
   transferLaverieToCriblesVert:TransferLaverieToCrible[];
  transferLaverieToWasheds:TransferLaverieToWashed[];


  constructor(_id: number=0, _nom: string="", _reference: string="", _description: string="", _etat: string="", _sbnlList: Sbnl[]=[], _transferLaverieToCribleLiwells: TransferLaverieToCribleLiwell[]=[], _transferLaverieToCriblesVert: TransferLaverieToCrible[]=[], _transferLaverieToWasheds: TransferLaverieToWashed[]=[]) {
    this.id = _id;
    this.nom = _nom;
    this.reference = _reference;
    this.description = _description;
    this.etat = _etat;
    this.sbnlList = _sbnlList;
    this.transferLaverieToCribleLiwells = _transferLaverieToCribleLiwells;
    this.transferLaverieToCriblesVert = _transferLaverieToCriblesVert;
    this.transferLaverieToWasheds = _transferLaverieToWasheds;
  }

  public get _transferLaverieToCriblesVert(): TransferLaverieToCrible[] {
    return this.transferLaverieToCriblesVert;
  }

  public set _transferLaverieToCriblesVert(value: TransferLaverieToCrible[]) {
    this.transferLaverieToCriblesVert = value;
  }

  public get _transferLaverieToCribleLiwells(): TransferLaverieToCribleLiwell[] {
    return this.transferLaverieToCribleLiwells;
  }

  public set _transferLaverieToCribleLiwells(value: TransferLaverieToCribleLiwell[]) {
    this.transferLaverieToCribleLiwells = value;
  }

  public get _id(): number {
    return this.id;
  }

  public set _id(value: number) {
    this.id = value;
  }

  public get _nom(): string {
    return this.nom;
  }

  public set _nom(value: string) {
    this.nom = value;
  }

  public get _reference(): string {
    return this.reference;
  }

  public set _reference(value: string) {
    this.reference = value;
  }

  public get _description(): string {
    return this.description;
  }

  public set _description(value: string) {
    this.description = value;
  }

  public get _etat(): string {
    return this.etat;
  }

  public set _etat(value: string) {
    this.etat = value;
  }

  public get _sbnlList(): Sbnl[] {
    return this.sbnlList;
  }

  public set _sbnlList(value: Sbnl[]) {
    this.sbnlList = value;
  }
}
