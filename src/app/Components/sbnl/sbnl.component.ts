import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {CommonModule, DatePipe, JsonPipe, NgClass, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
import {ProductService} from "../../Services/product.service";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {Sbnl} from "../../Models/sbnl";
import {Bassin} from "../../Models/bassin";
import {SbnlService} from "../../Services/sbnl.service";
import {BassinService} from "../../Services/bassin.service";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {Puit} from "../../Models/puit";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {CheckboxModule} from "primeng/checkbox";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import {Tamis} from "../../Models/tamis";
import {ListboxModule} from "primeng/listbox";

@Component({
  selector: 'app-sbnl',
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
    ListboxModule
  ],
  templateUrl: './sbnl.component.html',
  styleUrl: './sbnl.component.css'
})
export class SbnlComponent implements OnInit{
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============
  sbnls: Sbnl[] = [];

  sbnl:Sbnl={};

  selectedSbnls: Sbnl[] = [];
   selectedSbnl:Sbnl={}
  private isUpdatesbnl=false;
  bassins: Bassin[] = [];


  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  public  _selectedColumns: any[]=[];
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  constructor(private productService: ProductService, private messageService: MessageService,private sbnlService :SbnlService,private serviceBassin:BassinService) {}

  ngOnInit() {
    this.colsfiltre = [
      {id:0, field: 'reference', header: 'reference' ,hide:true},
      { id:1, field: 'dateAnalyse', header: 'Date Analyse' ,hide:false},
      {id:2,  field: 'temperature', header: 'Temperature °C' ,hide:false},
      { id:3, field: 'vent', header: 'wind (km/h)' ,hide:false},
      { id:4, field: 'humidite', header: 'humidity' ,hide:false},
      {id:5,  field: 'densite', header: 'Densite (g/cm 3)',hide:false },
      {id:6,  field: 'matiereEnSuspension', header: 'Suspended Matter (g)',hide:false },
      { id:7, field: 'salimite', header: 'Salimite (psu)' ,hide:false},
      {id:8,  field: 'calcium', header: 'Calcium (mmol/L)' ,hide:false},
      { id:9, field: 'magnesium', header: 'Magnesium (g)' ,hide:false},
      { id:10, field: 'sulfate', header: 'Sulfate (g)' ,hide:false},
      { id:11, field: 'matiereInsoluble', header: 'Insoluble matter (g)',hide:false },
      { id:12, field: 'potassium', header: 'Potassium (mmol/L)' ,hide:false},
      { id:13, field: 'sodium', header: 'Sodium (mmol)' ,hide:false},
      {id:14,  field: 'chlorure', header: 'Chlorure (meq · L–1)' ,hide:false},
      { id:15, field: 'ph', header: 'pH' ,hide:false},
      { id:16, field: 'chlorureDeSodium', header: 'sodium chloride (g)' ,hide:false},
      {id:17,  field: 'ferrocyanure', header: 'Ferrocyanure (g/mol)' ,hide:false},
    ];

    this._selectedColumns = this.colsfiltre;
this.getsbnl()
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
    this.sbnl;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedSbnls() {

    this.deleteProductsDialog = true;

  }

  editSbnl(sbnl: Sbnl) {
    this.isUpdatesbnl=true;


    this.sbnl = { ...sbnl };
    this.productDialog = true;
  }

  deleteSbnl(sbnl: Sbnl) {
    this.deleteProductDialog = true;


    this.sbnl = { ...sbnl };

  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedSbnls.length)
    this.selectedSbnls.forEach(selectedSbnl => {
      this.sbnlService.deleteSbnl(selectedSbnl.id).subscribe(
        () => {
          this.sbnls = this.sbnls.filter(sbnl =>sbnl.id !== selectedSbnl.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    this.selectedSbnls = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.sbnl.id", this.sbnl.id);
    this.sbnls = this.sbnls.filter(val => val.id !== this.sbnl.id);
    if (this.sbnl.id!= null) {
      this.sbnlService.deleteSbnl(this.sbnl.id).subscribe(() => console.log("sbnl deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Puit Deleted', life: 3000 });
    this.sbnl ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveSbnl() {
    this.submitted = false;
    this.productDialog=false

    if(this.isUpdatesbnl==true) {
      this.sbnlService.updateSbnl(this.sbnl).subscribe(() =>{
        this.sbnlService.getAllSbnls().subscribe((sbnls: Sbnl[]) => {
          this.sbnls= sbnls;
        });
      });
      console.log('Sbnl updated');
      this.isUpdatesbnl=false;
    }
    else
    {
      this.sbnlService.addSbnl(this.sbnl).subscribe(() => {this.sbnlService.getAllSbnls()
        .subscribe((sbnls: Sbnl[]) => {
          this.sbnls = sbnls;
        } );});



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
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getsbnl() {
    this.sbnlService.getAllSbnls().subscribe((v:  Sbnl[]) => {
      this.sbnls=v;

    },error => {
      console.log(error)})
    this.serviceBassin.getAllBassins()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;
      }, error => {
        console.log('Error fetching users:', error);
      });
  }

  exportrapport(sbnl: Sbnl) {

    this.selectedSbnl = sbnl;
    this.visiblePrint = true
    console.log("---->"+new JsonPipe().transform(this.selectedSbnl));
  }

  Detailsbnl(sbnl: Sbnl) {

  }


  filtredate() {
this.Viderfiltredate()
    const data=this.selectedSbnl.analysesChimiques !== undefined ? this.selectedSbnl.analysesChimiques : []
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
    this.selectedSbnl.analysesChimiques=[...newAnalyse] ;
    // console.log(new JsonPipe().transform(data))



  }

  clear(dt1: Table) {
    dt1.clear() ;
  }

  Viderfiltredate() {

    this.sbnlService.getAllSbnls().subscribe((sbnl: Sbnl[]) => {
      this.sbnls = sbnl;

      const sbnlSbnl: Sbnl | undefined = this.sbnls.find(value => this.selectedSbnl.id == value.id)
      if (sbnlSbnl)
        this.selectedSbnl = sbnlSbnl;

    });
  }

  getAnalyse() {
    return this.selectedSbnl.analysesPhysiques !== undefined ? this.selectedSbnl.analysesPhysiques : []
  }
  getAnalyseGranoli() {
    const data=this.selectedSbnl.analysesPhysiques !== undefined ? this.selectedSbnl.analysesPhysiques : []
    const newAnalyse:AnalysesPhysique[] =[]
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
    this.selectedSbnl.analysesPhysiques=[...newAnalyse] ;

    return this.selectedSbnl.analysesPhysiques !== undefined ? this.selectedSbnl.analysesPhysiques : []
  }


  colsfiltre: any[] = [];
  ListTamisSelected: Tamis={};
  SelectedsbnlPrintAnalyse: AnalysesPhysique={};
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
    return this.SelectedsbnlPrintAnalyse.tamisList==undefined?[]:this.SelectedsbnlPrintAnalyse.tamisList
  }

  AfterTodate(date1:Date , date2:Date):boolean{
    console.log(date1+"<"+date2)
    return date1.getDay()<=date2.getDay() && date1.getMonth()<=date2.getMonth() && date1.getFullYear()<=date2.getFullYear()
  }

}
