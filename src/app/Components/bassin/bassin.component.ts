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
import {utils, WorkBook, WorkSheet, writeFile} from "xlsx";
import {getToken, roundToDecimalPlaces} from "../../../main";
import * as XLSX from 'xlsx';
import {TooltipModule} from "primeng/tooltip";
 import Swal from "sweetalert2";
import {Recolte} from "../../Models/recolte";
import {RecolteService} from "../../Services/recolte.service";
import {RippleModule} from "primeng/ripple";
 import {SondageService} from "../../Services/sondage.service";
import {Sondage} from "../../Models/sondage";
import {FieldsetModule} from "primeng/fieldset";

interface RecolteSummary {
  total: number;
  month: number;
  bassinId: number;
}
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
    ListboxModule, CommonModule, AutoFocusModule, TooltipModule, RippleModule, FieldsetModule
  ],
  templateUrl: './bassin.component.html',
  styleUrl: './bassin.component.css'
})
export class BassinComponent implements OnInit {
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;
  RecolteDialog: boolean = false;
  SondageDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============
  bassins: Bassin[] = [];
  bassinsCopy: Bassin[] = [];

  bassinsId: number[] = [];

  bassin: Bassin = {};

  selectedBassins: Bassin[] = [];
  SelectetBassin:Bassin={}
  puits: Puit[] = [];
  private isUpdateBassin=false;
  selectedPuit?: Puit;
  SelectAll: boolean = false;
loading:boolean=false ;
recolte=new Recolte();
recolteUP=new Recolte();
recoltes:Recolte[]=[];
  sondage=new Sondage();
  sondageUP=new Sondage();
  sondages:Sondage[]=[];
  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();
  RecoltePDF: boolean = false;
  SondaePDF: boolean = false;
  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
 dateStart: Date=new Date();
 dateEnd: Date= new Date() ;
  dateStartSondage!: Date
  dateEndSondage!: Date
  dateStartSondageS2!:Date;
  dateEndSondageS2!: Date ;
 listSumRecolte:any;
 listSumRecolteCopy:any;
  public  _selectedColumns: any[]=[];

  MonthName:String[]=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  constructor(  private messageService: MessageService,
                private bassinService :BassinService,
                private puitService:PuitService,
                private recolteService:RecolteService,
                private sondageService:SondageService) { }

