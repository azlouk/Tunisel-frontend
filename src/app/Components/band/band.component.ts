import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../Models/product";
import {Sbl} from "../../Models/sbl";
import {CribleLiwell} from "../../Models/cribleLiwell";
import {Crible} from "../../Models/crible";
import {Concasseur} from "../../Models/concasseur";
import {MessageService, SharedModule} from "primeng/api";
import {SblService} from "../../Services/sbl.service";
import {CribleLiwellService} from "../../Services/cribleLiwell.service";
import {CribleService} from "../../Services/crible.service";
import {ConcasseurService} from "../../Services/concasseur.service";
import Swal from "sweetalert2";
import {Table, TableModule} from "primeng/table";
import {Sbnl} from "../../Models/sbnl";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import {writeFile} from "xlsx";
import {AutoFocusModule} from "primeng/autofocus";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {TooltipModule} from "primeng/tooltip";
import {getToken} from "../../../main";
import {Band} from "../../Models/band";
import {BandService} from "../../Services/band.service";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {SbnlService} from "../../Services/sbnl.service";
import {Laverie} from "../../Models/laverie";
import {LaverieService} from "../../Services/laverie.service";

@Component({
  selector: 'app-band',
  standalone: true,
  imports: [
    AutoFocusModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DatePipe,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ListboxModule,
    MultiSelectModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RippleModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    FormsModule,
    NgClass,
    RadioButtonModule,
    InputNumberModule
  ],
  templateUrl: './band.component.html',
  styleUrl: './band.component.css'
})
export class BandComponent implements OnInit{
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
  bands: Band[] = [];

  band: Band = new Band();

  selectedBands: Sbl[] = [];
  cribleLiwells: CribleLiwell[] = [];
  SelectetBand: Sbl = {}
  public isUpdateBand = false;
  SelectAll: boolean = false;
  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  public _selectedColumns: any[] = [];
  listCribles: Crible[] = [];
  listConcasseurs: Concasseur[] = [];
  calibres: number[] = [];
  detailsDialog: boolean=false;

  selectedFromCribleLiwell:CribleLiwell={};
  selectedToCribleLiwell:CribleLiwell={};
  listCribleLiwells:CribleLiwell[]=[];
  selectedFromCrible:Crible=new Crible();
  selectedToCrible:Crible=new Crible();
  selectedConcasseur:Concasseur=new Concasseur();
  selectedFromSbnl:Sbnl={};
  listSbnls:Sbnl[]=[];
  selectedFromLaverie:Laverie=new Laverie();
  selectedToLaverie:Laverie=new Laverie();
  listLaverie:Laverie[]=[];
  selectedToWashed:Sbl={}
  listWasheds:Sbl[]=[];
  froms:string="unwashed"
  tos:string="washed"
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  constructor(private messageService: MessageService,
              private sblService: SblService,
              private cribleLiwellService: CribleLiwellService,
              private cribleService: CribleService,
              private concasseurService: ConcasseurService,
              private bandService:BandService,
              private sbnlService:SbnlService,
              private laverieService:LaverieService) {
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
    this.getAllBands();
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
    this.getAllCriblesLiwell();
    this.getAllSbnls();
    this.getAllLaveries();
    this.getAllSbl();

  }

  getAllCribles() {
    this.loading = true;

    this.cribleService.getAllCriblesDto().subscribe((value: Crible[]) => {
      this.listCribles = value;
      this.loading = false;

    }, error => {
      console.log(error)
    })

  }

  getAllConcasseurs() {
    this.loading = true;

    this.concasseurService.getAllConcasseurs().subscribe((value: Concasseur[]) => {
      this.listConcasseurs = value;
      this.loading = false;

    }, error => {
      console.log(error)
    })
  }

