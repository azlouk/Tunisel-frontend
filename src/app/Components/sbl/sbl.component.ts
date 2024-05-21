import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {CommonModule, DatePipe, JsonPipe, NgClass, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
import {ProductService} from "../../Services/product.service";
import {Sbl} from "../../Models/sbl";
import {SblService} from "../../Services/sbl.service";
import {Sbnl} from "../../Models/sbnl";
import {SbnlService} from "../../Services/sbnl.service";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import {Tamis} from "../../Models/tamis";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {CheckboxModule} from "primeng/checkbox";
import {ListboxModule} from "primeng/listbox";
import {Bande} from "../../Models/bande";
import {BandeService} from "../../Services/bande.service";

@Component({
  selector: 'app-sbl',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    DialogModule,
    InputTextModule,
    NgIf,
    PaginatorModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    NgClass,
    OverlayPanelModule,
    CheckboxModule,
    ListboxModule,
    DatePipe,    CommonModule,

  ],
  templateUrl: './sbl.component.html',
  styleUrl: './sbl.component.css'
})
export class SblComponent implements OnInit{
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuS: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============
  sbls: Sbl[] = [];

  sbl:Sbl={};

  selectedSbls: Sbl[] = [];
  bandes: Bande[] = [];
  Selectetsbl:Sbl={}
  private isUpdateSbl=false;

  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  public  _selectedColumns: any[]=[];
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  constructor(private productService: ProductService, private messageService: MessageService,private sblService :SblService,private bandeService:BandeService) {}

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
    this.getAllSbl() ;
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
    this.sbl ;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedSbls() {

    this.deleteProductsDialog = true;

  }

  editSbl(sbl: Sbl) {
    this.isUpdateSbl=true;
    this.sbl= {...sbl} ;
    this.productDialog = true;
  }

  deleteSbl(sbl: Sbl) {
    this.deleteProductDialog = true;
    this.sbl= {...sbl} ;
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedSbls.length)
    this.selectedSbls.forEach(selectedSbl => {
      this.sblService.deleteSbl(selectedSbl.id).subscribe(
        () => {
          this.sbls = this.sbls.filter(sbl =>sbl.id !== selectedSbl.id);
        },
        (error) => {
          console.error('Error deleting Sbl:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sbl Deleted', life: 3000 });
    this.selectedSbls = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.sbl.id", this.sbl.id);
    this.sbls = this.sbls.filter(val => val.id !== this.sbl.id);
    if (this.sbl.id!= null) {
      this.sblService.deleteSbl(this.sbl.id).subscribe(() => console.log("Sbl deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sbl Deleted', life: 3000 });
    this.sbl ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveSbl() {
    this.submitted = false;
    this.productDialog=false
    if(this.isUpdateSbl==true) {
      this.sblService.updateSbl(this.sbl).subscribe(() =>{
        this.sblService.getAllSbl().subscribe((sbls: Sbl[]) => {
          this.sbls = sbls;

        });
      });
      console.log('Sbl updated');
      this.isUpdateSbl=false;
    }
    else
    {
      this.sblService.addSbl(this.sbl).subscribe(() => {
        this.sblService.getAllSbl().subscribe((sbls: Sbl[]) => {
          this.sbls = sbls;
        });
      });
      console.log('Sbl added');
    }
  }





  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }



  getAllSbl() {
    this.sblService.getAllSbl().subscribe((v:  Sbl[]) => {
      this.sbls=v;
      // console.log(new JsonPipe().transform("====================>>>>>>"+this.sbls))

    },error => {
      console.log(error)})
    this.bandeService.getAllBandes().subscribe((v:  Sbnl[]) => {
      this.bandes=v;

    },error => {
      console.log(error)})
  }


  exportrapport(Sbl: Sbl) {

    this.Selectetsbl = Sbl;
    this.visiblePrint = true
    console.log("---->"+new JsonPipe().transform(this.Selectetsbl));
  }




  filtredate() {
    this.Viderfiltredate()
    const data=this.Selectetsbl.analysesChimiques !== undefined ? this.Selectetsbl.analysesChimiques : []
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
    this.Selectetsbl.analysesChimiques=[...newAnalyse] ;
    // console.log(new JsonPipe().transform(data))



  }

  clear(dt1: Table) {
    dt1.clear() ;
  }

  Viderfiltredate() {

    this.sblService.getAllSbl().subscribe((sbl: Sbl[]) => {
      this.sbls = sbl;

      const sblsbl: Sbl | undefined = this.sbls.find(value => this.Selectetsbl.id == value.id)
      if (sblsbl)
        this.Selectetsbl = sblsbl;

    });
  }

  getAnalyse() {
    return this.Selectetsbl.analysesPhysiques !== undefined ? this.Selectetsbl.analysesPhysiques : []
  }
  getAnalyseGranoli() {
    const data=this.Selectetsbl.analysesPhysiques !== undefined ? this.Selectetsbl.analysesPhysiques : []
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
    this.Selectetsbl.analysesPhysiques=[...newAnalyse] ;

    return this.Selectetsbl.analysesPhysiques !== undefined ? this.Selectetsbl.analysesPhysiques : []
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

}