  ngOnInit() {
 this.listSumRecolteCopy=[]
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

    })
    this.getAllRecolte();
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
    this.isUpdateBassin=true;
    this.bassin = { ...bassin };
    this.productDialog = true;
  }

  deleteBassin(bassin: Bassin) {
    this.deleteProductDialog = true;
    this.bassin = { ...bassin };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;


    this.selectedBassins.forEach(bassin => {

      this.bassinService.deleteBassin(bassin.id).subscribe(
        () => {
          this.bassins = this.bassins.filter(bassin => bassin.id !== bassin.id);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bassins Deleted', life: 3000 });

        },
        (error) => {
          Swal.fire({
          icon: "error",
          title: "Can not deleted",
          text: "Pond related with Unwashed !",
        })
          console.error('Error deleting user:', error);
        }
      );
    });

  }

  confirmDelete() {
    this.deleteProductDialog = false;

      this.bassinService.deleteBassin(this.bassin.id).subscribe(() => {
        this.bassins = this.bassins.filter(val => val.id !== this.bassin.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bassin Deleted', life: 3000 });

      },error => {


        Swal.fire({
          icon: "error",
          title: "Can not deleted",
          text: "Pond related with Unwashed !",
        })
      });





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

        this.bassinService.updateBassindto(this.bassin).subscribe(() =>{ this.bassinService.getAllBassinsDTO()
          .subscribe((bassins: Bassin[]) => {
            this.bassins = bassins;
          } );});

      }
      this.isUpdateBassin=false;
    }
    else
    {


        this.bassinService.addBassin(this.bassin).subscribe(() =>{ this.bassinService.getAllBassinsDTO().subscribe((bassins: Bassin[]) => {
            this.bassins = bassins;
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


  getAllBassin() {
    this.loading=true ;
    this.bassinService.getAllBassinsDTO()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;

        this.loading=false ;
      }, error => {


      });
  }

  exportrapport(SelectetBassin: Bassin) {

    this.SelectetBassin = {...SelectetBassin};

    this.visiblePrint = true
  }
  filtredate() {

    const data=this.SelectetBassin.analysesChimiques !== undefined ? this.SelectetBassin.analysesChimiques : []
    const newAnalyse:AnalysesChimique[] =[]
    data.forEach(v => {

      if(v.dateAnalyse!==undefined){


        const d=v.dateAnalyse+"";
        const dateana:Date=new Date(d)


        if (  this.AfterTodate(new Date(this.DatefiltrageStart+""),new Date(dateana+"")) &&  this.AfterTodate(new Date(dateana+""),new Date(this.DatefiltrageEnd+""))) {

          newAnalyse.push(v);
        } else {


        }


      }

    })
    this.SelectetBassin.analysesChimiques=newAnalyse;


    this.getAnalyseGranoli() ;

  }

  clear(dt1: Table) {
    dt1.clear() ;
  }

  Viderfiltredate() {

    this.bassinService.getAllBassinsDTO().subscribe((bassins: Bassin[]) => {
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


        const d=v.dateAnalyse+"";
        const dateana:Date=new Date(d)


        if (  this.AfterTodate(new Date(this.DatefiltrageStart+""),dateana) &&  this.AfterTodate(dateana,new Date(this.DatefiltrageEnd))) {

           newAnalyse.push(v);
        } else {


        }

      }

    })





    this.SelectetBassin.analysesPhysiques=[...newAnalyse] ;


  }


  colsfiltre: any[] = [];
  // ListTamisSelected: Tamis={};
  SelectedPrintAnalysePhysique: AnalysesPhysique={};
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
    return this.SelectedPrintAnalysePhysique.tamisList==undefined?[]:this.SelectedPrintAnalysePhysique.tamisList
  }
  AfterTodate(date1:Date , date2:Date):boolean{


    return date1.getTime()<=date2.getTime()
  }

  SelectAllCheck() {
    this.colsfiltre.forEach(value => {
      value.hide = this.SelectAll;
    })
  }


  ExportExcel() {
    try {
      // Define headers
      const headers = {
        titre: [['Analysis Report']],
        titre1: [['Chemical analysis']],
        titreBassin: [['Reference', 'Date Creation']],
        titre2: [['Grain Size']],
        titreAnalysePhysique: [['Date', 'Reference', 'Relative', 'Temperature', 'Description']]
      };

      // Create a new workbook and worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);

      // Add headers to the worksheet
      XLSX.utils.sheet_add_aoa(ws, headers.titre, { origin: 'D1' });
      XLSX.utils.sheet_add_aoa(ws, headers.titre1, { origin: 'A3' });
      XLSX.utils.sheet_add_aoa(ws, headers.titreBassin, { origin: 'A5' });
      XLSX.utils.sheet_add_aoa(ws, headers.titre2, { origin: 'A14' });
      XLSX.utils.sheet_add_aoa(ws, headers.titreAnalysePhysique, { origin: 'A16' });

      // Add Bassin data
      const bassinData = [
        [this.SelectetBassin.reference, this.SelectetBassin.dateCreation]
      ];
      XLSX.utils.sheet_add_json(ws, bassinData, { origin: 'A6', skipHeader: true });

      // Add Analyse Physique data
      const analysePhyData = [
        [
          this.SelectedPrintAnalysePhysique.dateAnalyse,
          this.SelectedPrintAnalysePhysique.reference,
          this.SelectedPrintAnalysePhysique.matiere,
          this.SelectedPrintAnalysePhysique.temperature,
          this.SelectedPrintAnalysePhysique.description
        ]
      ];
      XLSX.utils.sheet_add_json(ws, analysePhyData, { origin: 'A17', skipHeader: true });

      // Helper function to format dates
      const formatDate = (cell: any): any => {
        if (typeof cell === 'number' && cell > 40000) {
          return new Date((cell - 25569) * 86400 * 1000).toLocaleDateString();
        }
        return cell;
      };

      // Function to process and add table data to worksheet
      const addTableDataToSheet = (elementId: string, startRow: number) => {
        const element = document.getElementById(elementId);
        if (element) {
          const wsTable: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

          let tableData: any[][] = XLSX.utils.sheet_to_json(wsTable, { header: 1 }) as any[][];

          // Determine the index of the column containing 'Date Analyse'
          let dateColumnIndex = -1;
          tableData[0].forEach((header: any, index: number) => {
            if (header === 'Date Analyse') {
              dateColumnIndex = index;
            }
          });

          // Format dates in the table data
          const formattedTableData = tableData.map((row: any[], rowIndex: number) => row.map((cell: any, colIndex: number) => {
            if (colIndex === dateColumnIndex && typeof cell === 'number' && cell > 20000) {
              return new Date((cell - 25569) * 86400 * 1000).toLocaleDateString();
            }
            return cell;
          }));

          // tableData = tableData.map(row => row.map(cell => formatDate(cell)));
          XLSX.utils.sheet_add_aoa(ws, formattedTableData, { origin: `A${startRow}`});
        }
      };
      // Add HTML table data to worksheet
      addTableDataToSheet('EXCEL', 8);
      addTableDataToSheet('TAMIS', 20);

      // Append worksheet to workbook and save the file
      XLSX.utils.book_append_sheet(wb, ws, 'Fiche de Vie');
      writeFile(wb, 'Bassin Report.xlsx');
    } catch (error) {
      console.error('Error exporting Excel file:', error);
    }
  }
  exportcsv(): void {
    try {
      // Define headers
      const headers: Record<string, string[]> = {
        titre: ['Analysis Report'],
        titre1: ['Chemical analysis'],
        titreBassin: ['Reference', 'Date Creation'],
        titre2: ['Grain Size'],
        titreAnalysePhysique: ['Date', 'Reference', 'Relative', 'Temperature', 'Description']
      };

      // Initialize CSV data array with headers
      let csvData: string[] = Object.values(headers).map(header => header.join(','));

      // Add Bassin data to the CSV data array
      const bassinData: string = [this.SelectetBassin.reference, this.SelectetBassin.dateCreation].join(',');
      csvData.push(bassinData);

      // Add Analyse Physique data to the CSV data array
      const analysePhyData: string = [
        this.SelectedPrintAnalysePhysique.dateAnalyse,
        this.SelectedPrintAnalysePhysique.reference,
        this.SelectedPrintAnalysePhysique.matiere,
        this.SelectedPrintAnalysePhysique.temperature,
        this.SelectedPrintAnalysePhysique.description
      ].join(',');
      csvData.push(analysePhyData);

      // Function to format dates
      const formatDate = (cell: any): any => {
        if (typeof cell === 'number' && cell > 40000) {
          return new Date((cell - 25569) * 86400 * 1000).toLocaleDateString();
        }
        return cell;
      };

      // Function to process and add table data to CSV data array
      const addTableDataToCSV = (elementId: string): void => {
        const element: HTMLElement | null = document.getElementById(elementId);
        if (element) {
          const wsTable: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

          let tableData: any[][] = XLSX.utils.sheet_to_json(wsTable, { header: 1 }) as any[][];

          // Determine the index of the column containing 'Date Analyse'
          let dateColumnIndex: number = -1;
          tableData[0].forEach((header: any, index: number) => {
            if (header === 'Date Analyse') {
              dateColumnIndex = index;
            }
          });

          // Format dates in the table data
          tableData = tableData.map(row => row.map((cell, colIndex) => {
            if (colIndex === dateColumnIndex && typeof cell === 'number' && cell > 20000) {
              return new Date((cell - 25569) * 86400 * 1000).toLocaleDateString();
            }
            return cell;
          }));

          csvData = csvData.concat(tableData.map(row => row.map(cell => formatDate(cell).toString()).join(',')));
        }
      };

      // Add HTML table data to CSV data array
      addTableDataToCSV('EXCEL');
      addTableDataToCSV('TAMIS');

      // Convert CSV data array to CSV format
      const csv: string = csvData.join('\n');

      // Create a Blob from CSV data
      const blob: Blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url: string = URL.createObjectURL(blob);

      // Create a link and trigger the download
      const link: HTMLAnchorElement = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'Bassin_Report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting CSV file:', error);
    }
  }


  protected readonly getToken = getToken;



  AddRecolte(bassin: Bassin) {
    this.RecolteDialog=true;
    this.bassin=bassin
    this.getAllRecolte()
  }
  AddSondage(bassin: Bassin) {
    this.SondageDialog=true;
    this.bassin=bassin
    this.getAllSondage()
  }
  hideDialogRecolte() {
    this.RecolteDialog=false;
  }

  saveRecolte() {
    if (    this.bassin.id!==undefined)
  this.recolteService.addRecolte(this.recolte,this.bassin.id).subscribe(value => {
    this.getAllRecolte();
    this.recolte=new Recolte();
  })
    }
    getAllRecolte(){
    if(this.bassin.id)
  this.bassinService.getAllBassinsById(this.bassin.id).subscribe(value =>{
    if(value.recolteList) {
      this.recoltes = value.recolteList
    } }
     )
    }


  deleteRecolte(recolte: Recolte)   {
  this.recolteService.deleteRecolte(recolte.id).subscribe(value =>     this.recoltes= this.recoltes.filter(rec => rec.id !== recolte.id)
  )

  }

  saveUpdateRecolte() {

    this.recolteService.updateRecolte(this.recolteUP).subscribe(value => {
      this.getAllRecolte();

    })
  }

  updateRecolte(recolte: Recolte) {
    this.recolteUP=recolte;
  }

