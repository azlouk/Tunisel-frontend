import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {DatePipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {MenuItem, MenuItemCommandEvent, MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
 import {Router} from "@angular/router";
 import {Commande} from "../../Models/commande";
import {CommandeService} from "../../Services/commande.service";
import {getToken} from "../../../main";
import {FormsModule} from "@angular/forms";
 import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {Puit} from "../../Models/puit";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {RippleModule} from "primeng/ripple";
import {Column} from "jspdf-autotable";
import {AutoFocusModule} from "primeng/autofocus";
import {ListboxModule} from "primeng/listbox";
import {InputNumberModule} from "primeng/inputnumber";
import {TimelineModule} from "primeng/timeline";
import * as events from "events";
import {StepsModule} from "primeng/steps";
import {StockOrder} from "../../Models/stock-order";
import {StockOrderService} from "../../Services/stock-order.service";
import {LogarithmicScale} from "chart.js";



@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    NgIf,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FormsModule,
    DropdownModule,
    MultiSelectModule,
    NgForOf,
    RippleModule,
    AutoFocusModule,
    ListboxModule,
    InputNumberModule,
    DatePipe,
    TimelineModule,
    StepsModule
  ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit{

  itemsData: MenuItem[] | undefined;


  activeIndex: number =0;

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};


  submitted: boolean = false;

  cols: any[] = [];


  rowsPerPageOptions = [5, 10, 20];
  // ======********============

  commandes:Commande[] = [];
  ListCommandes: Commande[] = [];

  commande:Commande={};
 updateCommande:Commande={};
  selectedCommandes:Commande[] = [];
isUpdateCommande:boolean=false;
  visible: boolean=false;
  selectedColumns!: Column[];
commandesCopy: Commande[]=[];
  stockOrders: StockOrder[] = [];
  stockSelected!: StockOrder;

  TotalHarv: number=0;
  TotalProd: number=0;
  TotalTrQu: number=0;
  TotalVolume: number=0;
  VolumeAvailble: number=0;
  constructor(private router: Router,
              private messageService: MessageService,
              private commandeService :CommandeService,
              private stockOrderService:StockOrderService) {}

  ngOnInit() {

    this.cols = [

      {id:0, field: 'dateAnalyse', header: 'Prelevelment date' },
      {id:1, field: 'reference', header: 'Reference' },
      {id:2,field: 'matiere', header: 'Matter' },
      {id:3, field: 'description', header: 'Description' },
      {id:4, field: 'temperature', header: 'Temperature' },
      {id:5, field: 'vent', header: 'wind' },
      {id:6, field: 'densite', header: 'Densite' },
      {id:7, field: 'matiereEnSuspension', header: 'Suspended matter'},
      {id:8, field: 'salinite', header: 'Salinite'},
      {id:9, field: 'calcium', header: 'Calcium'},
      {id:10, field: 'magnesium', header: 'Magnesium'},
      {id:11, field: 'sulfate', header: 'sulfate'},
      {id:12, field: 'humidite', header: 'Humidite'},
      {id:13, field: 'matiereInsoluble', header: 'Insoluble matter'},
      {id:14, field: 'potassium', header: 'Potassium'},
      {id:15, field: 'sodium', header: 'Sodium'},
      {id:16, field: 'chlorure', header: 'Chorure'},
      {id:17, field: 'ph', header: 'Ph'},
      {id:18, field: 'chlorureDeSodium', header: 'Chlorure de Sodium'},
      {id:19, field: 'ferrocyanure', header: 'Ferrocyanure'},
      {id:20, field: 'conformite', header: 'Conformite'},
      {id:21, field: 'qualite', header: 'Quality'},
      {id:22, field: 'calibre', header: 'Calibre'},
      {id:23, field: 'masse', header: 'Weight'},
      {id:24, field: 'refus', header: 'Refusal '},
      {id:25, field: 'refusCumulated', header: 'Refusal Cumulateds '},
      {id:26, field: 'passCumulated', header: 'Cumulated Pass'},
      {id:27, field: 'quantityRecolte', header: 'Harvest'},
      {id:28, field: 'quantityProduction', header: 'Production'},
      {id:29, field: 'quantityPluieBengarden', header: 'Ben Gardane Rain'},
      {id:30, field: 'quantityPluieZarzis', header: 'Zarzis Rain'},
      {id:31, field: 'quantiteTransfert', header: 'Transfer Quantity'},
      {id:32, field: 'decisionTransfert', header: 'Transfer Decision'},
      {id:33, field: 'numeroLot', header: 'Number Lot'},
      {id:34, field: 'poidsLot', header: 'Lot Weight'},
      {id:35, field: 'emplassementLot', header: 'Lot Location'},
      {id:36, field: 'lieuxPrelevement', header: 'Places Prelevement'},
      {id:37, field: 'matCamion', header: 'Truck Mat'},
      {id:38, field: 'conformite', header: 'Conformite'},

    ];
    this.selectedColumns = this.cols;


    this. getAllCommandes() ;

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'reference', header: 'reference' },
      { field: 'description', header: 'description' },
      { field: 'dateCreation', header: 'dateCreation' },
      { field: 'nom', header: 'nom' },
      { field: 'emplacement', header: 'emplacement' },
      { field: 'etat', header: 'etat' },
      { field: 'dateFermeture', header: 'dateFermeture' },
    ];



  }

  openNew() {

    this.router.navigate(['/ajouterCommande']);
  }

  deleteSelectedAnalysesPhysiques() {

    this.deleteProductsDialog = true;

  }

  editCommande(commande: Commande) {
    this.router.navigate([`/updateCommande/${commande.id}`]);
    this.isUpdateCommande=true;
    this.commande = { ...commande };
    console.error(commande.datestart)
    this.updateCommande = { ...commande };
  }

  deleteCommande(commande: Commande) {
    this.deleteProductDialog = true;
    this.commande = { ...commande };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedCommandes.length)
    this.selectedCommandes.forEach(selectedCommandes => {
      this.commandeService.deleteCommande(selectedCommandes.id).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });

          this.getAllCommandes();
          if(this.commande.stockOrder)
            this.calculVolumeAvailble(this.commande.stockOrder);
        },
        (error) => {
        }
      );
    });

  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.commandes = this.commandes.filter(val => val.id !== this.commande.id);
    if (this.commande.id!= null) {
      this.commandeService.deleteCommande(this.commande.id).subscribe(() => {
        console.log("Command Deleted")
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Command Deleted', life: 3000 });
        this.getAllCommandes();
        if(this.commande.stockOrder)
        this.calculVolumeAvailble(this.commande.stockOrder);
      });
    }

  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAllCommandes() {
    this.loading=true ;

    this.commandeService.getAllCommande().subscribe((ListCommande:  Commande[]) => {
      this.commandes=ListCommande;
     this.commandesCopy=[... this.commandes]

      this.loading=false ;
      this.getAllStockOrder();
      this.initiaTimeLine();
    }, error => {
      console.log(error)});
        }










  cancel() {
    this.visible=false;
  }
    protected readonly getToken = getToken;
  loading: boolean=false;

  // calculAvailableVolume(commande:Commande){
  //   let total:number=0;
  //   commande.ligneCommandes?.forEach(l => {
  //     if(l.quantiteTransfert)
  //     total+=parseFloat(l.quantiteTransfert+'');
  //   })
  //   if(commande.volume)
  //   return commande.volume-total
  //   else return total
  // }

  protected readonly events = events;


  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }



  initiaTimeLine() {
    let data: number[] = [];

    this.commandes.forEach(c => {
      if (c.dateCommande) {
        data.push(new Date(c.dateCommande + "").getFullYear());
      }
    });

    data.sort();

    const uniqueArr = data.filter((item, index) => data.indexOf(item) === index);
    // console.log(uniqueArr);

    this.itemsData = [];

    uniqueArr.forEach(value => {
      this.itemsData!.push({
        label: value.toString(),

        command: (event: MenuItemCommandEvent) => {
          this.filterCommandes(value);
        }
      });
    });

    // console.log(this.itemsData);
  }

  filterCommandes(value: number) {
    this.commandes = this.commandesCopy.filter(commande => new Date(commande.dateCommande + "").getFullYear() === value);
  }



  getAllStockOrder() {
    this.stockOrderService.getAllStockOrder()
      .subscribe((stockOrders: any[]) => {
        this.stockOrders = stockOrders.map(stockOrder => ({
          ...stockOrder,
          dateCreation: new Date(stockOrder.dateCreation)
        })).sort((a: StockOrder, b: StockOrder) => b.dateCreation.getTime() - a.dateCreation.getTime());
        this.stockSelected = this.stockOrders[0];
       this. filtreByStock( this.stockSelected );
      }, error => {
        console.log(error);
      });
  }



  filtreByStock(stockSelected: StockOrder) {
    this.commandes = this.commandesCopy.filter(commande => {

     // this.commandeService.getCommandesByStockOrderAndEtatContains(stockSelected.id,"Loading Completed").subscribe(value => {
     //   this.ListCommandes = value;
     //
     //   // this.CalculeTotalInput();
     // })

      return commande.stockOrder && commande.stockOrder.id === stockSelected.id;
    });
    this.calculVolumeAvailble(stockSelected);

  }


  calculVolumeAvailble(stockSelected: StockOrder) {
const total=this.getSumSalines(stockSelected)+stockSelected.volumeTerrain+stockSelected.volumePort+stockSelected.volumeQuai;
    this.VolumeAvailble= total
  }
  getSumSalines(stockOrder:StockOrder){

    return  stockOrder.salines.reduce((sum, saline) => sum+saline.volumeSaline,0)

  }
  CalculeTotalInput() {
    this.TotalHarv=0;
    this.TotalTrQu=0;
    this.TotalProd=0 ;
    this.ListCommandes.forEach(com => com.ligneCommandes &&  com.ligneCommandes.forEach(l =>{

      if(l.quantityRecolte)
        this.TotalHarv+=parseFloat(l.quantityRecolte+'');
      if(l.quantityProduction)
        this.TotalProd+=parseFloat(l.quantityProduction+'')
      if(l.quantiteTransfert)
        this.TotalTrQu+=parseFloat(l.quantiteTransfert+'');

    } ))
  }

  CalculeTotalVolume(commande:Commande):number {
    // this.TotalHarv=0;
    // this.TotalTrQu=0;
    // this.TotalProd=0 ;
    this.TotalVolume=0 ;
commande.ligneCommandes?.forEach(l => {
  if(l.quantiteTransfert)
    this.TotalVolume+=parseFloat(l.quantiteTransfert+'');

})
    return  this.TotalVolume;

    }
  sortStockOrdersByCreationDateDesc() {
    this.stockOrders.sort((a, b) => b.dateCreation.getTime() - a.dateCreation.getTime());
    alert(new JsonPipe().transform("after: "+this.stockOrders))
  }
}
