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
import {getToken} from "../../../main";
import * as XLSX from 'xlsx';
import {TooltipModule} from "primeng/tooltip";
import * as Papa from 'papaparse';
import Swal from "sweetalert2";

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
    ListboxModule, CommonModule, AutoFocusModule, TooltipModule
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
    // console.log(this.selectedBassins.length)
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
        console.log(error)
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

        this.bassinService.updateBassin(this.bassin).subscribe(() =>{ this.bassinService.getAllBassinsDTO()
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
    this.bassinService.getAllBassinsDTO()
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
    console.log(date1+"<"+date2)
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
}