  getAllCriblesLiwell(){
    this.cribleLiwellService.getAllCribleLiwellsDTO().subscribe(value => {
      this.listCribleLiwells=value
    },error => {
      console.log(error)})
  }
  getAllSbnls(){
    this.sbnlService.getAllSbnlsDTO().subscribe(value => {
      this.listSbnls=value
    },error => {
      console.log(error)})
  }
  getAllLaveries(){
    this.laverieService.getAllLaveriesDto().subscribe(value => {
      this.listLaverie=value
    },error => {
      console.log(error)})
  }
  getAllSbl(){
    this.sblService.getAllSblDTO().subscribe(value => {
      this.listWasheds=value
    },error => {
      console.log(error)})
  }
  openNew() {
    this.band = new Band();
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedBands() {

    this.deleteProductsDialog = true;

  }

  editBand(band: Band) {
    this.isUpdateBand = true;
    this.band = band;
    this.productDialog = true;
    // this.getCalibresBySelectedCribleLiwells(sbl.cribleLiwellList);
  }

  deleteBand(band: Band) {
    this.deleteProductDialog = true;
    this.band =band;
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.selectedBands.forEach(band => {
      this.bandService.deleteBand(band.id).subscribe(
        () => {
          this.bands = this.bands.filter(band1 => band1.id !== band.id);
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Band Deleted', life: 3000});

        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Can not deleted",
            text: "Can not deleted",
          })
          console.error(error);
        }
      );
    });

  }

  confirmDelete() {
    this.deleteProductDialog = false;
    if (this.band.id != null) {
      this.bandService.deleteBand(this.band.id).subscribe(() => {
        this.bands = this.bands.filter(val => val.id !== this.band.id);

        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Band Deleted', life: 3000});

      }, error => {
        Swal.fire({
          icon: "error",
          title: "Can not deleted",
          text: "Can not deleted !",
        })
        console.log(error)
      });
    }
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
getAllBands(){
    this.bandService.getAllBands().subscribe(value => {
      this.bands = value
    },error => {
      console.log(error)})
}
  saveBand() {
    this.submitted = false;
    this.productDialog = false
    if(this.froms=='unwashed' && this.selectedFromSbnl.id !== undefined){
      this.band.from.typeId=this.selectedFromSbnl.id;
      this.band.from.type='Unwashed';
    }
    if(this.froms == 'liwellSieve' && this.selectedFromCribleLiwell.id !== undefined){
      this.band.from.typeId=this.selectedFromCribleLiwell.id;
      this.band.from.type='Liwell Sieve';
    }
    if(this.froms=='greenSieve'){
      this.band.from.typeId=this.selectedFromCrible.id;
      this.band.from.type='Green Sieve';
    }
    if(this.froms=='laundry'){
      this.band.from.typeId=this.selectedFromLaverie.id;
      this.band.from.type='laundry';
    }
    // ========= TO ================
    if(this.tos=='washed' && this.selectedToWashed.id !== undefined){
      this.band.to.typeId=this.selectedToWashed.id;
      this.band.to.type='Unwashed';
    }
    if(this.tos == 'liwellSieve' && this.selectedToCribleLiwell.id !== undefined){
      this.band.to.typeId=this.selectedToCribleLiwell.id;
      this.band.to.type='Liwell Sieve';
    }
    if(this.tos=='greenSieve'){
      this.band.to.typeId=this.selectedToCrible.id;
      this.band.to.type='Green Sieve';
    }
    if(this.tos=='laundry'){
      this.band.to.typeId=this.selectedToLaverie.id;
      this.band.to.type='laundry';
    }
    // ========= TO ================
    if (this.isUpdateBand == true) {
      this.bandService.updateBand(this.band).subscribe(() => {
        this.getAllBands();
      });
      console.log('Band updated');

      this.isUpdateBand = false;
    } else {
      this.bandService.addBand(this.band).subscribe(() => {
        this.getAllBands();

      });
      console.log('Band added');
    }
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }




  exportrapport(band: Band) {

    this.SelectetBand = band;
    this.visiblePrint = true
    // console.log("---->" + new JsonPipe().transform(this.Selectetsbl));
  }


  filtredate() {
    this.Viderfiltredate()
    const data = this.SelectetBand.analysesChimiques !== undefined ? this.SelectetBand.analysesChimiques : []
    const newAnalyse: AnalysesChimique[] = []
    data.forEach(v => {

      if (v.dateAnalyse !== undefined) {
        // console.log(typeof v.dateAnalyse)
        const d = v.dateAnalyse + "";
        const dateana: Date = new Date(d)
        // console.log("-D-->" + dateana)
        if (this.AfterTodate(this.DatefiltrageStart, dateana) && this.AfterTodate(dateana, this.DatefiltrageEnd)) {
          newAnalyse.push(v);
        } else {
          console.log("no compare")
        }


      }

    })
    this.SelectetBand.analysesChimiques = [...newAnalyse];
    // console.log(new JsonPipe().transform(data))


  }

  clear(dt1: Table) {
    dt1.clear();
  }

  Viderfiltredate() {

    this.bandService.getAllBands().subscribe(value => {
      this.bands = value;
      const band2: Band | undefined = this.bands.find(value => this.SelectetBand.id == value.id)
      if (band2)
        this.SelectetBand = band2;

    });
  }

  getAnalyse() {
    return this.SelectetBand.analysesChimiques !== undefined ? this.SelectetBand.analysesChimiques : []
  }

  getAnalyseGranoli() {
    const data = this.SelectetBand.analysesPhysiques !== undefined ? this.SelectetBand.analysesPhysiques : []
    const newAnalyse: AnalysesPhysique[] = []
    data.forEach(v => {
      if (v.dateAnalyse !== undefined) {
        // console.log(typeof v.dateAnalyse)
        const d = v.dateAnalyse + "";
        const dateana: Date = new Date(d)
        // console.log("-D-->" + dateana)
        if (this.AfterTodate(this.DatefiltrageStart, dateana) && this.AfterTodate(dateana, this.DatefiltrageEnd)) {
          newAnalyse.push(v);
        } else {
          console.log("no compare")
        }

      }

    })
    this.SelectetBand.analysesPhysiques = [...newAnalyse];

    return this.SelectetBand.analysesPhysiques !== undefined ? this.SelectetBand.analysesPhysiques : []
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
    // console.log(date1 + "<" + date2)
    return date1.getDay() <= date2.getDay() && date1.getMonth() <= date2.getMonth() && date1.getFullYear() <= date2.getFullYear()
  }

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
        [this.SelectetBand.reference, this.SelectetBand.dateStock]
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
      const bassinData: string = [this.SelectetBand.reference, this.SelectetBand.dateStock].join(',');
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


  getCalibresBySelectedCribleLiwells(cribleLiwellsList: CribleLiwell[] | undefined) {
    const uniqueCalibres = new Set<number>(); // Use Set to avoid duplicates
    if (cribleLiwellsList !== undefined) {
      cribleLiwellsList.forEach(cribleLiwell =>
        cribleLiwell.traitementStocks?.forEach(traitement => {
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
    let totalCribleLiwell: number = 0;
    let totalSalinesStockOrder: number = 0;

    // Calculate totalCribleLiwell
    if (sbl.cribleLiwellList && sbl.cribleLiwellList.length > 0) {
      sbl.cribleLiwellList.forEach(cribleLiwell => {
        cribleLiwell.traitementStocks?.forEach(traitement => {
          if (traitement.calibreB1 === sbl.calibre) {
            totalCribleLiwell += traitement.sortieB1;
          }
          if (traitement.calibreB2 === sbl.calibre) {
            totalCribleLiwell += traitement.sortieB2;
          }
        });
      });
    }


    // Calculate totalConcasseur
    if (sbl.concasseurList && sbl.concasseurList.length > 0) {
      sbl.concasseurList.forEach(concasseur => {
        totalConcasseur += concasseur.resultConcasseurs?.reduce((sum, resultConcasseur) => sum + resultConcasseur.result, 0) || 0;
      });
    }
    // Calculate totalCrible
    if (sbl.cribleList && sbl.cribleList.length > 0) {
      sbl.cribleList.forEach(crible => {
        totalCrible += crible.resultCribles?.reduce((sum, result) => sum + result.bigSalt, 0) || 0;
      });
    }


    // Calculate totalSalinesStockOrder
    if (sbl.stockOrderList && sbl.stockOrderList.length > 0) {
      sbl.stockOrderList.forEach(stockOrder => {
        totalSalinesStockOrder += stockOrder.salines?.reduce((sum, saline) => sum + saline.volumeSaline, 0) || 0;
      });
    }

    return (totalCrible+ totalConcasseur +totalCribleLiwell)-totalSalinesStockOrder;
  }









  protected readonly getToken = getToken;
}
