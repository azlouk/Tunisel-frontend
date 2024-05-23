import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Product} from "../../Models/product";
import {Sbl} from "../../Models/sbl";
 import {MessageService} from "primeng/api";
import {SblService} from "../../Services/sbl.service";
import {CommonModule, DatePipe, JsonPipe, NgClass, NgIf} from "@angular/common";
import {Table, TableModule} from "primeng/table";
import {Sblf} from "../../Models/sblf";
import {SblfService} from "../../Services/sblf.service";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {InputNumberModule} from "primeng/inputnumber";
import {Sbnl} from "../../Models/sbnl";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import {Tamis} from "../../Models/tamis";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {ListboxModule} from "primeng/listbox";
import {CheckboxModule} from "primeng/checkbox";
import {AutoFocusModule} from "primeng/autofocus";
import {getToken} from "../../../main";

@Component({
  selector: 'app-sblf',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    NgClass,
    FormsModule,
    NgIf,
    CalendarModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    DropdownModule,
    OverlayPanelModule,
    InputNumberModule,
    DatePipe,
    ListboxModule,
    CheckboxModule, CommonModule, AutoFocusModule,

  ],
  templateUrl: './sblf.component.html',
  styleUrl: './sblf.component.css'
})
export class SblfComponent {
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
  sblfs: Sblf[] = [];

  sblf:Sblf={};

  selectedSblfs: Sblf[] = [];
  sbls: Sbl[] = [];
  private isUpdateSblf=false;
  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  public  _selectedColumns: any[]=[];
    selectedSblf: Sblf={};
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  constructor(  private messageService: MessageService,private sblfService :SblfService,private sblService:SblService) {}

  ngOnInit() {

    this.colsfiltre = [
      {id:0, field: 'reference', header: 'reference' ,hide:true},
      { id:1, field: 'dateAnalyse', header: 'Date Analyse' ,hide:false},
      {id:2,  field: 'temperature', header: 'Temperature ' ,hide:false},
      { id:3, field: 'vent', header: 'wind ' ,hide:false},
      { id:4, field: 'humidite', header: 'humidity' ,hide:false},
      {id:5,  field: 'densite', header: 'Densite ',hide:false },
      {id:6,  field: 'matiereEnSuspension', header: 'Suspended Matter ',hide:false },
      { id:7, field: 'salinite', header: 'salinite ' ,hide:false},
      {id:8,  field: 'calcium', header: 'Calcium' ,hide:false},
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



   this.getAllSBLF() ;
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'reference', header: 'reference' },
      { field: 'description', header: 'description' },
      { field: 'dateCreation', header: 'dateCreation' },
      { field: 'nom', header: 'nom' },
      { field: 'emplacement', header: 'emplacement' },
      { field: 'etat', header: 'etat' },
      { field: 'dateStock', header: 'dateStock' },
    ];


  }

  openNew() {
    this.sblf={} ;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedSblfs() {

    this.deleteProductsDialog = true;

  }

  editSblf(sblf: Sblf) {
    this.isUpdateSblf=true;
    this.sblf= {...sblf} ;
    this.productDialog = true;
  }

  deleteSblf(sblf: Sblf) {
    this.deleteProductDialog = true;
    this.sblf= {...sblf} ;
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedSblfs.length)
    this.selectedSblfs.forEach(selectedSblf => {
      this.sblfService.deleteSblf(selectedSblf.id).subscribe(
        () => {
          this.sblfs = this.sblfs.filter(sblf =>sblf.id !== selectedSblf.id);
        },
        (error) => {
          console.error('Error deleting Sbl:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sbl Deleted', life: 3000 });
    this.selectedSblfs = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.sblf.id", this.sblf.id);
    this.sblfs = this.sblfs.filter(val => val.id !== this.sblf.id);
    if (this.sblf.id!= null) {
      this.sblfService.deleteSblf(this.sblf.id).subscribe(() => console.log("Sblf deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sblf Deleted', life: 3000 });
    this.sblf ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveSblf() {
    this.submitted = true;
    if (this.sblf.reference?.trim() && this.sblf.sblfSbl) {

      this.productDialog = false
      if (this.isUpdateSblf == true) {
        this.sblfService.updateSblf(this.sblf).subscribe(() => {
          this.sblfService.getAllSblfs().subscribe((sblfs: Sblf[]) => {
            this.sblfs = sblfs;
          });
        });
        console.log('Sbl updated');
        this.isUpdateSblf = false;
      } else {
        this.sblfService.addSblf(this.sblf).subscribe(() => {
          this.sblfService.getAllSblfs().subscribe((sblfs: Sblf[]) => {
            this.sblfs = sblfs;
          });
        });
        console.log('Sblf added');
      }
    }

  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAllSBLF() {
    this.sblfService.getAllSblfs().subscribe((v:  Sblf[]) => {
      this.sblfs=v;
      console.log(new JsonPipe().transform("====================>>>>>>"+this.sblfs))

    },error => {
      console.log(error)})
    this.sblService.getAllSbl().subscribe((v:  Sbl[]) => {
      this.sbls=v;
      console.log(new JsonPipe().transform("====================>>>>>>"+this.sbls))

    },error => {
      console.log(error)})
  }

  exportrapport(sbnl: Sbnl) {

    this.selectedSblf = sbnl;
    this.visiblePrint = true
    console.log("---->"+new JsonPipe().transform(this.selectedSblf));
  }

  Detailsbnl(sbnl: Sbnl) {

  }


  filtredate() {
    this.Viderfiltredate()
    const data=this.selectedSblf.analysesChimiques !== undefined ? this.selectedSblf.analysesChimiques : []
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
    this.selectedSblf.analysesChimiques=[...newAnalyse] ;
    // console.log(new JsonPipe().transform(data))



  }

  clear(dt1: Table) {
    dt1.clear() ;
  }

  Viderfiltredate() {

    this.sblfService.getAllSblfs().subscribe((Sblf: Sblf[]) => {
      this.sblfs = Sblf;

      const sbnlfsbnlf: Sblf | undefined = this.sblfs.find(value => this.selectedSblf.id == value.id)
      if (sbnlfsbnlf)
        this.selectedSblf = sbnlfsbnlf;

    });
  }

  getAnalyse() {
    return this.selectedSblf.analysesPhysiques !== undefined ? this.selectedSblf.analysesPhysiques : []
  }
  getAnalyseGranoli() {
    const data=this.selectedSblf.analysesPhysiques !== undefined ? this.selectedSblf.analysesPhysiques : []
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
    this.selectedSblf.analysesPhysiques=[...newAnalyse] ;

    return this.selectedSblf.analysesPhysiques !== undefined ? this.selectedSblf.analysesPhysiques : []
  }


  colsfiltre: any[] = [];
  // ListTamisSelected: Tamis={};
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


    protected readonly getToken = getToken;
}
