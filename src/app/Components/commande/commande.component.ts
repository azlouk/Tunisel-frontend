import {Component,  OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {DatePipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
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
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {RippleModule} from "primeng/ripple";
import {AutoFocusModule} from "primeng/autofocus";
import {ListboxModule} from "primeng/listbox";
import {InputNumberModule} from "primeng/inputnumber";
import {TimelineModule} from "primeng/timeline";
import * as events from "events";
import {StepsModule} from "primeng/steps";
import {StockOrder} from "../../Models/stock-order";
import {StockOrderService} from "../../Services/stock-order.service";
import {LineCommande} from "../../Models/lineCommande";
import {AutoCompleteModule} from "primeng/autocomplete";
import {BadgeModule} from "primeng/badge";
import {FloatLabelModule} from "primeng/floatlabel";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import {TamisService} from "../../Services/tamis.service";


export interface Column {
  id:number;
  field: string;
  header: string;
}
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
    StepsModule,
    NgClass,
    AutoCompleteModule,
    BadgeModule,
    FloatLabelModule
  ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})


export class CommandeComponent implements OnInit{

  itemsData: MenuItem[] | undefined;

  datenow!:any ;

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

  commande:Commande={};
 updateCommande:Commande={};
  selectedCommandes:Commande[] = [];
isUpdateCommande:boolean=false;
  visible: boolean=false;
  selectedColumns: Column[]=[];
commandesCopy: Commande[]=[];
  stockOrders: StockOrder[] = [];
  stockSelected: StockOrder=new StockOrder();

  TotalHarv: number=0;
  TotalProd: number=0;
  TotalTrQu: number=0;
  TotalVolume: number=0;
  VolumeAvailble: number=0;
  referenceDialoge:boolean=false;
  visibleCommande: boolean=false;
  listcalibre:Column[]=[];
  constructor(private router: Router,
              private messageService: MessageService,
              private commandeService :CommandeService,
              private stockOrderService:StockOrderService,
              private tamisService:TamisService) {}

  ngOnInit() {
    this.datenow=new Date() ;

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



   this.getAllStockOrder();

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

    this.commandeService.getAllCommandeDTO().subscribe((ListCommande:  Commande[]) => {
      this.commandes=ListCommande;
    this.commandesCopy=[... this.commandes]

      this.initiaTimeLine();


      this.loading=false ;

    }, error => {
      console.log(error)});
        }
  getAllStockOrder() {
    this.stockOrderService.getAllStockOrder()
      .subscribe((stockOrders: any[]) => {
        this.initiaTimeLine();

        this.stockOrders = stockOrders.map(stockOrder => ({

          ...stockOrder,
          dateCreation: new Date(stockOrder.dateCreation)

        })).sort((a: StockOrder, b: StockOrder) => b.dateCreation.getTime() - a.dateCreation.getTime());
        this.stockSelected = this.stockOrders[0];
        this. filtreByStock( this.stockSelected );
        this.getAllCommandes()
      }, error => {
        console.log(error);
      });
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

    const TotalSaline= stockOrder.salines.reduce((sum, saline) => sum+saline.volumeSaline,0)
    const TotalTransferFromSaline=stockOrder.listHistory.filter(lh=>lh.startingPoint=='Saline volume').reduce((sum, history) => sum+history.transferQuantity,0)
    const TotalTransferToSaline=stockOrder.listHistory.filter(lh=>lh.arrivingPoint=='Saline volume').reduce((sum, history) => sum+history.transferQuantity,0)

    return  (TotalSaline-TotalTransferFromSaline) +TotalTransferToSaline;
  }

  CalculeTotalVolume(commande:Commande):number {

    this.TotalVolume=0 ;
commande.ligneCommandes?.forEach(l => {
  if(l.quantiteTransfert)
    this.TotalVolume+=parseFloat(l.quantiteTransfert+'');

})
    return  this.TotalVolume;

    }


