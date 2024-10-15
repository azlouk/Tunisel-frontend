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
 import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {Sbnl} from "../../Models/sbnl";
import {Bassin} from "../../Models/bassin";
import {SbnlService} from "../../Services/sbnl.service";
import {BassinService} from "../../Services/bassin.service";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {CheckboxModule} from "primeng/checkbox";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import {ListboxModule} from "primeng/listbox";
import {getToken} from "../../../main";
import {AutoFocusModule} from "primeng/autofocus";
import {TooltipModule} from "primeng/tooltip";
import * as XLSX from "xlsx";
import {writeFile} from "xlsx";
import Swal from "sweetalert2";
import {MultiSelectModule} from "primeng/multiselect";
import {RippleModule} from "primeng/ripple";
import {TransferToCribleLiwell} from "../../Models/TransferToCribleLiwell";
import {AnalyseChimiqueComponent} from "../analyse-chimique/analyse-chimique.component";
import {TransferToCribleLiwellService} from "../../Services/TransferToCribleLiwell.service";
import {CribleLiwell} from "../../Models/cribleLiwell";
import {CribleLiwellService} from "../../Services/cribleLiwell.service";
import {TransferToCrible} from "../../Models/transfer-to-crible";
import {Crible} from "../../Models/crible";
import {TransferToLaverie} from "../../Models/transfer-to-laverie";
import {Laverie} from "../../Models/laverie";
import {CribleService} from "../../Services/crible.service";
import {LaverieService} from "../../Services/laverie.service";
import {TransferToCribleService} from "../../Services/transfer-to-crible.service";
import {TransferToLaverieService} from "../../Services/transfer-to-laverie.service";
import {LoginService} from "../../Services/login.service";

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
    ListboxModule,
    AutoFocusModule,
    TooltipModule,
    MultiSelectModule,
    RippleModule,
    AnalyseChimiqueComponent
  ],
  templateUrl: './sbnl.component.html',
  styleUrl: './sbnl.component.css'
})
export class SbnlComponent implements OnInit{
  productDialog: boolean = false;
  detailsDialog: boolean = false;

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
  selectedLaverie:Laverie=new Laverie();
  selectedCribleVert:Crible=new Crible();
  selectedCribleLiwell:CribleLiwell= {};
   isUpdatesbnl=false;
  bassins: Bassin[] = [];

