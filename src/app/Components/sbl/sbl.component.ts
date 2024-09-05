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
import {getToken} from "../../../main";
import {AutoFocusModule} from "primeng/autofocus";
import {TooltipModule} from "primeng/tooltip";
import * as XLSX from "xlsx";
import {writeFile} from "xlsx";
import Swal from "sweetalert2";
import {MultiSelectModule} from "primeng/multiselect";
import {Crible} from "../../Models/crible";
import {CribleService} from "../../Services/crible.service";
import {Concasseur} from "../../Models/concasseur";
import {ConcasseurService} from "../../Services/concasseur.service";
import {transferArrayItem} from "@angular/cdk/drag-drop";
import {RippleModule} from "primeng/ripple";

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
    DatePipe, CommonModule, AutoFocusModule, TooltipModule, MultiSelectModule, RippleModule,

  ],
  templateUrl: './sbl.component.html',
  styleUrl: './sbl.component.css'
})
export class SblComponent implements OnInit {
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

  sbl: Sbl = {};

  selectedSbls: Sbl[] = [];
  bandes: Bande[] = [];
  Selectetsbl: Sbl = {}
  private isUpdateSbl = false;
  SelectAll: boolean = false;
  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  public _selectedColumns: any[] = [];
  cribles: Crible[] = [];
  concasseurs: Concasseur[] = [];
  calibres: number[] = [];
  detailsDialog: boolean=false;
  detailsDialogCrible: boolean=false;
  detailsDialogConcasseur: boolean=false;
  selectedBande:Bande={};
  selectedCrible:Crible=new Crible();
  selectedConcasseur:Concasseur=new Concasseur();
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  constructor(private messageService: MessageService, private sblService: SblService,
              private bandeService: BandeService,
              private cribleService: CribleService,
              private concasseurService: ConcasseurService) {
  }

  ngOnInit() {
    this.colsfiltre = [
      {id: 0, field: 'reference', header: 'reference', hide: true},
      {id: 1, field: 'dateAnalyse', header: 'Date Analyse', hide: false},
      {id: 2, field: 'temperature', header: 'Temperature ', hide: false},
      {id: 3, field: 'vent', header: 'wind ', hide: false},
      {id: 4, field: 'humidite', header: 'humidity', hide: false},
      {id: 5, field: 'densite', header: 'Densite ', hide: false},
      {id: 6, field: 'matiereEnSuspension', header: 'Suspended Matter ', hide: false},
      {id: 7, field: 'salinite', header: 'salinite ', hide: false},
      {id: 8, field: 'calcium', header: 'Calcium ', hide: false},
      {id: 9, field: 'magnesium', header: 'Magnesium ', hide: false},
      {id: 10, field: 'sulfate', header: 'Sulfate ', hide: false},
      {id: 11, field: 'matiereInsoluble', header: 'Insoluble matter ', hide: false},
      {id: 12, field: 'potassium', header: 'Potassium ', hide: false},
      {id: 13, field: 'sodium', header: 'Sodium ', hide: false},
      {id: 14, field: 'chlorure', header: 'Chlorure ', hide: false},
      {id: 15, field: 'ph', header: 'pH', hide: false},
      {id: 16, field: 'chlorureDeSodium', header: 'sodium chloride ', hide: false},
      {id: 17, field: 'ferrocyanure', header: 'Ferrocyanure ', hide: false},
    ];

    this._selectedColumns = this.colsfiltre;
    this.getAllSbl();
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
    this.getAllCribles();
    this.getAllConcasseurs();

  }

  getAllCribles() {
    this.loading = true;

    this.cribleService.getAllCribles().subscribe((value: Crible[]) => {
      this.cribles = value;
      this.loading = false;

    }, error => {
      console.log(error)
    })

  }

  getAllConcasseurs() {
    this.loading = true;

    this.concasseurService.getAllConcasseurs().subscribe((value: Concasseur[]) => {
      this.concasseurs = value;
      this.loading = false;

    }, error => {
      console.log(error)
    })
  }