  public verifyState(commande: Commande) {

    if(commande.etat && commande.etat.replace(" ","").toLowerCase()=='loadingcompleted'){
      return true;
    }else return false;

  }
  listeLignesCommandes:LineCommande[]=[]
  public OpenReferenceDialoge(commande: Commande) {
    this.commande=commande
    if (this.commande.calibre!=undefined)

    this.getCalibre();
    this.selectedColumns=commande.dataHeaders || [];
let liste= commande.ligneCommandes?.filter(lc => {
      if (lc.analysePhysique != null) {
        return lc.analysePhysique.reference === commande.analyseReference;
      } else if (lc.analyseChimique != null) {
        return lc.analyseChimique.reference === commande.analyseReference;
      }
      return false;


    });
if (liste!=undefined){
  this.listeLignesCommandes=liste
  this.commande.ligneCommandes=liste;
}

    this.referenceDialoge = true;
  }
  selectedColumnsCalibre!: any;
  public selectedProduct: any;
  getValueOfligneCommande(col: any, ligneCommande: any): any {

    if (col.id < 21) {
      if(col.id==0) {
        return ligneCommande?.analyseChimique !== null ? this.pipedate(ligneCommande?.analyseChimique[col.field]) :
          ligneCommande?.analysePhysique !== null && ligneCommande?.analysePhysique !== undefined ? this.pipedate(ligneCommande?.analysePhysique[col.field]) : '-';

      }
      if(ligneCommande.analyseChimique==null && ligneCommande.analysePhysique!==null && col.field=="reference"){
        return  ligneCommande.analysePhysique[col.field]
      }
      return ligneCommande.analyseChimique!==null ? ligneCommande.analyseChimique[col.field] :"-" ;
    }
    else
    if (col.id > 20 && col.id < 24)
    {
      if(col.id==22){
        return ligneCommande?.analysePhysique?.qualite !== null ? ligneCommande?.analysePhysique?.qualite :
          ligneCommande?.analyseChimique?.qualite !== null ? ligneCommande?.analyseChimique?.qualite : '-';


      }
      return ligneCommande.analysePhysique!==null  ? ligneCommande.analysePhysique[col.field] : '-';
    } else
    if (col.id > 23 && col.id < 29 && this.selectedColumnsCalibre && this.selectedColumnsCalibre.header) {
      if (ligneCommande.analysePhysique !== null && ligneCommande.analysePhysique.tamisList) {
        // Use filter to find matching items in tamisList and add checks for undefined items
        const filteredTamis:any = ligneCommande.analysePhysique.tamisList.find((tamis: any) =>
          tamis && tamis.calibre == this.selectedColumnsCalibre.header
        );
        // Check if filteredTamisList is not empty and return it, otherwise return '-'
        return filteredTamis!==undefined? filteredTamis[col.field]  : '-';
      } else {
        return '-';
      }
    }

    else if(col.id==42){
      // return ligneCommande.analysePhysique!==null  ? ligneCommande.analysePhysique[col.field] : '-';
      return ligneCommande.related!==null  ? this.getRelatedAnalyse(ligneCommande) : '-';

    }
    else {
      // ligneCommande.dateCreation=new Date();

      return ligneCommande!==null  ? ligneCommande[col.field] : '-';
    }


  }
  pipedate(analyseChimiqueElement: any) {
    const date:Date=new Date(analyseChimiqueElement+"");
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;

  }
  getRelatedAnalyse(lineCommande:LineCommande): string {
    let related: string = '';


    const sbnl = this.commande.sbnls?.find(sbnl => sbnl.analysesChimiques!.find(analyse => analyse.id == lineCommande.analyseChimique?.id) !== undefined || sbnl.analysesPhysiques!.find(analyseph => analyseph.id == lineCommande.analysePhysique?.id) !== undefined)
    if (sbnl !== undefined && sbnl.reference !== undefined) {
      related = sbnl.reference;
    }


    const bassin = this.commande.bassins?.find(bassin => bassin.analysesChimiques!.find(analyse => analyse.id == lineCommande.analyseChimique?.id) !== undefined || bassin.analysesPhysiques!.find(analyseph => analyseph.id == lineCommande.analysePhysique?.id) !== undefined)
    if (bassin !== undefined && bassin.nom !== undefined) {
      related = bassin.nom;
    }


    const sbl = this.commande.sbls?.find(sbl => sbl.analysesChimiques!.find(analyse => analyse.id == lineCommande.analyseChimique?.id) !== undefined || sbl.analysesPhysiques!.find(analyseph => analyseph.id == lineCommande.analysePhysique?.id) !== undefined)
    if (sbl !== undefined && sbl.reference !== undefined) {
      related = sbl.reference;
    }

    const sblf = this.commande.sblfs?.find(sblf => sblf.analysesChimiques!.find(analyse => analyse.id == lineCommande.analyseChimique?.id) !== undefined || sblf.analysesPhysiques!.find(analyseph => analyseph.id == lineCommande.analysePhysique?.id) !== undefined)
    if (sblf !== undefined && sblf.reference !== undefined) {
      related = sblf.reference;
    }

    const bande = this.commande.bandes?.find(bande => bande.analysesChimiques!.find(analyse => analyse.id == lineCommande.analyseChimique?.id) !== undefined || bande.analysesPhysiques!.find(analyseph => analyseph.id == lineCommande.analysePhysique?.id) !== undefined)
    if (bande !== undefined && bande.reference !== undefined) {
      related = bande.reference;
    }

    return related;

  }



