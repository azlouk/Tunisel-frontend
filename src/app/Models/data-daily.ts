import {Harvest} from "./harvest";
import {Production} from "./production";
import {Transfer} from "./transfer";

export class DataDaily {

   harvestList: Harvest[];
   productionList: Production[];
   transferList: Transfer[];

  constructor(_harvestList: Harvest[]=[], _productionList: Production[]=[], _transferList: Transfer[]=[]) {
    this.harvestList = _harvestList;
    this.productionList = _productionList;
    this.transferList = _transferList;
  }

  public get _harvestList(): Harvest[] {
    return this.harvestList;
  }

  public set _harvestList(value: Harvest[]) {
    this.harvestList = value;
  }

  public get _productionList(): Production[] {
    return this.productionList;
  }

  public set _productionList(value: Production[]) {
    this.productionList = value;
  }

  public get _transferList(): Transfer[] {
    return this.transferList;
  }

  public set _transferList(value: Transfer[]) {
    this.transferList = value;
  }
}