exportRecolte(bassin: Bassin) {
    this.RecoltePDF=true;
  }

  // ======================recolte PDF=======================
  transform(value: Date): string {
    // Parse the input date string
    const date = new Date(value);

    // Extract month and year
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();

    // Format the date to MM-YYYY
    const formattedDate = `${month.toString().padStart(2, '0')}-${year}`;

    return formattedDate;
  }
  months: number[] = [];
  public TotalPands: number=0;
  getMonthsBetweenDates(dateDebut1: Date, dateFin1: Date): number[] {
    this.bassinsId=[];
  this.selectedBassins.forEach(value => {
  if(value.id)
  this.bassinsId.push(value.id)
})
    this.listSumRecolte=[]
    this.listSumRecolteCopy=[]

this.months=[]
    this.TotalPands=0;

let year=this.getYear(dateFin1);


    for (let i = this.dateStart.getMonth()+1; i <= this.dateEnd.getMonth()+1; i++) {
      // Handle month rollover (e.g., December to January)
     this.months.push(i);
    }
    if(this.months.length>0){
      this.recolteService.getSumRecoltePerMonthByBassinIdsAndYear(year,this.bassinsId).subscribe(value => {
        this.listSumRecolte=value;
        this.listSumRecolte=this.getDistBassin();
this.listSumRecolteCopy=[...value]
        // this.listSumRecolte.forEach(value => console.table(new JsonPipe().transform((value as { month: number }).month)));
        //  this.listSumRecolte=this.listSumRecolte.filter(lr => this.months.find(m =>m==lr.month )!==undefined)

      })
    }
    return this.months;
  }

  getYear(value: Date): number {
    // Parse the input date string
    const date = new Date(value);

    // Extract year
    const year = date.getFullYear();

    // Format the date to YYYY
    // const formattedDate = `${year}`;
    return year;
  }


  public getMonthName(month: number) {

    return this.MonthName[month-1]
  }