  headerCopy!:string;

  CountClick:number=0;
  public SavePDF(): void {
    let headerPage = document.getElementById("headerpages");


    if (this.commande.ligneCommandes) {
      this.visibleCommande = true;

      setTimeout(() => {

        if(this.CountClick==0)
        {

          // @ts-ignore
          this.headerCopy=document.getElementById("headerpages").innerHTML.toString()+"";


        }

        let header: string[] = [];
        let data: any[] = [];

        let sizeimageA4 = 1;
        this.selectedColumns.forEach(value => {
          header.push(value.header);
        });
        this.listeLignesCommandes.forEach(l => {
          let ligne: any[] = [];
          this.selectedColumns.forEach(col => {
            ligne.push(this.getValueOfligneCommande(col, l));
          });
          data.push(ligne);
        });

        let orientation: string = "p";
        let format = "a4";
        if (this.selectedColumns.length > 11) {
          orientation = "l";
          if (this.selectedColumns.length < 10) {
            format = "a4";
            sizeimageA4 = 1;
          } else if (this.selectedColumns.length > 10 && this.selectedColumns.length < 16) {
            format = "a2";
            sizeimageA4 = 3;
          } else if (this.selectedColumns.length > 16) {
            format = "a1";
            sizeimageA4 = 4;
          }
        }


        const doc = new jsPDF("l", "mm", format);
        let headerPage = document.getElementById("headerpages");

        if (headerPage) {
          if(this.CountClick!=0)
            headerPage.innerHTML=this.headerCopy ;
          headerPage.innerHTML +=
            '<!--      infoPropreTableCommande--> ' +
            '      <div class="flex me-3 mt-5 p-2 gap-1 text-3xl flex justify-content-evenly">' +
            '        <br><br>' +
            '        <label class="text-2xl font-bold">Command Date :</label><span class="ml-2 text-2xl">' + this.commande.dateCommande + '</span>' +
            '        <label class="text-2xl font-bold">Name :</label><span class="ml-2 text-2xl">' + this.commande.nom + '</span>' +
            '        <label class="text-2xl font-bold">Status :</label><span class="ml-2 text-2xl">' + this.commande.etat + ' </span>' +
            '      </div>' +
            '      <div class="flex p-2 gap-1 text-3xl flex justify-content-evenly">' +
            // Commented out section
            // '        <label class="text-2xl font-bold">Creation Date Pond : </label><span class="ml-2 text-2xl">' + this.commande.bassin?.dateCreation + '</span>' +
            // '        <label class="text-2xl font-bold">Reference :</label><span class="ml-2 text-2xl">' + this.commande.bassin?.reference + '</span>' +
            // '        <label class="text-2xl font-bold">Description :</label><span class="ml-2 text-2xl">' + this.commande.bassin?.description + '</span>' +
            // '        <label class="text-2xl font-bold">Name :</label><span class="ml-2 text-2xl">' + this.commande.bassin?.nom + '</span>' +
            // '        <label class="text-2xl font-bold">Location :</label><span class="ml-2 text-2xl">' + this.commande.bassin?.emplacement + ' </span>' +
            // '        <label class="text-2xl font-bold">Status :</label><span class="ml-2 text-2xl">' + this.commande.bassin?.etat + ' </span>' +
            '      </div>' +
            '<div class="flex justify-content-start">' +
            '  <div class="flex flex-column gap-3 border-1 border-round border-gray-400 p-3">' +
            '    <div class="flex align-items-start gap-3 justify-content-between">' +
            '      <label class="font-bold">Total Harvest in(T) : </label>' +
            '      <label class="font-bold text-center">' + this.TotalHarv + '</label>' +
            '    </div>' +
            '    <div class="flex align-items-center gap-3 justify-content-between ">' +
            '      <label class="font-bold">Total Production in(T) :</label>' +
            '      <label class="font-bold text-center">' + this.TotalProd + '</label>' +
            '    </div>' +
            '    <div class="flex align-items-center gap-3 justify-content-between ">' +
            '      <label class="font-bold">Total Transfer Quantity :</label>' +
            '      <label class="font-bold text-center">' + this.TotalTrQu + '</label>' +
            '    </div>' +
            '  </div>' +
            '</div> <br> <br>' +
            '      <div class="flex justify-content-between">\n' +
            '        <div class="flex justify-content-end">\n' +
            '          <div class="flex flex gap-5 border-1 border-round border-gray-400 p-3">\n' +
            '              <label class="font-bold mr-4">TUNISEL average analysis: </label>\n ' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold ">% Cum Pass: </label>\n' +
            '              <label class="font-bold text-center">' + this.calculerMoyennes().passCumulated.toFixed(3) + '</label>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold">%H₂O: </label>\n' +
            '              <label class="font-bold text-center">' + this.calculerMoyennes().humidite.toFixed(3) + '</label>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold">%Mg: </label>\n' +
            '              <label class="font-bold text-center">' + this.calculerMoyennes().magnesium.toFixed(3) + '</label>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold">%SO₄: </label>\n' +
            '              <label class="font-bold text-center">' + this.calculerMoyennes().sulfate.toFixed(3) + '</label>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold">%NaCL: </label>\n' +
            '              <label class="font-bold text-center">' + this.calculerMoyennes().chlorureDeSodium.toFixed(3) + '</label>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold">%MI: </label>\n' +
            '              <label class="font-bold text-center">' + this.calculerMoyennes().matiereInsoluble.toFixed(3) + '</label>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold">Fe(CN)₆: </label>\n' +
            '              <label class="font-bold text-center">' + this.calculerMoyennes().ferrocyanure.toFixed(3) + '</label>\n' +
            '            </div>\n' +
            '          </div>\n' +
            '<div class="gap-3 border-1 border-round border-gray-400 p-3 ml-3"> ' +
            '<div class="flex align-items-center ">\n' +
            '              <label class="font-bold mr-4">Customer analysis: </label>\n <br>' +
            '              <label class="font-bold">Date :' + this.commande.dateCustomer + '</label>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <p-floatLabel>\n' +
            '                <label class="font-bold">H₂O : ' + this.commande.h2o + '</label>\n' +
            '              </p-floatLabel>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <p-floatLabel>\n' +
            '                <label class="font-bold">Mg : ' + this.commande.mg + '</label>\n' +
            '              </p-floatLabel>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <p-floatLabel>\n' +
            '                <label class="font-bold">SO₄ : ' + this.commande.so4 + '</label>\n' +
            '              </p-floatLabel>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <p-floatLabel>\n' +
            '                <label class="font-bold">NaCL : ' + this.commande.nacl + '</label>\n' +
            '              </p-floatLabel>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <p-floatLabel>\n' +
            '                <label class="font-bold">MI :' + this.commande.mi + '</label>\n' +
            '              </p-floatLabel>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <p-floatLabel>\n' +
            '                <label class="font-bold">Fe(CN)₆ :' + this.commande.fecn6 + '</label>\n' +
            '              </p-floatLabel>\n' +
            '            </div>\n' +
            '            </div>\n' +
            '            </div>' +
            '</div>';
        }

        if (headerPage)
          html2canvas(headerPage, { scale: 1 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // PDF width
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
            doc.addImage(imgData, 'png', 2, 2, imgWidth * sizeimageA4, imgHeight * sizeimageA4);
            autoTable(doc, { startY: imgHeight + (60 * sizeimageA4) });

            autoTable(doc, {
              head: [header],
              body: data,
            });
            doc.save('Print_' + Math.random().toFixed(4) + '.pdf');
          });

        this.visibleCommande = false;
        this.CountClick++;
      }, this.commande.ligneCommandes!.length * 100);
    } else {
      Swal.fire({ title: "Error", text: "No data found to print", icon: "error" });
    }

  }
  calculerMoyennes():
    { passCumulated: number,humidite: number,magnesium: number,sulfate: number,chlorureDeSodium: number, matiereInsoluble: number, ferrocyanure: number } {

    let totalHumidite = 0;

    let totalMagnesium = 0;
    let totalSulfate = 0;
    let totalMatiereInsoluble = 0;

    let totalchlorureDeSodium = 0;

    let totalferrocyanure = 0;
    let totalPassCum:number = 0;




    let countPassCum = 0;
    let countHumidite = 0;
    let countMagnesium = 0;
    let countSulfate = 0;
    let countMatiereInsoluble = 0;
    let countchlorureDeSodium = 0;
    let countferrocyanure = 0;


    this.listeLignesCommandes.forEach((lineCommande) => {

      // if (lineCommande.analysePhysique) {
      //
      //   if (lineCommande.analysePhysique.tamisList !== undefined) {
      //     lineCommande.analysePhysique.tamisList.forEach(value => {
      //       if(value.passCumulated)
      //       { totalPassCum += Number(value.passCumulated);
      //         countPassCum++;}
      //
      //     })
      //   }
      //
      //   }

      if (lineCommande.analysePhysique) {
        if (lineCommande.analysePhysique.tamisList !== undefined ) {
          lineCommande.analysePhysique.tamisList.forEach(value => {

            if (this.selectedColumnsCalibre!==undefined && value.passCumulated !== undefined && value.passCumulated !== null && value.calibre==parseFloat(this.selectedColumnsCalibre.header)) {
              // Convertir la valeur en chaîne pour s'assurer que 'match' peut être utilisé
              let passCumulatedString = value.passCumulated;

              // Utiliser une expression régulière pour extraire la partie numérique de la chaîne
              let passCumulatedValue = passCumulatedString

              // Si une partie numérique est trouvée, elle est convertie en nombre
              if (passCumulatedValue) {
                // console.log('passCumulatedNumber: '+ passCumulatedValue)

                // let passCumulatedNumber = Number(passCumulatedValue[0]);

                // Vérifier si le nombre est supérieur à 0

                totalPassCum += passCumulatedValue;
                countPassCum++;
                // console.log('countPassCum: '+countPassCum)
                // console.log('totalPassCum: '+totalPassCum)

              }
            }
          });
        }
      }

      //console.log('liste de ligne commande'+new JsonPipe().transform(lineCommande))

      if (lineCommande.analyseChimique) {

        if (lineCommande.analyseChimique.humidite !== undefined &&  lineCommande.analyseChimique.humidite !== null) {

          if (lineCommande.analyseChimique.humidite !== undefined &&  lineCommande.analyseChimique.humidite !== null) {
            const humidite:number[]=this.extractDoublesFromString(lineCommande.analyseChimique.humidite);
            // Si une partie numérique est trouvée, elle est convertie en nombre
            if (humidite.length!=0) {
              totalHumidite += humidite[0];
              countHumidite++;

            }
          }

        }

        if (lineCommande.analyseChimique.magnesium !== undefined &&  lineCommande.analyseChimique.magnesium !== null) {
          const magnes:number[]=this.extractDoublesFromString(lineCommande.analyseChimique.magnesium);
          // Si une partie numérique est trouvée, elle est convertie en nombre
          if (magnes.length!=0) {
            totalMagnesium += magnes[0];
            countMagnesium++;

          }
        }

        if (lineCommande.analyseChimique.sulfate !== undefined &&    lineCommande.analyseChimique.sulfate !== null) {

          if (lineCommande.analyseChimique.sulfate !== undefined &&  lineCommande.analyseChimique.sulfate !== null) {
            const sulfate:number[]=this.extractDoublesFromString(lineCommande.analyseChimique.sulfate);
            // Si une partie numérique est trouvée, elle est convertie en nombre
            if (sulfate.length!=0) {
              totalSulfate += sulfate[0];
              countSulfate++;

            }
          }

        }

        if (lineCommande.analyseChimique.chlorureDeSodium !== undefined &&   lineCommande.analyseChimique.chlorureDeSodium !== null) {

          if (lineCommande.analyseChimique.chlorureDeSodium !== undefined &&  lineCommande.analyseChimique.chlorureDeSodium !== null) {
            const chlorureDeSodium:number[]=this.extractDoublesFromString(lineCommande.analyseChimique.chlorureDeSodium);
            // Si une partie numérique est trouvée, elle est convertie en nombre
            if (chlorureDeSodium.length!=0) {
              totalchlorureDeSodium += chlorureDeSodium[0];
              countchlorureDeSodium++;

            }
          }

        }

        if (lineCommande.analyseChimique.matiereInsoluble !== undefined &&  lineCommande.analyseChimique.matiereInsoluble !== null) {

          if (lineCommande.analyseChimique.matiereInsoluble !== undefined && lineCommande.analyseChimique.matiereInsoluble !== null) {
            const matiereInsoluble: number[] = this.extractDoublesFromString(lineCommande.analyseChimique.matiereInsoluble);
            // Si une partie numérique est trouvée, elle est convertie en nombre
            if (matiereInsoluble.length != 0) {
              totalMatiereInsoluble += matiereInsoluble[0];
              countMatiereInsoluble++;

            }
          }

        }

        if (lineCommande.analyseChimique.ferrocyanure !== undefined &&   lineCommande.analyseChimique.ferrocyanure !== null) {
          if (lineCommande.analyseChimique.ferrocyanure !== undefined &&  lineCommande.analyseChimique.ferrocyanure !== null) {
            const ferrocyanure:number[]=this.extractDoublesFromString(lineCommande.analyseChimique.ferrocyanure);
            // Si une partie numérique est trouvée, elle est convertie en nombre
            if (ferrocyanure.length!=0) {
              totalferrocyanure += ferrocyanure[0];
              countferrocyanure++;

            }

          }
        }

      }
    });

    return {


      passCumulated: countPassCum > 0 ? totalPassCum / countPassCum : 0,
      humidite: countHumidite > 0 ? totalHumidite / countHumidite : 0,
      magnesium: countMagnesium > 0 ? totalMagnesium / countMagnesium : 0,

      sulfate: countSulfate > 0 ? totalSulfate / countSulfate : 0,
      chlorureDeSodium: countchlorureDeSodium > 0 ? totalchlorureDeSodium / countchlorureDeSodium : 0,
      ferrocyanure: countferrocyanure > 0 ? totalferrocyanure / countferrocyanure : 0,
      matiereInsoluble: countMatiereInsoluble > 0 ? totalMatiereInsoluble / countMatiereInsoluble : 0,

    };
  }
  extractDoublesFromString(input: string): number[] {
    const regex = /-?\d+(\.\d+)?/g;
    const matches = input.match(regex);
    if (matches) {
      return matches.map(match => parseFloat(match));
    } else {
      return [];
    }
  }
  caliber(selectedColumnsCalibre: any) {
    this.selectedColumnsCalibre=selectedColumnsCalibre ;
  }
  getCalibre() {

    this.tamisService.getDistinctCalibres().subscribe(value => {

      value.forEach((value1: number) => {
        if(this.listcalibre.length<value.length){
          this.listcalibre.push({ id: value1, field: '', header: value1.toString() });}
        // if(this.isUpdateCommande){
          if(value1.toString()==this.commande.calibre){
            this.selectedColumnsCalibre={ id: value1, field: '', header: value1.toString() }

          }
        // }
      });

    });
  }





}
