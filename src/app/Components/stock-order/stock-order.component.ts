import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
import {Puit} from "../../Models/puit";
import {BassinService} from "../../Services/bassin.service";
import {PuitService} from "../../Services/puit.service";
import Swal from "sweetalert2";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import {writeFile} from "xlsx";
import {getToken} from "../../../main";
import {StockOrderService} from "../../Services/stock-order.service";
import {StockOrder} from "../../Models/stock-order";
import {MultiSelectModule} from "primeng/multiselect";

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
    MultiSelectModule
  ],
  templateUrl: './stock-order.component.html',
  styleUrl: './stock-order.component.css'
})
export class StockOrderComponent implements OnInit{
  productDialog: boolean = false;
  TransferDialog: boolean = false;

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
  stockOrder: StockOrder = new StockOrder(0,'',new Date(),'',0,0,0,0,0,[],[]);


  private isUpdateStockOrder=false;

  loading:boolean=false ;


  constructor(  private messageService: MessageService,
                private bassinService :BassinService,
                private stockOrderService :StockOrderService) { }

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
    this.stockOrder = new StockOrder(0,'',new Date(),'',0,0,0,0,0,[],[]);

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
    {this.stockOrderService.addStockOrder(this.stockOrder).subscribe(() =>{
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

  calculTotalVolume(stockOrder:StockOrder):number {

  return  stockOrder.volumeSaline+stockOrder.volumeTerrain+stockOrder.volumePort+stockOrder.volumeQuai;

  }

  transferStockOrder(stockOrder: StockOrder) {
      this.TransferDialog=true;
      this.stockOrder=stockOrder;
    this.isUpdateStockOrder=true;
  }

hideDialogTransfer() {
    this.TransferDialog=false;

  }



  saveTransferQuantity(): void {
    if (this.TransferQuantity && this.startingPoint && this.arrivingPoint) {
      const startingPointAttr = this.TransferAttributs.find(attr => attr.id === this.startingPoint.id);
      const arrivingPointAttr = this.TransferAttributs.find(attr => attr.id === this.arrivingPoint.id);

      if (startingPointAttr && arrivingPointAttr && this.startingPoint.id === 0) {
        const departingVolume = 'volumeSaline';
        const arrivingVolume = arrivingPointAttr.attribut;

        if ((<any>this.stockOrder)[departingVolume] !== undefined && (<any>this.stockOrder)[arrivingVolume] !== undefined) {
          (<any>this.stockOrder)[departingVolume] -= this.TransferQuantity;
          (<any>this.stockOrder)[arrivingVolume] += this.TransferQuantity;
          this.saveStockOrder();
        }
      }
      else if (startingPointAttr && arrivingPointAttr && this.startingPoint.id === 1) {
        const departingVolume = 'volumeTerrain';
        const arrivingVolume = arrivingPointAttr.attribut;

        if ((<any>this.stockOrder)[departingVolume] !== undefined && (<any>this.stockOrder)[arrivingVolume] !== undefined) {
          (<any>this.stockOrder)[departingVolume] -= this.TransferQuantity;
          (<any>this.stockOrder)[arrivingVolume] += this.TransferQuantity;
          this.saveStockOrder();
        }
      }
      else if (startingPointAttr && arrivingPointAttr && this.startingPoint.id === 2) {
        const departingVolume = 'volumePort';
        const arrivingVolume = arrivingPointAttr.attribut;

        if ((<any>this.stockOrder)[departingVolume] !== undefined && (<any>this.stockOrder)[arrivingVolume] !== undefined) {
          (<any>this.stockOrder)[departingVolume] -= this.TransferQuantity;
          (<any>this.stockOrder)[arrivingVolume] += this.TransferQuantity;
          this.saveStockOrder();
        }
      }
      else if (startingPointAttr && arrivingPointAttr && this.startingPoint.id === 3) {
        const departingVolume = 'volumeQuai';
        const arrivingVolume = arrivingPointAttr.attribut;

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
}