public getMonthNameDate(date: Date) {
    if(date)
    return this.MonthName[new Date(date.toString()).getMonth()]

  return ""
  }



  public getDistBassin() {
    return this.removeDuplicates(this.listSumRecolte,"id")
  }



   removeDuplicates(arr: any[], key: string): any[] {
    return arr.reduce((unique, item) => {
      if (!unique.find((obj : any) => obj[key] === item[key])) {
        unique.push(item);
      }
      return unique;
    }, []);
  }
  public getMonthByBassinRecolte(recolte: any, m: number) {

    const  data=this.listSumRecolteCopy.find((r:any)=> r.id==recolte.id && r.month==m);
    return  data!==undefined?data.total:0;
  }

  public getTotalPerPond(recolte: any) :number{
let total:number=0;
    const list=this.listSumRecolteCopy.filter((rec:any)=>rec.id==recolte.id);
    // list.forEach((list:any)=>total=total+(list.total) )
    list.forEach((list:any)=> {
      this.months.forEach(month => {
        if(list.month==month){
          total=total+(list.total)
        }
      })
    } )

    return total;
  }



  getTotalPerMonth(month: number): number {
    let total = 0;
   this.listSumRecolteCopy.forEach((rec:any) => {
      if(rec.month==month)
     total += rec.total
   });
     return total;
  }

  public getTotlBassins() {
    let totolBassin:number=0;
    this.listSumRecolte.forEach((r:any)=>{
      totolBassin+=this.getTotalPerPond(r) ;

    } )
    return totolBassin
  }


//   ================Sondage======================================
  saveSondage() {
    if (    this.bassin.id!==undefined)
      this.sondageService.addSondage(this.sondage,this.bassin.id).subscribe(value => {
        this.getAllSondage();
        this.sondage=new Sondage();
      })
  }
  getAllSondage(){
    if(this.bassin.id)
      this.bassinService.getAllBassinsById(this.bassin.id).subscribe(value =>{
        if(value.sondageList) {
          this.sondages = value.sondageList;
        } }
      )
  }


  deleteSondage(sondage: Sondage)   {
    this.sondageService.deleteSondage(sondage.id).subscribe(value =>     this.sondages= this.sondages.filter(son => son.id !== sondage.id)
    )

  }

  saveUpdateSondage() {

    this.sondageService.updateSondage(this.sondageUP).subscribe(value => {
      this.getAllSondage();

    })
  }

  updateSondage(sondage: Sondage) {
    this.sondageUP=sondage;
  }
  hideDialogSondage() {
    this.SondageDialog=false;
  }

   getMassSondage(sondage: Sondage):number {
    let mass:number=0;
    if(this.bassin.surface!==undefined)
    mass=this.bassin.surface*sondage.epaisseur*sondage.densite;
return mass;
  }

