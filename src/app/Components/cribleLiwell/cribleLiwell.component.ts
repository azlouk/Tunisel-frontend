import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {CommonModule, DatePipe, JsonPipe, NgClass, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
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
 import {SbnlService} from "../../Services/sbnl.service";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {CribleLiwell} from "../../Models/cribleLiwell";
import {CribleLiwellService} from "../../Services/cribleLiwell.service";
import {AutoFocusModule} from "primeng/autofocus";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import Swal from "sweetalert2";
import {getToken} from "../../../main";
import * as XLSX from "xlsx";
import {writeFile} from "xlsx";
import {TooltipModule} from "primeng/tooltip";
import {MultiSelectModule} from "primeng/multiselect";
import {RippleModule} from "primeng/ripple";
import {TraitementStock} from "../../Models/traitement-stock";
import {TraitementStockService} from "../../Services/traitement-stock.service";
import {TransferToCribleLiwell} from "../../Models/TransferToCribleLiwell";

@Component({
  selector: 'app-cribleLiwell',
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
    AutoFocusModule,
    TooltipModule,
    MultiSelectModule,
    RippleModule

  ],
  templateUrl: './cribleLiwell.component.html',
  styleUrl: './cribleLiwell.component.css'
})
export class CribleLiwellComponent {
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
  cribleLiwells: CribleLiwell[] = [];

  cribleLiwell:CribleLiwell={};

