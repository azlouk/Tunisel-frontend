import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {CommonModule, DatePipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {PaginatorModule} from "primeng/paginator";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
import {Sbnl} from "../../Models/sbnl";
import {ProductService} from "../../Services/product.service";
import {SbnlService} from "../../Services/sbnl.service";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import {Tamis} from "../../Models/tamis";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {Bande} from "../../Models/bande";
import {BandeService} from "../../Services/bande.service";
import {AutoFocusModule} from "primeng/autofocus";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {error} from "@angular/compiler-cli/src/transformers/util";
import Swal from "sweetalert2";

@Component({
  selector: 'app-bande',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    NgIf,
    PaginatorModule,
    PasswordModule,
    RadioButtonModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    CalendarModule,
    InputTextModule,
    NgClass,
    OverlayPanelModule,
    DatePipe,
    CheckboxModule,
    CommonModule,
    ListboxModule,
    AutoFocusModule

  ],
  templateUrl: './bande.component.html',
  styleUrl: './bande.component.css'
})
export class BandeComponent {
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
  bandes: Bande[] = [];

  bande:Bande={};

  selectedBandes: Bande[] = [];
  selectedBande:Bande={}
  private isUpdatebande=false;
  sbnls: Sbnl[] = [];


  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  public  _selectedColumns: any[]=[];
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  constructor(private productService: ProductService, private messageService: MessageService,private sbnlService :SbnlService,private bandeService:BandeService) {}

