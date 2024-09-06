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
import {HistoryTransfer} from "../../Models/history-transfer";
import {HistoryTransferService} from "../../Services/history-transfer.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {MessagesModule} from "primeng/messages";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {Sbl} from "../../Models/sbl";
import {SblService} from "../../Services/sbl.service";

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
    RippleModule,
    MessagesModule,
    InputTextareaModule,
    CalendarModule
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
  TransferAttributsStart:any[]=[]
  TransferAttributsEnd:any[]=[]
  stockOrder!: StockOrder;
  saline: Saline=new Saline();
  historyTransfer: HistoryTransfer=new HistoryTransfer();
  dateStartTransfer!:Date;
  dateEndTransfer!:Date;
  totalTransferFiltree:number=0;
  dateStartSaline!:Date;
  dateEndSaline!:Date;
  totalSalineFiltree:number=0;
  private isUpdateStockOrder=false;

  loading:boolean=false ;
  public sbls: Sbl[]=[];


  constructor(  private messageService: MessageService,
                private bassinService :BassinService,
                private stockOrderService :StockOrderService,
                private salineService :SalineService,
                private datepipe:DatePipe,
                private historyTransferService :HistoryTransferService,
                private sblService:SblService) {

  }

  ngOnInit() {
    this.TransferAttributs= [
      {id:0,label:'Saline volume',attribut:'volumeSaline'},
      {id:1,label:'Terrain volume',attribut:'volumeTerrain'},
      {id:2,label:'Port volume',attribut:'volumePort'},
      {id:3,label:'Quai volume',attribut:'volumeQuai'},

    ] ;
    this.TransferAttributsStart=   [...this.TransferAttributs]
    this.TransferAttributsEnd=   [...this.TransferAttributs]
    this.getAllBassin();
    this.getAllStockOrder();
  }

  getAllSbls(){
    this.sblService.getAllSblDTO().subscribe(value => this.sbls=value)
  }
  openNew() {
    this.stockOrder = new StockOrder();

    this.submitted = false;
    this.productDialog = true;
    this.getAllSbls();

  }

  deleteSelectedBassins() {

    this.deleteProductsDialog = true;

  }

  editStockOrder(stockOrder: StockOrder) {
    this.isUpdateStockOrder=true;
    this.stockOrder = stockOrder ;
    this.getAllSbls();

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


      // console.error(this.stockOrder)

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
    this.stockOrderService.getAllStockOrderDTO()
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
    const TotalSaline= stockOrder.salines.reduce((sum, saline) => sum+saline.volumeSaline,0)
    const TotalTransferFromSaline=stockOrder.listHistory.filter(lh=>lh.startingPoint=='Saline volume').reduce((sum, history) => sum+history.transferQuantity,0)
    const TotalTransferToSaline=stockOrder.listHistory.filter(lh=>lh.arrivingPoint=='Saline volume').reduce((sum, history) => sum+history.transferQuantity,0)

    return  (TotalSaline-TotalTransferFromSaline) +TotalTransferToSaline;

  }
  // ===================Sum=========================
  public salines: any;
  public selectedSalines: any;
  transferStockOrder(stockOrder: StockOrder) {
    this.TransferDialog=true;
    this.stockOrder=stockOrder;
    this.isUpdateStockOrder=true;
    this.historyTransfer=new HistoryTransfer();
  }
  AddToSalineStockOrder(stockOrder: StockOrder) {
    this.AddQuantityToSaline=0;
    this.AddToSalineDialog=true;
    this.stockOrder=stockOrder;
    this.isUpdateStockOrder=true;
    this.saline=new Saline()


  }
  getSalinesByStockOrder(){
    this.stockOrderService.getSalinesByStockOrder(this.stockOrder.id).subscribe(value => this.stockOrder.salines=value)
  }
  hideDialogTransfer() {
    this.TransferDialog=false;

  }hideDialogAddToSaline() {
    this.AddToSalineDialog=false;
this.getAllStockOrder();
  }



  saveTransferQuantity(): void {



    if (this.TransferQuantity && this.startingPoint && this.arrivingPoint) {

      this.historyTransfer.startingPoint = this.startingPoint.label;
      this.historyTransfer.arrivingPoint = this.arrivingPoint.label;
      this.historyTransfer.transferQuantity = this.TransferQuantity;
      this.stockOrder.listHistory.push((this.historyTransfer))
      this.saveQuantityTranferStarAndArriving().then(value => {
       value!=null && value!=undefined ? this.stockOrder=value:this.getAllStockOrder() ;
      });


    }else {
      this.messages=[{ severity: 'error', summary: 'No item was selected' }]

    }

    this.isUpdateStockOrder = false;
    this.historyTransfer=new HistoryTransfer()
  }
   async  saveQuantityTranferStarAndArriving(){
    if(this.startingPoint ) {
      if (this.startingPoint.id === 0) {
        const departingVolume = 'volumeSaline';
        const arrivingVolume = this.arrivingPoint.attribut;
        // (<any>this.stockOrder)[departingVolume] -= this.TransferQuantity;
        (<any>this.stockOrder)[arrivingVolume] += this.TransferQuantity;

      } else if (this.startingPoint.id === 1) {
        const departingVolume = 'volumeTerrain';
        const arrivingVolume = this.arrivingPoint.attribut;

        if ((<any>this.stockOrder)[departingVolume] !== undefined) {
          (<any>this.stockOrder)[departingVolume] -= this.TransferQuantity;
          if (arrivingVolume !== 'volumeSaline')
            (<any>this.stockOrder)[arrivingVolume] += this.TransferQuantity;

        }
      } else if (this.startingPoint.id === 2) {
        const departingVolume = 'volumePort';
        const arrivingVolume = this.arrivingPoint.attribut;

        if ((<any>this.stockOrder)[departingVolume] !== undefined) {
          (<any>this.stockOrder)[departingVolume] -= this.TransferQuantity;
          if (arrivingVolume !== 'volumeSaline')
            (<any>this.stockOrder)[arrivingVolume] += this.TransferQuantity;

        }
      } else if (this.startingPoint.id === 3) {
        const departingVolume = 'volumeQuai';
        const arrivingVolume = this.arrivingPoint.attribut;

        if ((<any>this.stockOrder)[departingVolume] !== undefined) {
          (<any>this.stockOrder)[departingVolume] -= this.TransferQuantity;
          if (arrivingVolume !== 'volumeSaline')
            (<any>this.stockOrder)[arrivingVolume] += this.TransferQuantity;
        }
      }

      return await  this.stockOrderService.updateStockOrder(this.stockOrder).toPromise()
    }
    return null
  }




  public updateSaline(saline: Saline) {

    this.selectedBassin=this.stockOrder.bassinList.find(value => value.nom==saline.nomBassin);
    this.saline=saline;
  }

  deleteSaline(saline: Saline) {
    this.salineService.deleteSaline(saline.id).subscribe(value => this.getSalinesByStockOrder())
  }

  saveSaline() {

// @ts-ignore
    this.saline.nomBassin=this.selectedBassin.nom;
    this.salineService.addSaline(this.saline, this.stockOrder.id).subscribe(value => {
      this.getSalinesByStockOrder();
      this.saline=new Saline()
    })

  }


  protected readonly StockOrder = StockOrder;

  public getTransferAttributsFiltredStart() {
    if(this.startingPoint!=undefined)
      this.TransferAttributsEnd=this.TransferAttributs.filter(t=>t.id!=this.startingPoint.id)
    else
      this.TransferAttributsEnd=[...this.TransferAttributs] ;
  }
  public getTransferAttributsFiltredEnd() {

    if(this.arrivingPoint!=undefined)
      this.TransferAttributsStart=this.TransferAttributs.filter(t=>t.id!=this.arrivingPoint.id)
    else
      this.TransferAttributsStart=[...this.TransferAttributs] ;
  }
  backUpHistory!:HistoryTransfer;
  messages: any;
  public selectedBassin: Bassin | undefined={};
  public updateHistory( history: HistoryTransfer) {

    console.info(history)
    this.backUpHistory=new HistoryTransfer(history.id,history.dateCreation,history.startingPoint,history.arrivingPoint,history.transferQuantity,history.observation,history.rainQuantityZarzis);


  }

  public saveUpdateHistory(history: HistoryTransfer) {
    // console.error(this.backUpHistory)
    // console.log(history)
    if(this.backUpHistory.transferQuantity<history.transferQuantity){
      this.startingPoint=   this.getTransferAttributsByLabel(history.startingPoint);
      this.arrivingPoint=   this.getTransferAttributsByLabel(history.arrivingPoint);
      this.TransferQuantity=history.transferQuantity-this.backUpHistory.transferQuantity;

    } else if(this.backUpHistory.transferQuantity>history.transferQuantity){
      this.arrivingPoint=   this.getTransferAttributsByLabel(history.startingPoint);
      this. startingPoint=   this.getTransferAttributsByLabel(history.arrivingPoint);
      this.TransferQuantity=this.backUpHistory.transferQuantity-history.transferQuantity;
    }else {
      this.historyTransferService.updateHistoryTransfer(history).subscribe(value => console.log(value))
    }
    this.saveQuantityTranferStarAndArriving();
    this.historyTransfer=new HistoryTransfer();
  }
  public deleteHistory(history: HistoryTransfer) {
    this.arrivingPoint=   this.getTransferAttributsByLabel(history.startingPoint);
    this. startingPoint=   this.getTransferAttributsByLabel(history.arrivingPoint);
    this.TransferQuantity=history.transferQuantity;
    this.stockOrder.listHistory=this.stockOrder.listHistory.filter(value => value.id!==history.id) ;
        this.saveQuantityTranferStarAndArriving().then(value => {
          this.historyTransferService.deleteHistoryTransfer(history.id).subscribe(value => this.getAllStockOrder())
          this.historyTransfer=new HistoryTransfer();
        });


      this.historyTransfer=new HistoryTransfer();
  }

  getTransferAttributsByLabel(label:string){

    return  this.TransferAttributs.find(value => value.label==label);

  }

  public filtreListTransferWithDate(dateStartTransfer: Date, dateEndTransfer: Date) {
    if (!this.stockOrder.listHistory) return;

    this.stockOrder.listHistory = this.stockOrder.listHistory.filter(history => {

      return new Date(dateStartTransfer)  <= new Date(history.dateCreation) && new Date(dateEndTransfer)  >= new Date(history.dateCreation);
    });
    this.stockOrder.listHistory.forEach(his => this.totalTransferFiltree+=his.transferQuantity)
  }
  getStockOrderById(){
    this.totalTransferFiltree=0;
    this.totalSalineFiltree=0
    this.stockOrderService.getStockOrderById(this.stockOrder.id).subscribe(value => this.stockOrder=value)
  }

  filtreListSalineWithDate(dateStartSaline: Date, dateEndSaline: Date) {
    if (!this.stockOrder.salines) return;

    this.stockOrder.salines = this.stockOrder.salines.filter(history => {

      return new Date(dateStartSaline)  <= new Date(history.dateCreation) && new Date(dateEndSaline)  >= new Date(history.dateCreation);
    });
    this.stockOrder.salines.forEach(saline => this.totalSalineFiltree+=saline.volumeSaline)
  }

  getTransferAttributs() {
    return undefined;
  }

  protected readonly Saline = Saline;



}
