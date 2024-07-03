import {Component,  OnInit} from '@angular/core';
import {AutoFocusModule} from "primeng/autofocus";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {DatePipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {TooltipModule} from "primeng/tooltip";
import {Product} from "../../Models/product";
import {Bassin} from "../../Models/bassin";
import {BassinService} from "../../Services/bassin.service";
import Swal from "sweetalert2";
import {getToken} from "../../../main";
import {StockOrderService} from "../../Services/stock-order.service";
import {StockOrder} from "../../Models/stock-order";
import {MultiSelectModule} from "primeng/multiselect";
import {Saline} from "../../Models/saline";
import {RippleModule} from "primeng/ripple";
import {SalineService} from "../../Services/saline.service";

@Component({
  selector: 'app-stock-order',
  standalone: true,
  imports: [
    AutoFocusModule,
    ButtonModule,
    CheckboxModule,
    DatePipe,
    DialogModule,
    DropdownModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    ListboxModule,
    NgForOf,
    NgIf,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    NgClass,
    MultiSelectModule,
    RippleModule
  ],
  templateUrl: './stock-order.component.html',
  styleUrl: './stock-order.component.css'
})
export class StockOrderComponent implements OnInit{
  productDialog: boolean = false;
  TransferDialog: boolean = false;
  AddToSalineDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============
  bassins: Bassin[] = [];

  bassin: Bassin = {};
  selectedStockOrders: StockOrder[] = [];
  stockOrders: StockOrder[] = [];
  TransferAttributs:any[]=[]
  stockOrder: StockOrder = new StockOrder();
 saline: Saline=new Saline();

  private isUpdateStockOrder=false;

  loading:boolean=false ;


  constructor(  private messageService: MessageService,
                private bassinService :BassinService,
                private stockOrderService :StockOrderService,
                private salineService :SalineService) { }

  ngOnInit() {
    this.TransferAttributs= [
      {id:0,label:'Saline volume',attribut:'volumeSaline'},
      {id:1,label:'Terrain volume',attribut:'volumeTerrain'},
      {id:2,label:'Port volume',attribut:'volumePort'},
      {id:3,label:'Quai volume',attribut:'volumeQuai'},

    ]
    this.getAllBassin();
    this.getAllStockOrder();
  }

  openNew() {
    this.stockOrder = new StockOrder();

    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedBassins() {

    this.deleteProductsDialog = true;

  }

  editStockOrder(stockOrder: StockOrder) {
    this.isUpdateStockOrder=true;
    this.stockOrder = stockOrder ;

    this.productDialog = true;
  }

  deleteStockOrder(stockOrder: StockOrder) {
    this.deleteProductDialog = true;
    this.stockOrder =stockOrder;
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.selectedStockOrders.forEach(stockOrder => {

      this.stockOrderService.deleteStockOrder(stockOrder.id).subscribe(
        () => {
          this.stockOrders = this.stockOrders.filter(stock => stock.id !== stockOrder.id);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Stock Orders Deleted', life: 3000 });

        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Can not deleted",
            text: "Stock Order related with Pond !",
          })
          console.error( error);
        }
      );
    });

  }

  confirmDelete() {
    this.deleteProductDialog = false;

    this.stockOrderService.deleteStockOrder(this.stockOrder.id).subscribe(() => {
      this.stockOrders = this.stockOrders.filter(val => val.id !== this.stockOrder.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Stock Deleted', life: 3000 });

    },error => {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Can not deleted",
        text: "Stock Order related with Pond !",
      })
    });



  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }


  saveStockOrder() {
    this.submitted = false;
    this.productDialog=false

    if(this.isUpdateStockOrder==true) {



        this.stockOrderService.updateStockOrder(this.stockOrder).subscribe(() =>{ this.getAllStockOrder();});


      this.isUpdateStockOrder=false;
    }
    else
    {
      this.stockOrder.salines.push(this.saline)
      this.stockOrderService.addStockOrder(this.stockOrder).subscribe(() =>{
        this.getAllStockOrder();
      });

    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  getAllBassin() {
    this.loading=true ;
    this.bassinService.getAllBassinsDTO()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;
        this.loading=false ;

      }, error => {
        console.log( error);
      });
  }
  getAllStockOrder() {
    this.loading=true ;
    this.stockOrderService.getAllStockOrder()
      .subscribe((stockOrders: StockOrder[]) => {
        this.stockOrders = stockOrders;
        this.loading=false ;
      }, error => {
        console.log( error);
      });
  }

  protected readonly getToken = getToken;
 startingPoint: any;
 arrivingPoint: any;
 TransferQuantity: any;
 AddQuantityToSaline: any;


  calculTotalVolume(stockOrder:StockOrder):number {

  return this.getSumSalines(stockOrder)+stockOrder.volumeTerrain+stockOrder.volumePort+stockOrder.volumeQuai;

  }
  // ===================Sum=========================

  getSumSalines(stockOrder:StockOrder){

    return  stockOrder.salines.reduce((sum, saline) => sum+saline.volumeSaline,0)

  }
  // ===================Sum=========================
  public salines: any;
  public selectedSalines: any;
  transferStockOrder(stockOrder: StockOrder) {
      this.TransferDialog=true;
      this.stockOrder=stockOrder;
    this.isUpdateStockOrder=true;
  }
 AddToSalineStockOrder(stockOrder: StockOrder) {
    this.AddQuantityToSaline=0;
    this.AddToSalineDialog=true;
    this.stockOrder=stockOrder;
    this.isUpdateStockOrder=true;


  }
  getSalinesByStockOrder(){
    this.stockOrderService.getSalinesByStockOrder(this.stockOrder.id).subscribe(value => this.stockOrder.salines=value)
}
hideDialogTransfer() {
    this.TransferDialog=false;

  }hideDialogAddToSaline() {
    this.AddToSalineDialog=false;

  }



  saveTransferQuantity(): void {
    if (this.TransferQuantity && this.startingPoint && this.arrivingPoint) {



      if ( this.startingPoint.id === 0) {
        const departingVolume = 'volumeSaline';
        const arrivingVolume = this.arrivingPoint.attribut;

         this.stockOrder.salines.map((vsaline: Saline, index:number) => {
              if(vsaline.id==this.salineV.id){
                console.log(vsaline)
                    if (this.salineV.volumeSaline==this.TransferQuantity) {

                      (<any>this.stockOrder)[arrivingVolume] += this.TransferQuantity;
                      console.log((<any>this.stockOrder)[arrivingVolume] );

                      this.stockOrder.salines = this.stockOrder.salines.filter(v => v.id !== this.salineV.id)

                    }else if(this.salineV.volumeSaline>this.TransferQuantity) {
                      (<any>this.stockOrder)[arrivingVolume] += this.TransferQuantity;
                      console.log((<any>this.stockOrder)[arrivingVolume] );

                      vsaline.volumeSaline-=this.TransferQuantity ;
                    }
              }
         }) ;

        console.error(this.stockOrder.salines)
          this.saveStockOrder();

      }
      else if (this.startingPoint.id === 1) {
        const departingVolume = 'volumeTerrain';
        const arrivingVolume = this.arrivingPoint.attribut;

        if ((<any>this.stockOrder)[departingVolume] !== undefined && (<any>this.stockOrder)[arrivingVolume] !== undefined) {
          (<any>this.stockOrder)[departingVolume] -= this.TransferQuantity;
          (<any>this.stockOrder)[arrivingVolume] += this.TransferQuantity;
          this.saveStockOrder();
        }
      }
      else if ( this.startingPoint.id === 2) {
        const departingVolume = 'volumePort';
        const arrivingVolume = this.arrivingPoint.attribut;

        if ((<any>this.stockOrder)[departingVolume] !== undefined && (<any>this.stockOrder)[arrivingVolume] !== undefined) {
          (<any>this.stockOrder)[departingVolume] -= this.TransferQuantity;
          (<any>this.stockOrder)[arrivingVolume] += this.TransferQuantity;
          this.saveStockOrder();
        }
      }
      else if ( this.startingPoint.id === 3) {
        const departingVolume = 'volumeQuai';
        const arrivingVolume = this.arrivingPoint.attribut;

        if ((<any>this.stockOrder)[departingVolume] !== undefined && (<any>this.stockOrder)[arrivingVolume] !== undefined) {
          (<any>this.stockOrder)[departingVolume] -= this.TransferQuantity;
          (<any>this.stockOrder)[arrivingVolume] += this.TransferQuantity;
          this.saveStockOrder();
        }
      }
    }

    this.TransferDialog = false;
    this.isUpdateStockOrder = false;
  }

  // saveAddToSaline():void{
  //   // this.stockOrder.volumeSaline+=this.AddQuantityToSaline;
  //   this.saveStockOrder();
  //   this.AddToSalineDialog = false;
  //   this.isUpdateStockOrder = false;
  // }

  saveUpdateSaline() {
this.salineService.updateSaline(this.saline).subscribe(value => {
  this.getSalinesByStockOrder()
  this.saline=new Saline()
})
  }

  public updateSaline(saline: Saline) {
this.saline=saline;
  }

deleteSaline(saline: Saline) {
this.salineService.deleteSaline(saline.id).subscribe(value => this.getSalinesByStockOrder())
  }

 saveSaline() {
this.salineService.addSaline(this.saline, this.stockOrder.id).subscribe(value => {
this.getSalinesByStockOrder();
this.saline=new Saline()
})

  }


  protected readonly StockOrder = StockOrder;

  public salineV: Saline=new Saline();

  public setValueSaline() {
    this.stockOrder.salines?this.salineV=this.stockOrder.salines[0]:this.salineV=new Saline();
  }
}