  openNew() {
    this.sbl = {};
    console.log("sbl: " + new JsonPipe().transform(this.sbl.bandeList))
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedSbls() {

    this.deleteProductsDialog = true;

  }

  editSbl(sbl: Sbl) {
    this.isUpdateSbl = true;
    this.sbl = {...sbl};
    this.productDialog = true;
    this.getCalibresBySelectedBandes(sbl.bandeList);
  }

  deleteSbl(sbl: Sbl) {
    this.deleteProductDialog = true;
    this.sbl = {...sbl};
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.selectedSbls.forEach(selectedSbl => {
      this.sblService.deleteSbl(selectedSbl.id).subscribe(
        () => {
          this.sbls = this.sbls.filter(sbl => sbl.id !== selectedSbl.id);
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Sbl Deleted', life: 3000});

        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Can not deleted",
            text: "Washed related with Washed ship !",
          })
          console.error(error);
        }
      );
    });

  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.sbl.id", this.sbl.id);
    if (this.sbl.id != null) {
      this.sblService.deleteSbl(this.sbl.id).subscribe(() => {
        this.sbls = this.sbls.filter(val => val.id !== this.sbl.id);

        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Sbl Deleted', life: 3000});

      }, error => {
        Swal.fire({
          icon: "error",
          title: "Can not deleted",
          text: "Washed related with Washed ship !",
        })
        console.log(error)
      });
    }
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveSbl() {
    this.submitted = false;
    this.productDialog = false
    if (this.isUpdateSbl == true) {
      this.sblService.updateSbl(this.sbl).subscribe(() => {
        this.sblService.getAllSblDTO().subscribe((sbls: Sbl[]) => {
          this.sbls = sbls;

        });
      });
      console.log('Sbl updated');

      this.isUpdateSbl = false;
    } else {
      this.sblService.addSbl(this.sbl).subscribe(() => {
        this.sblService.getAllSblDTO().subscribe((sbls: Sbl[]) => {
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
    this.loading = true;

    this.sblService.getAllSblDTO().subscribe((v: Sbl[]) => {
      this.sbls = v;
      // console.log(new JsonPipe().transform("====================>>>>>>"+this.sbls))
      this.loading = false;

    }, error => {
      console.log(error)
    })
    this.loading = true;

    this.bandeService.getAllBandesDTO().subscribe((v: Sbnl[]) => {
      this.bandes = v;
      this.loading = false;

    }, error => {
      console.log(error)
    })
  }


  exportrapport(Sbl: Sbl) {

    this.Selectetsbl = Sbl;
    this.visiblePrint = true
    console.log("---->" + new JsonPipe().transform(this.Selectetsbl));
  }


  filtredate() {
    this.Viderfiltredate()
    const data = this.Selectetsbl.analysesChimiques !== undefined ? this.Selectetsbl.analysesChimiques : []
    const newAnalyse: AnalysesChimique[] = []
    data.forEach(v => {

      if (v.dateAnalyse !== undefined) {
        console.log(typeof v.dateAnalyse)
        const d = v.dateAnalyse + "";
        const dateana: Date = new Date(d)
        console.log("-D-->" + dateana)
        if (this.AfterTodate(this.DatefiltrageStart, dateana) && this.AfterTodate(dateana, this.DatefiltrageEnd)) {
          newAnalyse.push(v);
        } else {
          console.log("no compare")
        }


      }

    })
    this.Selectetsbl.analysesChimiques = [...newAnalyse];
    // console.log(new JsonPipe().transform(data))


  }

  clear(dt1: Table) {
    dt1.clear();
  }

  Viderfiltredate() {

    this.sblService.getAllSblDTO().subscribe((sbl: Sbl[]) => {
      this.sbls = sbl;

      const sblsbl: Sbl | undefined = this.sbls.find(value => this.Selectetsbl.id == value.id)
      if (sblsbl)
        this.Selectetsbl = sblsbl;

    });
  }

  getAnalyse() {
    return this.Selectetsbl.analysesChimiques !== undefined ? this.Selectetsbl.analysesChimiques : []
  }

  getAnalyseGranoli() {
    const data = this.Selectetsbl.analysesPhysiques !== undefined ? this.Selectetsbl.analysesPhysiques : []
    const newAnalyse: AnalysesPhysique[] = []
    data.forEach(v => {

      if (v.dateAnalyse !== undefined) {
        console.log(typeof v.dateAnalyse)
        const d = v.dateAnalyse + "";
        const dateana: Date = new Date(d)
        console.log("-D-->" + dateana)
        if (this.AfterTodate(this.DatefiltrageStart, dateana) && this.AfterTodate(dateana, this.DatefiltrageEnd)) {
          newAnalyse.push(v);
        } else {
          console.log("no compare")
        }

      }

    })
    this.Selectetsbl.analysesPhysiques = [...newAnalyse];

    return this.Selectetsbl.analysesPhysiques !== undefined ? this.Selectetsbl.analysesPhysiques : []
  }


  colsfiltre: any[] = [];
  // ListTamisSelected: Tamis={};
  SelectedsbnlPrintAnalyse: AnalysesPhysique = {};

  getColsfiltr() {
    return this.colsfiltre.filter(value => value.hide == true)
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
    return this.SelectedsbnlPrintAnalyse.tamisList == undefined ? [] : this.SelectedsbnlPrintAnalyse.tamisList
  }

  AfterTodate(date1: Date, date2: Date): boolean {
    console.log(date1 + "<" + date2)
    return date1.getDay() <= date2.getDay() && date1.getMonth() <= date2.getMonth() && date1.getFullYear() <= date2.getFullYear()
  }

  protected readonly getToken = getToken;
  loading: boolean = false;

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
      XLSX.utils.sheet_add_aoa(ws, headers.titre, {origin: 'D1'});
      XLSX.utils.sheet_add_aoa(ws, headers.titre1, {origin: 'A3'});
      XLSX.utils.sheet_add_aoa(ws, headers.titreBassin, {origin: 'A5'});
      XLSX.utils.sheet_add_aoa(ws, headers.titre2, {origin: 'A14'});
      XLSX.utils.sheet_add_aoa(ws, headers.titreAnalysePhysique, {origin: 'A16'});

      // Add Bassin data
      const bassinData = [
        [this.Selectetsbl.reference, this.Selectetsbl.dateStock]
      ];
      XLSX.utils.sheet_add_json(ws, bassinData, {origin: 'A6', skipHeader: true});

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
      XLSX.utils.sheet_add_json(ws, analysePhyData, {origin: 'A17', skipHeader: true});

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

          let tableData: any[][] = XLSX.utils.sheet_to_json(wsTable, {header: 1}) as any[][];

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
          XLSX.utils.sheet_add_aoa(ws, formattedTableData, {origin: `A${startRow}`});
        }
      };
      // Add HTML table data to worksheet
      addTableDataToSheet('EXCEL', 8);
      addTableDataToSheet('TAMIS', 20);

      // Append worksheet to workbook and save the file
      XLSX.utils.book_append_sheet(wb, ws, 'Fiche de Vie');
      writeFile(wb, 'Washed Report.xlsx');
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
      const bassinData: string = [this.Selectetsbl.reference, this.Selectetsbl.dateStock].join(',');
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

          let tableData: any[][] = XLSX.utils.sheet_to_json(wsTable, {header: 1}) as any[][];

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
      const blob: Blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      const url: string = URL.createObjectURL(blob);

      // Create a link and trigger the download
      const link: HTMLAnchorElement = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'Washed_Report.csv');
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


  getCalibresBySelectedBandes(bandesList: Bande[] | undefined) {
    const uniqueCalibres = new Set<number>(); // Use Set to avoid duplicates
    if (bandesList !== undefined) {
      bandesList.forEach(bande =>
        bande.traitementStocks?.forEach(traitement => {
          uniqueCalibres.add(traitement.calibreB1); // Add calibreB1
          uniqueCalibres.add(traitement.calibreB2); // Add calibreB2
        })
      );

      this.calibres = Array.from(uniqueCalibres); // Convert Set back to array
    }
  }

  public getTotalQuantitySbl(sbl: Sbl):number {
    let totalCrible: number = 0;
    let totalConcasseur: number = 0;
    let totalBande: number = 0;

    // Calculate totalBande
    if (sbl.bandeList && sbl.bandeList.length > 0) {
      sbl.bandeList.forEach(bande => {
        bande.traitementStocks?.forEach(traitement => {
          if (traitement.calibreB1 === sbl.calibre) {
            totalBande += traitement.sortieB1;
          }
          if (traitement.calibreB2 === sbl.calibre) {
            totalBande += traitement.sortieB2;
          }
        });
      });
    }

    // Calculate totalCrible
    if (sbl.cribleList && sbl.cribleList.length > 0) {
      sbl.cribleList.forEach(crible => {
        totalCrible += crible.resultCribles?.reduce((sum, result) => sum + result.bigSalt, 0) || 0;
      });
    }

    // Calculate totalConcasseur
    if (sbl.concasseurList && sbl.concasseurList.length > 0) {
      sbl.concasseurList.forEach(concasseur => {
        totalConcasseur += concasseur.resultConcasseurs?.reduce((sum, resultConcasseur) => sum + resultConcasseur.result, 0) || 0;
      });
    }

    return totalCrible+ totalConcasseur +totalBande;
  }


  public openDialogBand(sbl: Sbl) {
    this.detailsDialog=true;
    this.sbl=sbl;
  }


  public openDialogCrible(sbl: Sbl) {
    this.detailsDialogCrible=true;
    this.sbl=sbl;
  }

  public openDialogConcasseur(sbl: any) {
    this.detailsDialogConcasseur=true;
    this.sbl=sbl;
  }
}