//   ===============sondagePDF===================================
  totalFabrique: number=0;
  totalperdue: number=0;
  exportSondage() {
    this.SondaePDF=true;
    this.getAllBassin();
    this.bassinsCopy=[]
    this.totalperdue=0;
    this.totalFabrique=0 ;
  }



  filtreListSondageWithDate(dateStartSondage: Date, dateEndSondage: Date, dateStartSondageS2: Date, dateEndSondageS2: Date) {

 this.bassinsCopy=[] ;
 this.totalFabrique=0;
 this.totalperdue=0;
    this.bassins.forEach(bassin => {
      const filteredList1 = bassin.sondageList?.filter(sondage => {
        return ((dateStartSondage <= sondage.dateDebut && dateEndSondage >= sondage.dateFin) || (dateStartSondageS2 <= sondage.dateDebut && dateEndSondageS2 >= sondage.dateFin));
      });

      // Combine the filtered lists if needed. Here we use a Set to remove duplicates.
      if(filteredList1!==undefined){

     let bCopy={...bassin}
        bCopy.sondageList = filteredList1;
     this.bassinsCopy.push(bCopy)
        this.getPert(bCopy,0)
       }
    });
  }

  getMassSondagePdf(bassin:Bassin,sondage: Sondage):number {
    let mass:number=0;

    if(bassin.surface!==undefined)
      mass=bassin.surface*sondage.epaisseur*sondage.densite;
    return mass;
  }

  public getPert(bassinSondage: Bassin,ch:number) {
     let pert: number = 0;
     if (bassinSondage.sondageList && bassinSondage.sondageList.length > 1) {
      // Assuming sondageList contains objects with a 'value' property
      const sondage1 = bassinSondage.sondageList[0];
      const sondage2 = bassinSondage.sondageList[1];
const mass2= this.getMassSondagePdf(bassinSondage,sondage2);
const mass1= this.getMassSondagePdf(bassinSondage,sondage1);

        pert = mass2 - mass1;
        if( ch==0) {
          if (pert < 0 && this.getTotalRecole(bassinSondage)==0) {
            this.totalperdue += pert
          } else {
            this.totalFabrique += Math.abs(pert)
          }
        }

      return roundToDecimalPlaces( pert+this.getTotalRecole(bassinSondage) ,3) ;
    }else if(bassinSondage.sondageList?.length==1){
     return  0;
    }
    else {
      return 0
    }


  }

  protected readonly DatePipe = DatePipe;

  getYearDate(dateStartSondage: Date) {
    if(dateStartSondage)
    return new Date(dateStartSondage.toString()).getFullYear()
    return ""
  }

  protected readonly Math = Math;

  // getTotalRecole(bassinSondage: Bassin) {
  //   let x:number=0;
  // const listFiltree:Recolte[]|undefined=  bassinSondage.recolteList?.filter(rec=> {
  //   this.pipeDate( rec.dateCreation) >= this.dateStartSondageS2.toString() && this.pipeDate(rec.dateCreation) <= this.dateEndSondageS2.toString();
  //   console.log(this.pipeDate(rec.dateCreation)+" <> "+this.dateStartSondageS2)
  //
  // } );
  // if(listFiltree!==undefined)
  //  // x=listFiltree.reduce((sum, num)=>sum +num.value,0)
  //   listFiltree.forEach(value => x+=value.value)
  //   return x==undefined?0:x ;
  // }

  protected readonly roundToDecimalPlaces  = roundToDecimalPlaces;
  getTotalRecole(bassinSondage: Bassin): number {
    let total: number = 0;
    const listFiltree: Recolte[] | undefined = bassinSondage.recolteList?.filter(rec => {
      const recDate = this.pipeDate(rec.dateCreation);
      const startDate = this.pipeDate(this.dateStartSondageS2);
      const endDate = this.pipeDate(this.dateEndSondageS2);

      return recDate >= startDate && recDate <= endDate;
    });

    if (listFiltree !== undefined) {
      total = listFiltree.reduce((sum, rec) => sum + rec.value, 0);
    }

    return total;
  }

  pipeDate(isoDatetimeStr: Date): string {

    // Parse the input datetime string
    const date = new Date(isoDatetimeStr);

    // Format the date object to just the date
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }


}