  SelectAll: boolean = false;
  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  public  _selectedColumns: any[]=[];
  selectedBassin:Bassin={};
  TransferToDialog:boolean=false;
  transferToCribleLiwell:TransferToCribleLiwell=new TransferToCribleLiwell();
  ListTransferToCribleLiwell:TransferToCribleLiwell[] =[];
  listCribleLiwells:CribleLiwell[]=[];
  ingredient: string='liwellSieve';
  transferToCribleVert:TransferToCrible=new TransferToCrible();
  ListTransferToCribleVert:TransferToCrible[] =[];
  listCribleVerts:Crible[]=[];
  transferToLaverie:TransferToLaverie=new TransferToLaverie();
  ListTransferToLaverie:TransferToLaverie[] =[];
  listLaveries:Laverie[]=[];
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  constructor(  private messageService: MessageService,
                private sbnlService :SbnlService,
                private serviceBassin:BassinService,
                private transferToCribleLiwellService:TransferToCribleLiwellService,
                private cribleLiwellService:CribleLiwellService,
                private cribleVertservice:CribleService,
                private laverieService:LaverieService,
                private transferToCribleVertService:TransferToCribleService,
                private transferToLaverieService:TransferToLaverieService) {}


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
this.getsbnl()
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'reference', header: 'reference' },
      { field: 'description', header: 'description' },
      { field: 'dateCreation', header: 'dateCreation' },
      { field: 'quantite', header: 'nom' },
      { field: 'emplacement', header: 'emplacement' },
      { field: 'pond', header: 'pond' },
    ];

    this.getAllCribleLiwells();
    this.getAllCribleVerts();
    this.getAllLaveries();
  }
 getAllCribleLiwells(){
    this.cribleLiwellService.getAllCribleLiwellsDTO().subscribe(value => this.listCribleLiwells=value)
 }
  openNew() {
    this.sbnl = {};
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
    this.selectedSbnls.forEach(selectedSbnl => {
      this.sbnlService.deleteSbnl(selectedSbnl.id).subscribe(
        () => {
          this.sbnls = this.sbnls.filter(sbnl =>sbnl.id !== selectedSbnl.id);
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Can not deleted",
            text: "Unwashed related with band !",
          })
          console.error( error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Unwashed Deleted', life: 3000 });
    this.selectedSbnls = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.sbnls = this.sbnls.filter(val => val.id !== this.sbnl.id);
    if (this.sbnl.id!= null) {
      this.sbnlService.deleteSbnl(this.sbnl.id).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Unwashed Deleted', life: 3000 });
      },error => {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Can not deleted",
          text: "Unwashed related with band !",
        })
      });
    }

  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveSbnl() {
    this.submitted = true;

    if (this.sbnl.reference?.trim() && this.sbnl.bassinList!=undefined && this.sbnl.bassinList?.length>0) {

      this.productDialog = false

      if (this.isUpdatesbnl == true) {
        this.sbnlService.updateSbnl(this.sbnl).subscribe(() => {
          this.sbnlService.getAllSbnlsDTO().subscribe((sbnls: Sbnl[]) => {
            this.sbnls = sbnls;
          });
        });
        console.log('Sbnl updated');
        this.isUpdatesbnl = false;
      } else {
        this.sbnlService.addSbnl(this.sbnl).subscribe(() => {
          this.sbnlService.getAllSbnlsDTO()
            .subscribe((sbnls: Sbnl[]) => {
              this.sbnls = sbnls;
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
    this.loading=true
    this.sbnlService.getAllSbnlsDTO().subscribe((v:  Sbnl[]) => {
      this.sbnls=v;
      this.loading=false
    },error => {
      console.log(error)})
    this.serviceBassin.getAllBassinsDTO()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;
      }, error => {
        console.log('Error fetching users:', error);
      });
  }

  exportrapport(sbnl: Sbnl) {

    this.selectedSbnl = sbnl;
    this.visiblePrint = true
    if(this.selectedSbnl){
      if(this.selectedSbnl.analysesChimiques)
      console.log("---->"+new JsonPipe().transform(this.selectedSbnl.analysesChimiques[0]));

    }
  }

  Detailsbnl(sbnl: Sbnl) {

  }


  filtredate() {
this.Viderfiltredate()
    const data=this.selectedSbnl.analysesChimiques !== undefined ? this.selectedSbnl.analysesChimiques : []
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
    this.selectedSbnl.analysesChimiques=[...newAnalyse] ;
    // console.log(new JsonPipe().transform(data))



  }

  clear(dt1: Table) {
    dt1.clear() ;
  }

  Viderfiltredate() {

    this.sbnlService.getAllSbnlsDTO().subscribe((sbnl: Sbnl[]) => {
      this.sbnls = sbnl;

      const sbnlSbnl: Sbnl | undefined = this.sbnls.find(value => this.selectedSbnl.id == value.id)
      if (sbnlSbnl)
        this.selectedSbnl = sbnlSbnl;

    });
  }

  getAnalyse() {
    return this.selectedSbnl.analysesChimiques !== undefined ? this.selectedSbnl.analysesChimiques : []
  }
  getAnalyseGranoli() {
    const data=this.selectedSbnl.analysesPhysiques !== undefined ? this.selectedSbnl.analysesPhysiques : []
    const newAnalyse:AnalysesPhysique[] =[]
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
    this.selectedSbnl.analysesPhysiques=[...newAnalyse] ;

    return this.selectedSbnl.analysesPhysiques !== undefined ? this.selectedSbnl.analysesPhysiques : []
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

  // AfterTodate(date1:Date , date2:Date):boolean{
  //   console.log(date1+"<"+date2)
  //   return date1.getDay()<=date2.getDay() && date1.getMonth()<=date2.getMonth() && date1.getFullYear()<=date2.getFullYear()
  // }
  AfterTodate(date1: Date, date2: Date): boolean {
    return date1.getTime() <= date2.getTime();
  }

    protected readonly getToken = getToken;
  loading: boolean=false;

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
        [this.selectedSbnl.reference, this.selectedSbnl.dateStock]
      ];
      XLSX.utils.sheet_add_json(ws, bassinData, { origin: 'A6', skipHeader: true });

      // Add Analyse Physique data
      const analysePhyData = [
        [
          this.SelectedsbnlPrintAnalyse.dateAnalyse,
          this.SelectedsbnlPrintAnalyse.reference,
          this.SelectedsbnlPrintAnalyse.matiere,
          this.SelectedsbnlPrintAnalyse.temperature,
          this.SelectedsbnlPrintAnalyse.description
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
      writeFile(wb, 'Unwashed Report.xlsx');
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
      const bassinData: string = [this.selectedSbnl.reference, this.selectedSbnl.dateStock].join(',');
      csvData.push(bassinData);

      // Add Analyse Physique data to the CSV data array
      const analysePhyData: string = [
        this.SelectedsbnlPrintAnalyse.dateAnalyse,
        this.SelectedsbnlPrintAnalyse.reference,
        this.SelectedsbnlPrintAnalyse.matiere,
        this.SelectedsbnlPrintAnalyse.temperature,
        this.SelectedsbnlPrintAnalyse.description
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
      link.setAttribute('download', 'Unwashed_Report.csv');
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

  protected readonly JsonPipe = JsonPipe;
  protected readonly JSON = JSON;


  public openDialog() {
  this.detailsDialog=true;
  }

  public AddTransferTo(sbnl: Sbnl) {
  this.TransferToDialog=true;
  this.sbnl=sbnl;
  this. getListTransferToCribleLiwell();
  this. getListTransferToCribleVert();
  this. getListTransferToLaverie();
  }

  public saveTransferToCribleLiwell() {
      if ( this.sbnl.id!==undefined&&this.selectedCribleLiwell.reference!==undefined)
      {
        this.transferToCribleLiwell.referenceCribleLiwell=this.selectedCribleLiwell.reference;
        this.transferToCribleLiwellService.addTransferToCribleLiwell(this.transferToCribleLiwell,this.sbnl.id).subscribe(value => {
          this. getListTransferToCribleLiwell();
          this.transferToCribleLiwell=new TransferToCribleLiwell();
        })   }
  }

  public updateTransferToCribleLiwell(transferToCribleLiwell: TransferToCribleLiwell) {
this.transferToCribleLiwell=transferToCribleLiwell;
  }

  public saveUpdateTransferToCribleLiwell() {
    this.transferToCribleLiwellService.updateTransferToCribleLiwell(this.transferToCribleLiwell).subscribe(value => {
      this. getListTransferToCribleLiwell();
      this.transferToCribleLiwell=new TransferToCribleLiwell();


    })
  }

  public deleteTransferToCribleLiwell(transferToCribleLiwell: any) {
    this.transferToCribleLiwellService.deleteTransferToCribleLiwell(transferToCribleLiwell.id).subscribe(value =>     this.ListTransferToCribleLiwell= this.ListTransferToCribleLiwell.filter(transfer => transfer.id !== transferToCribleLiwell.id))

  }

  getListTransferToCribleLiwell(){
    if(this.sbnl.id!=undefined)
    this.sbnlService.getSbnlByIdDto(this.sbnl.id).subscribe(value => {
      if(value.transferToCribleLiwellList!=undefined)
      this.ListTransferToCribleLiwell = value.transferToCribleLiwellList;
    } )
  }

  public getQuantitySbnl(sbnl: Sbnl) {
    let totalTransferCribleLiwell:number=0;
    let totalTransferCribleVert:number=0;
    let totalTransferLaverie:number=0;
    let totalRecolte:number=0;


    if(sbnl.transferToCribleLiwellList!=undefined)
      totalTransferCribleLiwell= sbnl.transferToCribleLiwellList.reduce((sum, transfer) => sum+transfer.quantityTransfer,0)
    if(sbnl.transferToCribleVertList!=undefined)
      totalTransferCribleVert= sbnl.transferToCribleVertList.reduce((sum, transfer) => sum+transfer.quantityTransfer,0)
    if(sbnl.transferToLaverieList!=undefined)
      totalTransferLaverie= sbnl.transferToLaverieList.reduce((sum, transfer) => sum+transfer.quantityTransfer,0)

 if(sbnl.bassinList!=undefined){
   const dateDebutHarvest = sbnl.dateDebutHarvest ? new Date(sbnl.dateDebutHarvest) : null;
   const dateFinHarvest = sbnl.dateFinHarvest ? new Date(sbnl.dateFinHarvest) : null;
   if (dateDebutHarvest && dateFinHarvest) { // Ensure both dates are valid
     sbnl.bassinList?.forEach(bassin => {
       if (bassin.recolteList != undefined) {
         totalRecolte += bassin.recolteList
           .filter(recolte => {
             const recolteDate = recolte.dateCreation ? new Date(recolte.dateCreation) : null;
             return recolteDate && recolteDate >= dateDebutHarvest && recolteDate <= dateFinHarvest;
           })
           .reduce((sum, recolte) => sum + recolte.value, 0);
       }
     });
   }
 }

return totalRecolte-(totalTransferCribleLiwell+totalTransferCribleVert+totalTransferLaverie);
  }

  public saveTransferToLaverie() {
    if ( this.sbnl.id!==undefined){
      this.transferToLaverie.referenceLaverie=this.selectedLaverie.reference;
      this.transferToLaverieService.addTransferToLaverie(this.transferToLaverie,this.sbnl.id).subscribe(value => {
        this.getListTransferToLaverie();
        this.transferToLaverie=new TransferToLaverie();
      })
    }
  }
  getListTransferToLaverie(){
    if(this.sbnl.id!=undefined)
      this.sbnlService.getSbnlByIdDto(this.sbnl.id).subscribe(value => {

        if(value.transferToLaverieList!=undefined)
          this.ListTransferToLaverie = value.transferToLaverieList;
      } )
  }
  public saveTransferToCribleVert() {
    if ( this.sbnl.id!==undefined){
      this.transferToCribleVert.referenceCribleVert=this.selectedCribleVert.reference;
      this.transferToCribleVertService.addTransferToCrible(this.transferToCribleVert,this.sbnl.id).subscribe(value => {
        this.getListTransferToCribleVert();
        this.transferToCribleVert=new TransferToCrible();
      },error => {
        console.log(error)
      })    }
  }

  getListTransferToCribleVert(){
    if(this.sbnl.id!=undefined)
      this.sbnlService.getSbnlByIdDto(this.sbnl.id).subscribe(value => {
        if(value.transferToCribleVertList!=undefined)
          this.ListTransferToCribleVert = value.transferToCribleVertList;
      } )
  }


  getAllCribleVerts(){
    this.cribleVertservice.getAllCriblesDto().subscribe(value => this.listCribleVerts=value)
  }
  public deleteTransferToCribleVert(transferToCribleVert: TransferToCrible) {
    this.transferToCribleVertService.deleteTransferToCrible(transferToCribleVert.id).subscribe(value =>     this.ListTransferToCribleVert= this.ListTransferToCribleVert.filter(transfer => transfer.id !== transferToCribleVert.id))

  }

  public saveUpdateTransferToCribleVert() {
    this.transferToCribleVertService.updateTransferToCrible(this.transferToCribleVert).subscribe(value => {
      this. getListTransferToCribleVert();
      this.transferToCribleVert=new TransferToCrible();

    })
  }

  public updateTransferToCribleVert(transferToCribleVert: TransferToCrible) {
    this.transferToCribleVert=transferToCribleVert;

  }
  getAllLaveries(){
    this.laverieService.getAllLaveries().subscribe(value => this.listLaveries=value)
  }
  public deleteTransferToLaverie(transferToLaundry: TransferToLaverie) {
    this.transferToLaverieService.deleteTransferToLaverie(transferToLaundry.id).subscribe(value =>     this.ListTransferToLaverie= this.ListTransferToLaverie.filter(transfer => transfer.id !== transferToLaundry.id))

  }

  public saveUpdateTransferToLaverie() {
    this.transferToLaverieService.updateTransferToLaverie(this.transferToLaverie).subscribe(value => {
      this. getListTransferToLaverie();
      this.transferToLaverie=new TransferToLaverie();

    })
  }

  public updateTransferToLaverie(transferToLaundry: TransferToLaverie) {
    this.transferToLaverie=transferToLaundry;

  }
}
