import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../Models/product";
 import {MessageService, SharedModule} from "primeng/api";
import {CommonModule, DatePipe, JsonPipe, NgClass, NgIf} from "@angular/common";
import {Table, TableModule} from "primeng/table";
import {Puit} from "../../Models/puit";
import {BassinService} from "../../Services/bassin.service";
import {Bassin} from "../../Models/bassin";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {MultiSelectModule} from "primeng/multiselect";
import {PuitService} from "../../Services/puit.service";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {CheckboxModule} from "primeng/checkbox";
import {ListboxModule} from "primeng/listbox";
import {AutoFocusModule} from "primeng/autofocus";
import {utils, writeFile} from "xlsx";
import {getToken} from "../../../main";

@Component({
  selector: 'app-bassin',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    PaginatorModule,
    PasswordModule,
    RadioButtonModule,
    SharedModule,
    ToolbarModule,
    ToastModule,
    ToolbarModule,
    DialogModule,
    NgClass,
    FormsModule,
    NgIf,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    MultiSelectModule,
    DatePipe,
    CheckboxModule,
    ListboxModule, CommonModule, AutoFocusModule
  ],
  templateUrl: './bassin.component.html',
  styleUrl: './bassin.component.css'
})
export class BassinComponent implements OnInit {
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
  bassins: Bassin[] = [];

  bassin: Bassin = {};

  selectedBassins: Bassin[] = [];
  SelectetBassin:Bassin={}
  puits: Puit[] = [];
  private isUpdateBassin=false;
  selectedPuit?: Puit;
  SelectAll: boolean = false;
loading:boolean=false ;
  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  public  _selectedColumns: any[]=[];
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  constructor(  private messageService: MessageService,private bassinService :BassinService,private puitService:PuitService) { }

  ngOnInit() {

this.SelectetBassin={analysesPhysiques:[]}
    this.colsfiltre = [
      {id:0, field: 'reference', header: 'reference' ,hide:true},
      { id:1, field: 'dateAnalyse', header: 'Date Analyse' ,hide:false},
      {id:2,  field: 'temperature', header: 'Temperature ' ,hide:false},
      { id:3, field: 'vent', header: 'wind ' ,hide:false},
      { id:4, field: 'humidite', header: 'humidity ' ,hide:false},
      {id:5,  field: 'densite', header: 'Densite  ',hide:false },
      {id:6,  field: 'matiereEnSuspension', header: 'Suspended Matter ',hide:false },
      { id:7, field: 'salinite', header: 'Salinite ' ,hide:false},
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
      {id:18, field: 'description ', header: 'description ' ,hide:false},

    ];

    this._selectedColumns = this.colsfiltre;

     this.getAllBassin();
    this.puitService.getAllPuits().subscribe((v:  Puit[]) => {
      this.puits=v;

    },error => {
      console.log(error)})
  }