  selectedCribleLiwells: CribleLiwell[] = [];
  selectedCribleLiwell:CribleLiwell={}
  private isUpdatecribleLiwell=false;
  sbnls: Sbnl[] = [];
  SelectAll: boolean = false;
  detailsDialog: boolean = false;
  TraitementStockDialog: boolean = false;
  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  public  _selectedColumns: any[]=[];
  traitementStock:TraitementStock=new TraitementStock();
  ListTraitementStock:TraitementStock[] =[];
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  constructor(  private messageService: MessageService,private sbnlService :SbnlService,private cribleLiwellService:CribleLiwellService,
                private traitementStockService:TraitementStockService) {}

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
    this.getCribleLiwell()
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'reference', header: 'reference' },
      { field: 'description', header: 'description' },
      { field: 'dateCreation', header: 'dateCreation' },
      { field: 'state', header: 'state' },
      { field: 'totalquantite', header: 'totalquantite' },
      { field: 'refusalquantite', header: 'refusalquantite' },
      { field: 'Sbnl', header: 'Sbnl' },
    ];


  }

  openNew() {
    this.cribleLiwell={};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedCribleLiwells() {

    this.deleteProductsDialog = true;

  }

  editCribleLiwell(cribleLiwell: CribleLiwell) {
    this.isUpdatecribleLiwell=true;


    this.cribleLiwell = { ...cribleLiwell };
    this.productDialog = true;
  }

  deleteCribleLiwell(cribleLiwell :CribleLiwell) {
    this.deleteProductDialog = true;
    this.cribleLiwell=cribleLiwell;

  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    // console.log(this.selectedCribleLiwells.length)
    this.selectedCribleLiwells.forEach(selectedCribleLiwell => {
      this.cribleLiwellService.deleteCribleLiwell(selectedCribleLiwell.id).subscribe(
        () => {
          this.cribleLiwells = this.cribleLiwells.filter(cribleLiwell =>cribleLiwell.id !== selectedCribleLiwell.id);
          this.messageService.add({ severity: 'success', summary: 'successful', detail: 'CribleLiwell Delete', life: 3000 });

        },
        (error) => {
          console.error( error);
          Swal.fire({
            icon: "error",
            title: "Can not deleted",
            text: "CribleLiwell related with Washed !",
          })
        }
      );
    });

    this.selectedCribleLiwells = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;

    if (this.cribleLiwell.id!= null) {
      this.cribleLiwellService.deleteCribleLiwell(this.cribleLiwell.id).subscribe(() => { this.cribleLiwells = this.cribleLiwells.filter(val => val.id !== this.cribleLiwell.id);
        this.messageService.add({ severity: 'success', summary: 'successful', detail: 'CribleLiwell Deleted', life: 3000 });

      },error => {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Can not deleted",
          text: "CribleLiwell related with Washed !",
        })
      });
    }

  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveCribleLiwell() {
    this.submitted = false;
    this.productDialog=false

    if(this.isUpdatecribleLiwell==true) {
      this.cribleLiwellService.updateCribleLiwell(this.cribleLiwell).subscribe(() =>{
        this.getCribleLiwell();
      });
      console.log('CribleLiwell updated');
      this.isUpdatecribleLiwell=false;
    }
    else
    {
      this.cribleLiwellService.addCribleLiwell(this.cribleLiwell).subscribe(() => {this.getCribleLiwell();});


    }
  }




  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getCribleLiwell() {
    this.loading=true ;

    this.cribleLiwellService.getAllCribleLiwellsDTO().subscribe((v:  CribleLiwell[]) => {
      this.cribleLiwells=v;
      this.loading=false ;

    },error => {
      console.log(error)})
    this.loading=true ;

    this.sbnlService.getAllSbnlsDTO()
      .subscribe((sbnls: Sbnl[]) => {
        this.sbnls = sbnls;
        this.loading=false ;

      }, error => {
        console.log('Error fetching users:', error);
      });
  }

  exportrapport(cribleLiwell: CribleLiwell) {
// console.log('=====>>>>> export: ',new JsonPipe().transform(cribleLiwell))
    this.selectedCribleLiwell = cribleLiwell;
    this.visiblePrint = true
    // console.log("---->"+new JsonPipe().transform(this.selectedCribleLiwell));
  }




  filtredate() {
    this.Viderfiltredate()
    const data=this.selectedCribleLiwell.analysesChimiques !== undefined ? this.selectedCribleLiwell.analysesChimiques : []
    const newAnalyse:AnalysesChimique[] =[]
    data.forEach(v => {
      if(v.dateAnalyse!==undefined){
        // console.log(typeof v.dateAnalyse )
        const d=v.dateAnalyse+"";
        const dateana:Date=new Date(d)
        // console.log("-D-->" + dateana)
        if (  this.AfterTodate(this.DatefiltrageStart,dateana) &&  this.AfterTodate(dateana,this.DatefiltrageEnd)) {
          newAnalyse.push(v);
        } else {
          console.log("no compare")
        }
      }
    })
    this.selectedCribleLiwell.analysesChimiques=[...newAnalyse] ;

  }

  clear(dt1: Table) {
    dt1.clear() ;
  }

  Viderfiltredate() {
    this.loading=true ;

    this.cribleLiwellService.getAllCribleLiwellsDTO().subscribe((cribleLiwell: CribleLiwell[]) => {
      this.cribleLiwells = cribleLiwell;

      const cribleLiwellCribleLiwell: CribleLiwell | undefined = this.cribleLiwells.find(value => this.selectedCribleLiwell.id == value.id)
      if (cribleLiwellCribleLiwell)
        this.selectedCribleLiwell = cribleLiwellCribleLiwell;
      this.loading=false ;

    });
  }

  getAnalyse() {

    return this.selectedCribleLiwell.analysesChimiques !== undefined ? this.selectedCribleLiwell.analysesChimiques : []
  }
  getAnalyseGranoli() {
    const data=this.selectedCribleLiwell.analysesPhysiques !== undefined ? this.selectedCribleLiwell.analysesPhysiques : []
    const newAnalyse:AnalysesPhysique[] =[]
    data.forEach(v => {
      if(v.dateAnalyse!==undefined){
        // console.log(typeof v.dateAnalyse )
        const d=v.dateAnalyse+"";
        const dateana:Date=new Date(d)
        // console.log("-D-->" + dateana)
        if (  this.AfterTodate(this.DatefiltrageStart,dateana) &&  this.AfterTodate(dateana,this.DatefiltrageEnd)) {
          newAnalyse.push(v);
          // console.log('ffffffffffff: ',v)
        } else {
          console.log("no compare")
        }
      }
    })
    // console.log('getAnalysePH: ',new JsonPipe().transform(newAnalyse))

    this.selectedCribleLiwell.analysesPhysiques=[...newAnalyse] ;
    // console.log('getAnalysePH: ',new JsonPipe().transform(this.selectedCribleLiwell.analysesPhysiques))
    return this.selectedCribleLiwell.analysesPhysiques !== undefined ? this.selectedCribleLiwell.analysesPhysiques : []
  }


  colsfiltre: any[] = [];
  // ListTamisSelected: Tamis={};
  SelectedCribleLiwellPrintAnalyse: AnalysesPhysique={};
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
    return this.SelectedCribleLiwellPrintAnalyse.tamisList==undefined?[]:this.SelectedCribleLiwellPrintAnalyse.tamisList
  }

  AfterTodate(date1:Date , date2:Date):boolean{
    // console.log(date1+"<"+date2)
    return date1.getDay()<=date2.getDay() && date1.getMonth()<=date2.getMonth() && date1.getFullYear()<=date2.getFullYear()
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
        [this.selectedCribleLiwell.reference, this.selectedCribleLiwell.dateStock]
      ];
      XLSX.utils.sheet_add_json(ws, bassinData, { origin: 'A6', skipHeader: true });

      // Add Analyse Physique data
      const analysePhyData = [
        [
          this.SelectedCribleLiwellPrintAnalyse.dateAnalyse,
          this.SelectedCribleLiwellPrintAnalyse.reference,
          this.SelectedCribleLiwellPrintAnalyse.matiere,
          this.SelectedCribleLiwellPrintAnalyse.temperature,
          this.SelectedCribleLiwellPrintAnalyse.description
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
      writeFile(wb, 'CribleLiwell Report.xlsx');
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
      const bassinData: string = [this.selectedCribleLiwell.reference, this.selectedCribleLiwell.dateStock].join(',');
      csvData.push(bassinData);

      // Add Analyse Physique data to the CSV data array
      const analysePhyData: string = [
        this.SelectedCribleLiwellPrintAnalyse.dateAnalyse,
        this.SelectedCribleLiwellPrintAnalyse.reference,
        this.SelectedCribleLiwellPrintAnalyse.matiere,
        this.SelectedCribleLiwellPrintAnalyse.temperature,
        this.SelectedCribleLiwellPrintAnalyse.description
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
      link.setAttribute('download', 'CribleLiwell_Report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting CSV file:', error);
    }
  }
  SelectAllCheck() {
    this.colsfiltre.forEach(value => {
      value.hide = this.SelectAll;
    })
  }

  protected readonly getToken = getToken;
  loading: boolean=false;
  public selectedSbnl: Sbnl={};


  public openDialog(b:CribleLiwell) {
    this.detailsDialog=true;
      this.cribleLiwell=b;
  }

  public AddTraitementStock(b: CribleLiwell) {
    // console.log("traitment")
    this.TraitementStockDialog=true;
    this.cribleLiwell=b;
    this. getListTraitementStock();
  }

  public saveTraitementStock() {

    if ( this.cribleLiwell.id!==undefined)
      this.traitementStockService.addTraitementStock(this.traitementStock,this.cribleLiwell.id).subscribe(value => {
        this. getListTraitementStock();
        this.traitementStock=new TraitementStock();
      })

  }
  getListTraitementStock(){
    if(this.cribleLiwell.id!=undefined)
      this.cribleLiwellService.getCribleLiwellById(this.cribleLiwell.id).subscribe(value => {
        if(value.traitementStocks!=undefined)
          this.ListTraitementStock = value.traitementStocks;
      } )
  }

  protected readonly TransferToCribleLiwell = TransferToCribleLiwell;

  public updateTraitementStock(traitement: TraitementStock) {
    this.traitementStock=traitement;

  }

  public saveUpdateTraitementStock() {
    this.traitementStockService.updateTraitementStock(this.traitementStock).subscribe(value => {
      this. getListTraitementStock();

    })
  }

  public deleteTraitementStock(traitementStock: TraitementStock) {
    this.traitementStockService.deleteTraitementStock(traitementStock.id).subscribe(value =>     this.ListTraitementStock= this.ListTraitementStock.filter(traitement => traitement.id !== traitementStock.id))

  }

  public getTotalQuantity(b: CribleLiwell) {
    let totalTransfer:number=0;
    let totalTraitment:number=0;

    if(b.traitementStocks!=undefined){
      totalTraitment= b.traitementStocks.reduce((sum, traitmentStock) => sum+traitmentStock.sortieB1+traitmentStock.sortieB2+traitmentStock.refus,0)
    }
    if(b.sbnlList!=undefined){
      b.sbnlList?.forEach(sbnl => {
        if(sbnl.transferToCribleLiwellList!=undefined)
          totalTransfer +=sbnl.transferToCribleLiwellList.reduce((sum, transfer) => sum + transfer.quantityTransfer, 0)
      } )}
    return totalTransfer-totalTraitment;
  }


}
