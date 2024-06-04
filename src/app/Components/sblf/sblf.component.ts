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
import {TooltipModule} from "primeng/tooltip";
import * as XLSX from "xlsx";
import {writeFile} from "xlsx";
import Swal from "sweetalert2";

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
    CheckboxModule, CommonModule, AutoFocusModule, TooltipModule,

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
  SelectAll: boolean = false;
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
      { field: 'dateStock', header: 'dateStock' },
      { field: 'emplacement', header: 'emplacement' },
      { field: 'etat', header: 'etat' },
      { field: 'quantite', header: 'quantite' },
      { field: 'type', header: 'type' },
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
    this.selectedSblfs.forEach(selectedSblf => {
      this.sblfService.deleteSblf(selectedSblf.id).subscribe(
        () => {
          this.sblfs = this.sblfs.filter(sblf =>sblf.id !== selectedSblf.id);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sblf Deleted', life: 3000 });

        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Can not deleted",
            text: "Washed ship related with  Chemical and Granulometric Analysis !",
          })
          console.error( error);
        }
      );
    });


  }

  confirmDelete() {
    this.deleteProductDialog = false;
    if (this.sblf.id!= null) {
      this.sblfService.deleteSblf(this.sblf.id).subscribe(() => {
        this.sblfs = this.sblfs.filter(val => val.id !== this.sblf.id);

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sblf Deleted', life: 3000 });

      },error => {
        Swal.fire({
          icon: "error",
          title: "Can not deleted",
          text: "Washed ship related with  Chemical and Granulometric Analysis !",
        })
        console.log(error)
      });
    }
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
          this.sblfService.getAllSblfsDTO().subscribe((sblfs: Sblf[]) => {
            this.sblfs = sblfs;
          });
        });
        console.log('Sbl updated');
        this.isUpdateSblf = false;
      } else {
        this.sblfService.addSblf(this.sblf).subscribe(() => {
          this.sblfService.getAllSblfsDTO().subscribe((sblfs: Sblf[]) => {
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
    this.loading=true ;
    this.sblfService.getAllSblfsDTO().subscribe((v:  Sblf[]) => {
      this.sblfs=v;
      this.loading=false ;

    },error => {
      console.log(error)})
    this.loading=true ;

    this.sblService.getAllSblDTO().subscribe((v:  Sbl[]) => {
      this.sbls=v;
      this.loading=false ;


    },error => {
      console.log(error)})
  }

  exportrapport(sbnl: Sbnl) {

    this.selectedSblf = sbnl;
    this.visiblePrint = true
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

    this.sblfService.getAllSblfsDTO().subscribe((Sblf: Sblf[]) => {
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
  SelectedslfPrintAnalyse: AnalysesPhysique={};
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
    return this.SelectedslfPrintAnalyse.tamisList==undefined?[]:this.SelectedslfPrintAnalyse.tamisList
  }




  AfterTodate(date1:Date , date2:Date):boolean{
    console.log(date1+"<"+date2)
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
        [this.selectedSblf.reference, this.selectedSblf.dateStock]
      ];
      XLSX.utils.sheet_add_json(ws, bassinData, { origin: 'A6', skipHeader: true });

      // Add Analyse Physique data
      const analysePhyData = [
        [
          this.SelectedslfPrintAnalyse.dateAnalyse,
          this.SelectedslfPrintAnalyse.reference,
          this.SelectedslfPrintAnalyse.matiere,
          this.SelectedslfPrintAnalyse.temperature,
          this.SelectedslfPrintAnalyse.description
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
      writeFile(wb, 'Wached-Ship Report.xlsx');
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
      const bassinData: string = [this.selectedSblf.reference, this.selectedSblf.dateStock].join(',');
      csvData.push(bassinData);

      // Add Analyse Physique data to the CSV data array
      const analysePhyData: string = [
        this.SelectedslfPrintAnalyse.dateAnalyse,
        this.SelectedslfPrintAnalyse.reference,
        this.SelectedslfPrintAnalyse.matiere,
        this.SelectedslfPrintAnalyse.temperature,
        this.SelectedslfPrintAnalyse.description
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
      link.setAttribute('download', 'Wached-Ship_Report.csv');
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
}