  openNew() {
    this.bassin = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedBassins() {

    this.deleteProductsDialog = true;

  }

  editBassin(bassin: Bassin) {
    // this.isUpdateUser=true;
    this.bassin = { ...bassin };
    this.productDialog = true;
  }

  deleteBassin(bassin: Bassin) {
    this.deleteProductDialog = true;
    this.bassin = { ...bassin };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedBassins.length)
    this.selectedBassins.forEach(selectedUser => {
      this.bassinService.deleteBassin(selectedUser.id).subscribe(
        () => {
          this.bassins = this.bassins.filter(bassin => bassin.id !== selectedUser.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    this.selectedBassins = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.bassin.id", this.bassin.id);
    this.bassins = this.bassins.filter(val => val.id !== this.bassin.id);
    if (this.bassin.id!= null) {
      this.bassinService.deleteBassin(this.bassin.id).subscribe(() => console.log("bassin deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bassin Deleted', life: 3000 });
    this.bassin = {};
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }


  saveBassin() {
    this.submitted = false;
    this.productDialog=false

    if(this.isUpdateBassin==true) {

      if (this.bassin) {

        this.bassinService.updateBassin(this.bassin).subscribe(() =>{ this.bassinService.getAllBassins()
          .subscribe((bassins: Bassin[]) => {
            this.bassins = bassins;
          } );});

      }
      this.isUpdateBassin=false;
    }
    else
    {


        this.bassinService.addBassin(this.bassin).subscribe(() =>{ this.bassinService.getAllBassins()
          .subscribe((bassins: Bassin[]) => {
            this.bassins = bassins;
          } );});
      console.log(new JsonPipe().transform(this.bassin));

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


  getAllBassin() {
    this.loading=true ;
    this.bassinService.getAllBassins()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;
        this.loading=false ;
      }, error => {
        console.log('Error fetching users:', error);
      });
  }

  exportrapport(SelectetBassin: Bassin) {

    this.SelectetBassin = {...SelectetBassin};

    this.visiblePrint = true
  }
  filtredate() {
    //this.Viderfiltredate()
    const data=this.SelectetBassin.analysesChimiques !== undefined ? this.SelectetBassin.analysesChimiques : []
    const newAnalyse:AnalysesChimique[] =[]
    data.forEach(v => {

      if(v.dateAnalyse!==undefined){
        console.log(typeof v.dateAnalyse )
        const d=v.dateAnalyse+"";
        const dateana:Date=new Date(d)
        console.log("-D-->" + dateana)
        if (  this.AfterTodate(new Date(this.DatefiltrageStart+""),new Date(dateana+"")) &&  this.AfterTodate(new Date(dateana+""),new Date(this.DatefiltrageEnd+""))) {

          newAnalyse.push(v);
        } else {
          console.log("no compare")
        }


      }

    })
    this.SelectetBassin.analysesChimiques=newAnalyse;
  console.log("Chimique"+new JsonPipe().transform(newAnalyse))

    this.getAnalyseGranoli() ;

  }

  clear(dt1: Table) {
    dt1.clear() ;
  }

  Viderfiltredate() {

    this.bassinService.getAllBassins().subscribe((bassins: Bassin[]) => {
      this.selectedBassins = bassins;

      const bassinbassin: Bassin | undefined = this.selectedBassins.find(value => this.SelectetBassin.id == value.id)
      if (bassinbassin)
        this.SelectetBassin = bassinbassin;

    });
  }

  getAnalyse() {
    return this.SelectetBassin.analysesChimiques !== undefined ? this.SelectetBassin.analysesChimiques : []
  }
  getAnalyseGranoli() {
    const data=this.SelectetBassin.analysesPhysiques !== undefined ? this.SelectetBassin.analysesPhysiques : []
    const newAnalyse:AnalysesPhysique[] =[]
    data.forEach(v => {

      if(v.dateAnalyse!==undefined){
        console.log(typeof v.dateAnalyse )
        const d=v.dateAnalyse+"";
        const dateana:Date=new Date(d)
        console.log("-D-->" + dateana)
        if (  this.AfterTodate(new Date(this.DatefiltrageStart+""),dateana) &&  this.AfterTodate(dateana,new Date(this.DatefiltrageEnd))) {

           newAnalyse.push(v);
        } else {
          console.log("no compare")
        }

      }

    })


    console.log("Physique--->"+new JsonPipe().transform(newAnalyse))

    this.SelectetBassin.analysesPhysiques=[...newAnalyse] ;


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
    return date1.getTime()<=date2.getTime()
  }

  SelectAllCheck() {
    this.colsfiltre.forEach(value => {
      value.hide = this.SelectAll;
    })
  }

 //  csvExport() {
 //     const headings=[['reference','description','dateCreation','nom','emplacement','etat','surface','idPuit']];
 // const wb = utils.book_new();
 // const ws:any=utils.json_to_sheet([]);
 // utils.sheet_add_aoa(ws,headings);
 // utils.sheet_add_json(ws,this.bassins,{
 //   origin: 'A2',
 //   skipHeader:true,
 // });
 // utils.book_append_sheet(wb,ws,'Bassins');
 // writeFile(wb,'Bassins Report.xlsx');
 //
 //  }

  csvExport() {
    const headings = [['reference', '', 'description', '', 'dateCreation', '', 'nom', '', 'emplacement', '', 'etat', '', 'surface', '',]];

    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);

    const formattedData = this.bassins.map(record => {
      return [
        record.reference, '',
        record.description, '',
        record.dateCreation, '',
        record.nom, '',
        record.emplacement, '',
        record.etat, '',
        record.surface, '',
      ];
    });

    utils.sheet_add_json(ws, formattedData, {
      origin: 'A2',
      skipHeader: true,
    });

    utils.book_append_sheet(wb, ws, 'Bassins');
    writeFile(wb, 'Bassins Report.xlsx');
  }

  protected readonly getToken = getToken;
}
