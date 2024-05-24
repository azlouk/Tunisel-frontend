import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf, NgIf} from "@angular/common";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import {Router} from "@angular/router";
import {ProductService} from "../../Services/product.service";
import {Commande} from "../../Models/commande";
import {CommandeService} from "../../Services/commande.service";
import {FormsModule} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {Puit} from "../../Models/puit";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {RippleModule} from "primeng/ripple";
import {Column} from "jspdf-autotable";
import {AutoFocusModule} from "primeng/autofocus";
import {ListboxModule} from "primeng/listbox";

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
    ListboxModule
  ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit{


  public  TotalHarv=0;
  public TotalTrQu=0;
  public TotalProd=0;
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};


  submitted: boolean = false;

  cols: any[] = [];


  rowsPerPageOptions = [5, 10, 20];
  // ======********============

  comanndes:Commande[] = [];

  commande:Commande={};
 updateCommande:Commande={};
  selectedCommandes:Commande[] = [];
isUpdateCommande:boolean=false;
  visible: boolean=false;
   commandeDetails!: Commande;
  selectedColumns!: Column[];

  constructor(private router: Router,private productService: ProductService, private messageService: MessageService,private commandeService :CommandeService) {}

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
          this.comanndes = this.comanndes.filter(commande =>commande.id !== selectedCommandes.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    this.selectedCommandes = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.comanndes = this.comanndes.filter(val => val.id !== this.commande.id);
    if (this.commande.id!= null) {
      this.commandeService.deleteCommande(this.commande.id).subscribe(() => console.log("Command Deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Command Deleted', life: 3000 });
    this.commande ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAllCommandes() {
    this.commandeService.getAllCommande().subscribe((ListCommande:  Commande[]) => {
      this.comanndes=ListCommande;}, error => {
      console.log(error)});
        }


  showDialogDetails(command :Commande) {
    this.visible=true;
    this.selectedCommandPrint=command;
  }

  // ---------------export details provider to PDF file ---------------
  savePdfDetails() {
    const data = document.getElementById('commandepdf');

    if (data){
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('supplier-details.pdf');
      });
    }
  }
  selectedCommandPrint: Commande = {}
  getValueOfligneCommande(col: any, ligneCommande: any): any {
    if (col.id < 20) {
      return ligneCommande.analyseChimique!==null ? ligneCommande.analyseChimique[col.field] : '-';
    } else if (col.id > 19 && col.id < 22) {
      return ligneCommande.analysePhysique!==null  ? ligneCommande.analysePhysique[col.field] : '-';
    }

    //************************************
    else if (col.id > 21 && col.id < 27 ) {
      if (ligneCommande.analysePhysique !== null && ligneCommande.analysePhysique.tamisList) {
        // Use filter to find matching items in tamisList and add checks for undefined items
        const filteredTamis:any = ligneCommande.analysePhysique.tamisList[0];


        // Check if filteredTamisList is not empty and return it, otherwise return '-'
        return filteredTamis!==undefined? filteredTamis[col.field]  : '-';
      } else {
        return '-';
      }
    }
    //************************************

    else {
      return ligneCommande!==null  ? ligneCommande[col.field] : '-';
    }
  }

  CalculeTotal() {

    if(this.selectedCommandPrint.ligneCommandes){
    // @ts-ignore
      this.selectedCommandPrint.ligneCommandes.forEach(value => {
      if(value.quantityRecolte)
        this.TotalHarv+=parseFloat(value.quantityRecolte+'');
      if(value.quantityProduction)
        this.TotalProd+=parseFloat(value.quantityProduction+'')
      if(value.quantiteTransfert)
        this.TotalTrQu+=parseFloat(value.quantiteTransfert+'');

    })
  }
  }

  cancel() {
    this.visible=false;
  }
}