  ngOnInit() {
    this.colsfiltre = [
      {id:0, field: 'reference', header: 'reference' ,hide:true},
      { id:1, field: 'dateAnalyse', header: 'Date Analyse' ,hide:false},
      {id:2,  field: 'temperature', header: 'Temperature ' ,hide:false},
      { id:3, field: 'vent', header: 'wind ' ,hide:false},
      { id:4, field: 'humidite', header: 'humidity' ,hide:false},
      {id:5,  field: 'densite', header: 'Densite ',hide:false },
      {id:6,  field: 'matiereEnSuspension', header: 'Suspended Matter',hide:false },
      { id:7, field: 'salinite', header: 'salinite ' ,hide:false},
      {id:8,  field: 'calcium', header: 'Calcium ' ,hide:false},
      { id:9, field: 'magnesium', header: 'Magnesium ' ,hide:false},
      { id:10, field: 'sulfate', header: 'Sulfate ' ,hide:false},
      { id:11, field: 'matiereInsoluble', header: 'Insoluble matter',hide:false },
      { id:12, field: 'potassium', header: 'Potassium ' ,hide:false},
      { id:13, field: 'sodium', header: 'Sodium ' ,hide:false},
      {id:14,  field: 'chlorure', header: 'Chlorure ' ,hide:false},
      { id:15, field: 'ph', header: 'pH' ,hide:false},
      { id:16, field: 'chlorureDeSodium', header: 'sodium chloride ' ,hide:false},
      {id:17,  field: 'ferrocyanure', header: 'Ferrocyanure ' ,hide:false},
    ];

    this._selectedColumns = this.colsfiltre;
    this.getBande()
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
    this.bande;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedBandes() {

    this.deleteProductsDialog = true;

  }

  editBande(bande: Bande) {
    this.isUpdatebande=true;


    this.bande = { ...bande };
    this.productDialog = true;
  }

  deleteBande() {
    this.deleteProductDialog = true;


  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedBandes.length)
    this.selectedBandes.forEach(selectedBande => {
      this.bandeService.deleteBande(selectedBande.id).subscribe(
        () => {
          this.bandes = this.bandes.filter(bande =>bande.id !== selectedBande.id);
        },
        (error) => {
          console.error('Error deleting bande:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'réussi', detail: 'Bande Supprimer', life: 3000 });
    this.selectedBandes = [];
  }

  confirmDelete(bande :Bande) {
    this.deleteProductDialog = false;

    if (bande.id!= null) {
      this.bandeService.deleteBande(bande.id).subscribe(() => { this.bandes = this.bandes.filter(val => val.id !== bande.id);
        console.log("bande deleted")
        this.messageService.add({ severity: 'success', summary: 'réussi', detail: 'Bande Supprimer', life: 3000 });

      },error1 => {
        Swal.fire({title:"Erreur",icon:"error", text:"SVP   supprimer stock laver puis tout  les analyses (Chimique et granulométrique) "})
      });
    }

  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveBande() {
    this.submitted = false;
    this.productDialog=false

    if(this.isUpdatebande==true) {
      this.bandeService.updateBande(this.bande).subscribe(() =>{
        this.getBande();
      });
      console.log('Bande updated');
      this.isUpdatebande=false;
    }
    else
    {
      this.bandeService.addBande(this.bande).subscribe(() => {this.getBande();});


    }
  }




  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getBande() {
    this.bandeService.getAllBandes().subscribe((v:  Bande[]) => {
      this.bandes=v;

    },error => {
      console.log(error)})
    this.sbnlService.getAllSbnls()
      .subscribe((sbnls: Sbnl[]) => {
        this.sbnls = sbnls;
      }, error => {
        console.log('Error fetching users:', error);
      });
  }

  exportrapport(bande: Bande) {
console.log('=====>>>>> export: ',new JsonPipe().transform(bande))
    this.selectedBande = bande;
    this.visiblePrint = true
    console.log("---->"+new JsonPipe().transform(this.selectedBande));
  }


  filtredate() {
    this.Viderfiltredate()
    const data=this.selectedBande.analysesChimiques !== undefined ? this.selectedBande.analysesChimiques : []
    const newAnalyse:AnalysesChimique[] =[]
    data.forEach(v => {
      if(v.dateAnalyse!==undefined){
        console.log(typeof v.dateAnalyse )
        const d=v.dateAnalyse+"";
        const dateana:Date=new Date(d)
        console.log("-D-->" + dateana)
        if (  this.AfterTodate(this.DatefiltrageStart,dateana) &&  this.AfterTodate(dateana,this.DatefiltrageEnd)) {
          newAnalyse.push(v);
        } else {
          console.log("no compare")
        }
      }
    })
    this.selectedBande.analysesChimiques=[...newAnalyse] ;

  }

  clear(dt1: Table) {
    dt1.clear() ;
  }

  Viderfiltredate() {

    this.bandeService.getAllBandes().subscribe((bande: Bande[]) => {
      this.bandes = bande;

      const bandeBande: Bande | undefined = this.bandes.find(value => this.selectedBande.id == value.id)
      if (bandeBande)
        this.selectedBande = bandeBande;

    });
  }

  getAnalyse() {

    return this.selectedBande.analysesChimiques !== undefined ? this.selectedBande.analysesChimiques : []
  }
  getAnalyseGranoli() {
    const data=this.selectedBande.analysesPhysiques !== undefined ? this.selectedBande.analysesPhysiques : []
    const newAnalyse:AnalysesPhysique[] =[]
    data.forEach(v => {
      if(v.dateAnalyse!==undefined){
        console.log(typeof v.dateAnalyse )
        const d=v.dateAnalyse+"";
        const dateana:Date=new Date(d)
        console.log("-D-->" + dateana)
        if (  this.AfterTodate(this.DatefiltrageStart,dateana) &&  this.AfterTodate(dateana,this.DatefiltrageEnd)) {
          newAnalyse.push(v);
          console.log('ffffffffffff: ',v)
        } else {
          console.log("no compare")
        }
      }
    })
    console.log('getAnalysePH: ',new JsonPipe().transform(newAnalyse))

    this.selectedBande.analysesPhysiques=[...newAnalyse] ;
    // console.log('getAnalysePH: ',new JsonPipe().transform(this.selectedBande.analysesPhysiques))
    return this.selectedBande.analysesPhysiques !== undefined ? this.selectedBande.analysesPhysiques : []
  }


  colsfiltre: any[] = [];
  // ListTamisSelected: Tamis={};
  SelectedBandePrintAnalyse: AnalysesPhysique={};
  getColsfiltr() {
    return this.colsfiltre.filter(value => value.hide==true)
  }



  public SavePDF(): void {

    if (this.htmlContent) {


      html2canvas(this.htmlContent.nativeElement, {scale: 1}).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // PDF width
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
        pdf.addImage(imgData, 'png', 2, 2, imgWidth, imgHeight);
        pdf.save('Print_' + Math.random() + '.pdf');
      });
    }
  }


  getTamisFiltred() {
    return this.SelectedBandePrintAnalyse.tamisList==undefined?[]:this.SelectedBandePrintAnalyse.tamisList
  }

  AfterTodate(date1:Date , date2:Date):boolean{
    console.log(date1+"<"+date2)
    return date1.getDay()<=date2.getDay() && date1.getMonth()<=date2.getMonth() && date1.getFullYear()<=date2.getFullYear()
  }
}
