import {Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DatePipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
import {ProductService} from "../../Services/product.service";
import {Puit} from "../../Models/puit";
import {PuitService} from "../../Services/puit.service";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import Swal from "sweetalert2";
import  jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {MultiSelectModule} from "primeng/multiselect";
import {CheckboxModule} from "primeng/checkbox";
import {AutoFocusModule} from "primeng/autofocus";
import {LoginService} from "../../Services/login.service";

@Component({
  selector: 'app-puit',
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
    NgClass,
    InputTextModule,
    CalendarModule,
    DatePipe,
    MultiSelectModule,
    NgForOf,
    CheckboxModule,
    AutoFocusModule
  ],
  templateUrl: './puit.component.html',
  styleUrl: './puit.component.css'

})
export class PuitComponent implements OnInit {
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  colsfiltre: any[] = [];
   cols:any[]=[]
  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============
  puits: Puit[] = [];

  puit: Puit = {};

  selectedPuits: Puit[] = [];

  private isUpdateUser = false;
  loading: boolean = false;
  ReportedBy:any={}

  public  _selectedColumns: any[]=[];
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.colsfiltre.filter((col) => val.includes(col));
  }


  constructor(private Loginservice:LoginService,private productService: ProductService, private messageService: MessageService, private puitService: PuitService) {
  }

  ngOnInit() {

this.ReportedBy=this.Loginservice.getToken()
    this.colsfiltre = [
      {id:0, field: 'reference', header: 'reference' ,hide:true},
      { id:1, field: 'dateAnalyse', header: 'Date Analyse' ,hide:false},
      {id:2,  field: 'temperature', header: 'Temperature ' ,hide:false},
      { id:3, field: 'vent', header: 'wind ' ,hide:false},
      { id:4, field: 'humidite', header: 'humidity' ,hide:false},
      {id:5,  field: 'densite', header: 'Densite ',hide:false },
      {id:6,  field: 'matiereEnSuspension', header: 'Suspended Matter ',hide:false },
      { id:7, field: 'salimite', header: 'Salimite ' ,hide:false},
      {id:8,  field: 'calcium', header: 'Calcium ' ,hide:false},
      { id:9, field: 'magnesium', header: 'Magnesium ' ,hide:false},
      { id:10, field: 'sulfate', header: 'Sulfate ' ,hide:false},
      { id:11, field: 'matiereInsoluble', header: 'Insoluble matter ',hide:false },
      { id:12, field: 'potassium', header: 'Potassium ' ,hide:false},
      { id:13, field: 'sodium', header: 'Sodium ' ,hide:false},
      {id:14,  field: 'chlorure', header: 'Chlorure ' ,hide:false},
      { id:15, field: 'ph', header: 'pH' ,hide:false},
      { id:16, field: 'chlorureDeSodium', header: 'sodium chloride ' ,hide:false},
      {id:17,  field: 'ferrocyanure', header: 'Ferrocyanure ' ,hide:false},
    ];

    this._selectedColumns = this.colsfiltre;



    this.puit.dateCreation = new Date();
    this.loading = true;
    this.puitService.getAllPuits().subscribe((v: Puit[]) => {
      this.puits = v;
      this.loading = false;


    }, error => {
      console.log(error)
    })

    this.cols = [
      {field: 'id', header: 'id'},
      {field: 'reference', header: 'reference'},
      {field: 'description', header: 'description'},
      {field: 'dateCreation', header: 'dateCreation'},
      {field: 'nom', header: 'nom'},
      {field: 'emplacement', header: 'emplacement'},
      {field: 'etat', header: 'etat'},
      {field: 'dateFermeture', header: 'dateFermeture'},
    ];


  }

  openNew() {
    this.puit = {};
    this.puit.reference = "puit-" + this.createId()
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedPuits() {

    this.deleteProductsDialog = true;

  }

  editPuit(puit: Puit) {
    this.isUpdateUser = true;


    this.puit = {...puit};
    this.productDialog = true;
  }

  deletePuit(puit: Puit) {
    this.deleteProductDialog = true;

    this.puit = {...puit};
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.selectedPuits.forEach(selectedPuit => {
      this.puitService.deletePuit(selectedPuit.id).subscribe(
        () => {
          this.puits = this.puits.filter(puit => puit.id !== selectedPuit.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Puit est bien ajouté', life: 3000});
    this.selectedPuits = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.puits = this.puits.filter(val => val.id !== this.puit.id);
    if (this.puit.id != null) {
      this.puitService.deletePuit(this.puit.id).subscribe(() => console.log("puit deleted"));
    }
    this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Puit a été suprrimé', life: 3000});
    this.puit;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  savePuit() {
    this.submitted = false;


    if (this.puit.nom === undefined || this.puit.nom.trim() === '') {
      this.submitted = true
    } else if (this.puit.reference === undefined || this.puit.reference.trim() == '')
      this.submitted = true
    else {
      this.productDialog = false;
      if (this.isUpdateUser == true) {
        this.puitService.updatePuit(this.puit).subscribe(() => {
          this.puitService.getAllPuits().subscribe((puits: Puit[]) => {
            this.puits = puits;
          });
        });
        console.log('Puit updated');
        this.isUpdateUser = false;
      } else {
        this.puitService.addPuit(this.puit).subscribe(() => {
          this.puitService.getAllPuits().subscribe((puits: Puit[]) => {
            this.puits = puits;
          });
        });
      }
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = '0123456789';
    for (let i = 0; i < 2; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  selectedPuitPrint: Puit = {}

  exportrapport(puit: Puit) {
    this.selectedPuitPrint = puit;
    this.visiblePrint = true
  }

  getAllPuit() {
    this.loading = true;
    this.puitService.getAllPuits().subscribe((puits: Puit[]) => {
      this.puits = puits;
      this.loading = false;

    });
  }


  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  SearchDate: any;




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



  filtredate() {

   const data=this.selectedPuitPrint.analysesChimiques !== undefined ? this.selectedPuitPrint.analysesChimiques : []
    const newAnalyse:AnalysesChimique[] =[]
     data.forEach(v => {

       if(v.dateAnalyse!==undefined){

         const d=v.dateAnalyse+"";
         const dateana:Date=new Date(d)

         if (  this.AfterTodate(new Date(this.DatefiltrageStart+""),dateana) &&  this.AfterTodate(dateana,new Date(this.DatefiltrageEnd))) {
           newAnalyse.push(v);
         } else {
         }


       }

     })
    this.selectedPuitPrint.analysesChimiques=[...newAnalyse] ;



  }

  clear(dt1: Table) {
    dt1.clear() ;
  }

  Viderfiltredate() {
    this.loading = true;
    this.puitService.getAllPuits().subscribe((puits: Puit[]) => {
      this.puits = puits;
      this.loading = false;
      const searchpuit: Puit | undefined = this.puits.find(value => this.selectedPuitPrint.id == value.id)
      if (searchpuit)
        this.selectedPuitPrint = searchpuit

    });
  }

  getAnalyse() {
    return this.selectedPuitPrint.analysesChimiques !== undefined ? this.selectedPuitPrint.analysesChimiques : []
  }



  getColsfiltr() {
    return this.colsfiltre.filter(value => value.hide==true)
  }

  AfterTodate(date1:Date , date2:Date):boolean{

    return date1.getDay()<=date2.getDay() && date1.getMonth()<=date2.getMonth() && date1.getFullYear()<=date2.getFullYear()
  }



}
