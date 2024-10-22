import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Laverie} from "../../Models/laverie";
import {Message, MessageService, SharedModule} from "primeng/api";
import {LaverieService} from "../../Services/laverie.service";
import Swal from "sweetalert2";
import {Table, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DatePipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {getToken} from "../../../main";
import {Product} from "../../Models/product";
import {Sbnl} from "../../Models/sbnl";
import {TraitementStock} from "../../Models/traitement-stock";
import {SbnlService} from "../../Services/sbnl.service";
import {TraitementStockService} from "../../Services/traitement-stock.service";

import {AutoFocusModule} from "primeng/autofocus";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {ListboxModule} from "primeng/listbox";
import {TooltipModule} from "primeng/tooltip";
import {RadioButtonModule} from "primeng/radiobutton";
import {TransferLaverieToCribleLiwell} from "../../Models/transfer-laverie-to-crible-liwell";
import {CribleLiwell} from "../../Models/cribleLiwell";
import {Crible} from "../../Models/crible";
import {TransferLaverieToCrible} from "../../Models/transfer-laverie-to-crible";

import {CribleService} from "../../Services/crible.service";
import {TransferLaverieToCribleService} from "../../Services/transfer-laverie-to-crible.service";
import {TransferLaverieToCribleLiwellService} from "../../Services/transfer-laverie-to-crible-liwell.service";
import {CribleLiwellService} from "../../Services/cribleLiwell.service";
import {Sbl} from "../../Models/sbl";
import {TransferLaverieToWashed} from "../../Models/transfer-laverie-to-washed";
import {TransferLaverieToWashedService} from "../../Services/transfer-laverie-to-washed.service";
import {SblService} from "../../Services/sbl.service";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {MessagesModule} from "primeng/messages";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-laverie',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    MultiSelectModule,
    NgIf,
    ReactiveFormsModule,
    RippleModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FormsModule,
    NgClass,
    AutoFocusModule,
    CalendarModule,
    CheckboxModule,
    ListboxModule,
    NgForOf,
    TooltipModule,
    RadioButtonModule,
    ConfirmPopupModule,
    MessagesModule,
    TagModule
  ],
  templateUrl: './laverie.component.html',
  styleUrl: './laverie.component.css'
})
export class LaverieComponent {
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};


  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============
  laveries: Laverie[] = [];

  laverie:Laverie=new Laverie();

  selectedLaveries: Laverie[] = [];
  selectedlaverie:Laverie=new Laverie();
   isUpdatelaverie=false;
  sbnls: Sbnl[] = [];
  SelectAll: boolean = false;
  detailsDialog: boolean = false;
  TraitementStockDialog: boolean = false;
  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  public  _selectedColumns: any[]=[];
  traitementStock:TraitementStock=new TraitementStock();
  ListTraitementStock:TraitementStock[] =[];
  TransferToDialog:boolean=false;
  ingredient:string="liwellSieve";
  transferLaverieToCribleLiwell:TransferLaverieToCribleLiwell=new TransferLaverieToCribleLiwell();
  selectedCribleLiwell:CribleLiwell={};
  listCribleLiwells:CribleLiwell[]=[];
  listCribleVerts:Crible[]=[];
  selectedCribleVert:Crible=new Crible();
  ListTransferLaverieToCribleLiwell:TransferLaverieToCribleLiwell[]=[];
  ListTransferLaverieToCribleVert:TransferLaverieToCrible[]=[];
  transferLaverieToCribleVert:TransferLaverieToCrible=new TransferLaverieToCrible();
  listWasheds:Sbl[]=[];
  selectedWashed:Sbl={};
  ListTransferLaverieToWashed:TransferLaverieToWashed[]=[];
  transferLaverieToWashed:TransferLaverieToWashed=new TransferLaverieToWashed()

  public dateStartLaverieToCribleLiwell!: Date;
  public dateEndLaverieToCribleLiwell!: Date;
  public totalLaverieToCribleLiwellFiltree: number=0;


  public dateStartLaverieToCribleVert!: Date;
  public dateEndLaverieToCribleVert!: Date;
  public totalLaverieToCribleVertFiltree: number=0;

  public dateStartLaverieToWashed!: Date;
  public dateEndLaverieToWashed!: Date;
  public totalLaverieToWashedFiltree: number=0;


  messages: Message[] =[];

  deleteTransferToWashedDialog:boolean=false;
  deleteTransferToCribleLiwellDialog:boolean=false;
  deleteTransferToCribleVertDialog:boolean=false;
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  constructor(  private messageService: MessageService,
                private sbnlService :SbnlService,
                private laverieService:LaverieService,
                private traitementStockService:TraitementStockService,
                private cribleVertservice:CribleService,
                private transferLaverieToCribleVertService:TransferLaverieToCribleService,
                private transferLaverieToCribleLiwellService:TransferLaverieToCribleLiwellService,
                private cribleLiwellService:CribleLiwellService,
                private transferLaverieToWashedService:TransferLaverieToWashedService,
                private sblService:SblService
                ) {}

  ngOnInit() {
    this.getAllCribleVerts();
    this.getAllCribleLiwells();
    this.getAllWasheds();
   this.getLaverie()
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'reference', header: 'reference' },
      { field: 'description', header: 'description' },
      { field: 'dateCreation', header: 'dateCreation' },
      { field: 'state', header: 'state' },
      { field: 'totalquantite', header: 'totalquantite' },
      { field: 'refusalquantite', header: 'refusalquantite' },
      { field: 'Sbnl', header: 'Sbnl' },
    ];


  }

  openNew() {
    this.laverie=new Laverie();
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedLaveries() {

    this.deleteProductsDialog = true;

  }

  editLaverie(laverie: Laverie) {
    this.isUpdatelaverie=true;


    this.laverie = laverie ;
    this.productDialog = true;
  }

  deleteLaverie(laverie :Laverie) {
    this.deleteProductDialog = true;
    this.laverie=laverie;

  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    // console.log(this.selectedLaveries.length)
    this.selectedLaveries.forEach(selectedLaverie => {
      this.laverieService.deleteLaverie(selectedLaverie.id).subscribe(
        () => {
          this.laveries = this.laveries.filter(laverie =>laverie.id !== selectedLaverie.id);
          this.messageService.add({ severity: 'success', summary: 'successful', detail: 'Laverie Delete', life: 3000 });

        },
        (error) => {
          console.error( error);
          Swal.fire({
            icon: "error",
            title: "Can not deleted",
            text: "Laverie related with Washed !",
          })
        }
      );
    });

    this.selectedLaveries = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;

    if (this.laverie.id!= null) {
      this.laverieService.deleteLaverie(this.laverie.id).subscribe(() => { this.laveries = this.laveries.filter(val => val.id !== this.laverie.id);
        this.messageService.add({ severity: 'success', summary: 'successful', detail: 'Laverie Deleted', life: 3000 });

      },error => {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Can not deleted",
          text: "Laverie related with Washed !",
        })
      });
    }

  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveLaverie() {
    this.submitted = false;
    this.productDialog=false

    if(this.isUpdatelaverie==true) {
      this.laverieService.updateLaverie(this.laverie).subscribe(() =>{
        this.getLaverie();
      });
      console.log('Laverie updated');
      this.isUpdatelaverie=false;
    }
    else
    {
      this.laverieService.addLaverie(this.laverie).subscribe(() => {this.getLaverie();});

    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getLaverie() {
    this.loading=true ;
    this.laverieService.getAllLaveriesDto().subscribe((v:  Laverie[]) => {
      this.laveries=v;
      this.loading=false ;
    },error => {
      console.log(error)})
    this.loading=true ;

    this.sbnlService.getAllSbnlsDTO()
      .subscribe((sbnls: Sbnl[]) => {
        this.sbnls = sbnls;
        this.loading=false ;

      }, error => {
        console.log('Error fetching users:', error);
      });
  }

  colsfiltre: any[] = [];

  protected readonly getToken = getToken;
  loading: boolean=false;
  public selectedSbnl: Sbnl={};


  public openDialog(b:Laverie) {
    this.detailsDialog=true;
    this.laverie=b;
    this.laverie.sbnlList.forEach(value => console.log("laverie: "+new JsonPipe().transform(value.transferToLaverieList)))
  }

  // public AddTraitementStock(b: Laverie) {
  //   this.TraitementStockDialog=true;
  //   this.laverie=b;
  //   this. getListTraitementStock();
  // }

  // public saveTraitementStock() {
  //
  //   if ( this.laverie.id!==undefined)
  //     this.traitementStockService.addTraitementStock(this.traitementStock,this.laverie.id).subscribe(value => {
  //       this. getListTraitementStock();
  //       this.traitementStock=new TraitementStock();
  //     })
  //
  // }
  // getListTraitementStock(){
  //   if(this.laverie.id!=undefined)
  //     this.laverieService.getLaverieById(this.laverie.id).subscribe(value => {
  //       if(value.traitementStocks!=undefined)
  //         this.ListTraitementStock = value.traitementStocks;
  //     } )
  // }


  public updateTraitementStock(traitement: TraitementStock) {
    this.traitementStock=traitement;

  }

  // public saveUpdateTraitementStock() {
  //   this.traitementStockService.updateTraitementStock(this.traitementStock).subscribe(value => {
  //     this. getListTraitementStock();
  //
  //   })
  // }

  public deleteTraitementStock(traitementStock: TraitementStock) {
    this.traitementStockService.deleteTraitementStock(traitementStock.id).subscribe(value =>     this.ListTraitementStock= this.ListTraitementStock.filter(traitement => traitement.id !== traitementStock.id))

  }

  // public getTotalQuantity(b: Laverie) {
  //   let totalTransfer:number=0;
  //   let totalTraitment:number=0;
  //
  //   if(b.traitementStocks!=undefined){
  //     totalTraitment= b.traitementStocks.reduce((sum, traitmentStock) => sum+traitmentStock.sortieB1+traitmentStock.sortieB2+traitmentStock.refus,0)
  //   }
  //   if(b.sbnlList!=undefined){
  //     b.sbnlList?.forEach(sbnl => {
  //       if(sbnl.transferToLaverieList!=undefined)
  //         totalTransfer +=sbnl.transferToLaverieList.reduce((sum, transfer) => sum + transfer.quantityTransfer, 0)
  //     } )}
  //   return totalTransfer-totalTraitment;
  // }

  public AddTransferTo(laverie: Laverie) {
    this.TransferToDialog=true;
    this.laverie=laverie;
    this. getListTransferLaverieToCribleLiwell();
    this. getListTransferLaverieToCribleVert();
    this.getListTransferLaverieToWashed();
  }

  public saveTransferLaverieToCribleVert() {
    if ( this.laverie.id!==undefined && this.selectedCribleVert.reference!=='' && this.selectedCribleVert){
      this.transferLaverieToCribleVert.cribleVertReference=this.selectedCribleVert.reference;
      this.transferLaverieToCribleVertService.addTransferLaverieToCrible(this.transferLaverieToCribleVert,this.laverie.id).subscribe(value => {
        this.getListTransferLaverieToCribleVert();
        this.transferLaverieToCribleVert=new TransferLaverieToCrible();
      },error => {
        console.log(error)
      })    }else {
      this.messages = [
        {severity: 'error', detail: 'Please select a Green Sieve before saving.'}
      ];
    }
  }

  getListTransferLaverieToCribleVert(){
    if(this.laverie.id!=undefined)
      this.laverieService.getLaverieDtoById(this.laverie.id).subscribe(value => {
        if(value.transferLaverieToCriblesVert!=undefined){
          this.totalLaverieToCribleVertFiltree=0;
          this.ListTransferLaverieToCribleVert = value.transferLaverieToCriblesVert;
        }
      } )
  }

  getAllCribleLiwells(){
    this.cribleLiwellService.getAllCribleLiwellsDTO().subscribe(value => this.listCribleLiwells=value)
  }
  getAllCribleVerts(){
    this.cribleVertservice.getAllCriblesDto().subscribe(value => this.listCribleVerts=value)
  }
  getAllWasheds(){
    this.sblService .getAllSblDTO().subscribe(value => {
      this.listWasheds = value;

    })
  }
  public deleteTransferLaverieToCribleVert(transferLaverieToCribleVert: TransferLaverieToCrible){
    this.deleteTransferToCribleVertDialog=true;
    this.transferLaverieToCribleVert=transferLaverieToCribleVert;
  }
  public confirmDeleteTransferLaverieToCribleVert() {
    this.transferLaverieToCribleVertService.deleteTransferLaverieToCrible(this.transferLaverieToCribleVert.id).subscribe(value => {
      this.ListTransferLaverieToCribleVert = this.ListTransferLaverieToCribleVert.filter(transfer => transfer.id !== this.transferLaverieToCribleVert.id);
      this.deleteTransferToCribleVertDialog=false;
    })

  }

  public saveUpdateTransferLaverieToCribleVert() {
    if ( this.laverie.id!==undefined&&this.selectedCribleVert.reference!==undefined  )
    {
      this.transferLaverieToCribleVert.cribleVertReference=this.selectedCribleVert.reference;
      this.transferLaverieToCribleVertService.updateTransferLaverieToCrible(this.transferLaverieToCribleVert).subscribe(value => {
        this. getListTransferLaverieToCribleVert();
        this.transferLaverieToCribleVert=new TransferLaverieToCrible();
      })   }



  }

  public updateTransferLaverieToCribleVert(transferLaverieToCribleVert: TransferLaverieToCrible) {
    const cribleVert=this.getCribleVertByReference(transferLaverieToCribleVert.cribleVertReference);
    if(cribleVert!==undefined){
      this.selectedCribleVert=cribleVert;
    }
    this.transferLaverieToCribleVert=transferLaverieToCribleVert;

  }

  public saveTransferLaverieToCribleLiwell() {
    if ( this.laverie.id!==undefined&&this.selectedCribleLiwell.reference!==undefined && this.selectedCribleLiwell)
    {
      this.transferLaverieToCribleLiwell.cribleLiwellReference=this.selectedCribleLiwell.reference;
      this.transferLaverieToCribleLiwellService.addTransferLaverieToCribleLiwell(this.transferLaverieToCribleLiwell,this.laverie.id).subscribe(value => {
        this. getListTransferLaverieToCribleLiwell();
        this.transferLaverieToCribleLiwell=new TransferLaverieToCribleLiwell();

      }) }  else {
      this.messages = [
        {severity: 'error', detail: 'Please select a Liwell Sieve before saving.'}
      ];
    }
  }

  public updateTransferLaverieToCribleLiwell(transferLaverieToCribleLiwell: TransferLaverieToCribleLiwell) {
    const cribleLiwell=this.getCribleLiwellByReference(transferLaverieToCribleLiwell.cribleLiwellReference);
    if(cribleLiwell!==undefined){
      this.selectedCribleLiwell=cribleLiwell;
    }
    this.transferLaverieToCribleLiwell=transferLaverieToCribleLiwell;
  }

  public saveUpdateTransferLaverieToCribleLiwell() {

      if ( this.laverie.id!==undefined && this.selectedCribleLiwell.reference!==undefined )
      {
        this.transferLaverieToCribleLiwell.cribleLiwellReference=this.selectedCribleLiwell.reference;
        this.transferLaverieToCribleLiwellService.updateTransferLaverieToCribleLiwell(this.transferLaverieToCribleLiwell).subscribe(value => {
          this. getListTransferLaverieToCribleLiwell();
          this.transferLaverieToCribleLiwell=new TransferLaverieToCribleLiwell();
        })   }


  }
  public deleteTransferLaverieToCribleLiwell(transferLaverieToCribleLiwell: any){
    this.deleteTransferToCribleLiwellDialog=true;
    this.transferLaverieToCribleLiwell=transferLaverieToCribleLiwell;
  }
  public confirmDeleteTransferLaverieToCribleLiwell() {
    this.transferLaverieToCribleLiwellService.deleteTransferLaverieToCribleLiwell(this.transferLaverieToCribleLiwell.id)
      .subscribe(value => {this.ListTransferLaverieToCribleLiwell = this.ListTransferLaverieToCribleLiwell.filter(transfer => transfer.id !== this.transferLaverieToCribleLiwell.id);
        this.deleteTransferToCribleLiwellDialog=false;
  })

  }

  getListTransferLaverieToCribleLiwell(){
    if(this.laverie.id!=undefined)
      this.laverieService.getLaverieDtoById(this.laverie.id).subscribe(value => {
        if(value.transferLaverieToCribleLiwells!=undefined){
          this.totalLaverieToCribleLiwellFiltree=0;
          this.ListTransferLaverieToCribleLiwell = value.transferLaverieToCribleLiwells;
        }
      } )
  }
// -------------------TRANSFER LAVERIE TO WASHED-----------------------------------------



  public saveTransferLaverieToWashed() {
    if ( this.laverie.id!==undefined&&this.selectedWashed.reference!==undefined  && this.selectedWashed)
    {
      this.transferLaverieToWashed.washedReference=this.selectedWashed.reference;
      this.transferLaverieToWashedService.addTransferLaverieToWashed(this.transferLaverieToWashed,this.laverie.id).subscribe(value => {
        this. getListTransferLaverieToWashed();
        this.transferLaverieToWashed=new TransferLaverieToWashed();
      })   }else {
      this.messages = [
        {severity: 'error', detail: 'Please select a Washed before saving.'}
      ];
    }
  }

  public updateTransferLaverieToWashed(transferLaverieToWashed: TransferLaverieToWashed) {
    const sbl=this.getWashedByReference(transferLaverieToWashed.washedReference);
    if(sbl!==undefined){
      this.selectedWashed=sbl;
    }
    this.transferLaverieToWashed=transferLaverieToWashed;
  }

  public saveUpdateTransferLaverieToWashed() {
    if ( this.laverie.id!==undefined&&this.selectedWashed.reference!==undefined )
    {
      this.transferLaverieToWashed.washedReference=this.selectedWashed.reference;
      this.transferLaverieToWashedService.updateTransferLaverieToWashed(this.transferLaverieToWashed).subscribe(value => {
        this. getListTransferLaverieToWashed();
        this.transferLaverieToWashed=new TransferLaverieToWashed();
      })   }


  }
  public deleteTransferLaverieToWashed(transferLaverieToWashed: TransferLaverieToWashed){
    this.deleteTransferToWashedDialog=true;
    this.transferLaverieToWashed=transferLaverieToWashed;
  }
  public confirmDeleteTransferLaverieToWashed() {
    this.transferLaverieToWashedService.deleteTransferLaverieToWashed(this.transferLaverieToWashed.id).subscribe(value => {
      this.ListTransferLaverieToWashed = this.ListTransferLaverieToWashed.filter(transfer => transfer.id !== this.transferLaverieToWashed.id);
      this.deleteTransferToWashedDialog=false;
    })
  }

  getListTransferLaverieToWashed(){
    if(this.laverie.id!=undefined)
      this.laverieService.getLaverieDtoById(this.laverie.id).subscribe(value => {
        if(value.transferLaverieToWasheds!=undefined){
          this.totalLaverieToWashedFiltree=0;
          this.ListTransferLaverieToWashed = value.transferLaverieToWasheds;
        }
      } )
  }

  public getTotalQuantity(laverie: Laverie) {
    let totalUnwashed:number=0;

    let totalCribleLiwell:number=0;
    let totalWashed:number=0;
    let totalCribleVert:number=0;

    if(laverie.transferLaverieToCribleLiwells!=undefined){
      totalCribleLiwell= laverie.transferLaverieToCribleLiwells.reduce((sum, transfer) => sum+transfer.quantityTransfer,0)
    }
    if(laverie.transferLaverieToCriblesVert!=undefined){
      totalCribleVert= laverie.transferLaverieToCriblesVert.reduce((sum, transfer) => sum+transfer.quantityTransfer,0)
    }
    if(laverie.transferLaverieToWasheds!=undefined){
      totalWashed= laverie.transferLaverieToWasheds.reduce((sum, transfer) => sum+transfer.quantityTransfer,0)
    }
    if(laverie.sbnlList!=undefined){
      laverie.sbnlList?.forEach(sbnl => {
        if(sbnl.transferToLaverieList!=undefined)
          totalUnwashed +=sbnl.transferToLaverieList.reduce((sum, Transfer) => sum + Transfer.quantityTransfer, 0)
      } )}

    return totalUnwashed-(totalCribleLiwell+totalWashed+totalCribleVert);

  }

  public filtreListLaverieToCribleLiwellWithDate(dateStartLaverieToCribleLiwell: Date, dateEndLaverieToCribleLiwell: Date) {
    this. totalLaverieToCribleLiwellFiltree=0
    if (!this.ListTransferLaverieToCribleLiwell) return;

    this.ListTransferLaverieToCribleLiwell = this.ListTransferLaverieToCribleLiwell.filter(transferLaverieToCribleLiwell => {

      return new Date(dateStartLaverieToCribleLiwell)  <= new Date(transferLaverieToCribleLiwell.dateCreation) && new Date(dateEndLaverieToCribleLiwell)  >= new Date(transferLaverieToCribleLiwell.dateCreation);
    });
    this.ListTransferLaverieToCribleLiwell.forEach(transferLaverieToCribleLiwell => this.totalLaverieToCribleLiwellFiltree+=transferLaverieToCribleLiwell.quantityTransfer)

  }

  public filtreListLaverieToCribleVertWithDate(dateStartLaverieToCribleVert: Date, dateEndLaverieToCribleVert: Date) {
    this. totalLaverieToCribleVertFiltree=0
    if (!this.ListTransferLaverieToCribleVert) return;

    this.ListTransferLaverieToCribleVert = this.ListTransferLaverieToCribleVert.filter(transferLaverieToCrible => {

      return new Date(dateStartLaverieToCribleVert)  <= new Date(transferLaverieToCrible.dateCreation) && new Date(dateEndLaverieToCribleVert)  >= new Date(transferLaverieToCrible.dateCreation);
    });
    this.ListTransferLaverieToCribleVert.forEach(transferLaverieToCrible => this.totalLaverieToCribleVertFiltree+=transferLaverieToCrible.quantityTransfer)

  }

  public filtreListLaverieToWashedWithDate(dateStartLaverieToWashed: any, dateEndLaverieToWashed: any) {
    this. totalLaverieToWashedFiltree=0
    if (!this.ListTransferLaverieToWashed) return;

    this.ListTransferLaverieToWashed = this.ListTransferLaverieToWashed.filter(transferLaverieToWashed => {

      return new Date(dateStartLaverieToWashed)  <= new Date(transferLaverieToWashed.dateCreation) && new Date(dateEndLaverieToWashed)  >= new Date(transferLaverieToWashed.dateCreation);
    });
    this.ListTransferLaverieToWashed.forEach(transferLaverieToWashed => this.totalLaverieToWashedFiltree+=transferLaverieToWashed.quantityTransfer)

  }

  getWashedByReference(reference:string){
    return this.listWasheds.find(value => value.reference==reference)
  }
  getCribleVertByReference(reference:string){
    return this.listCribleVerts.find(value => value.reference==reference)
  }
  getCribleLiwellByReference(reference:string){
    return this.listCribleLiwells.find(value => value.reference==reference)
  }
}
