import {Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DatePipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
 import {Puit} from "../../Models/puit";
import {PuitService} from "../../Services/puit.service";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import Swal from "sweetalert2";
import  jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {MultiSelectModule} from "primeng/multiselect";
import {CheckboxModule} from "primeng/checkbox";
import {AutoFocusModule} from "primeng/autofocus";
import {LoginService} from "../../Services/login.service";
import * as XLSX from 'xlsx';
import {getToken} from "../../../main";
import {utils, WorkBook, WorkSheet, writeFile} from "xlsx";
import * as Papa from 'papaparse';
import {TooltipModule} from "primeng/tooltip";
import {Pompe} from "../../Models/pompe";
import {PompeService} from "../../Services/pompe.service";

@Component({
  selector: 'app-puit',
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
    NgClass,
    InputTextModule,
    CalendarModule,
    DatePipe,
    MultiSelectModule,
    NgForOf,
    CheckboxModule,
    AutoFocusModule,
    TooltipModule
  ],
  templateUrl: './puit.component.html',
  styleUrl: './puit.component.css'

})
export class PuitComponent implements OnInit {


  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  colsfiltre: any[] = [];
   cols:any[]=[]
  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============
  puits: Puit[] = [];

  puit: Puit = {};

  selectedPuits: Puit[] = [];
  SelectAll: boolean = false;
  isUpdatePuit = false;
  loading: boolean = false;
  ReportedBy:any={}
  pompes:Pompe[]=[];
  public  _selectedColumns: any[]=[];
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.colsfiltre.filter((col) => val.includes(col));
  }


  constructor(private Loginservice:LoginService,
              private messageService: MessageService,
              private puitService: PuitService,
              private pompeService:PompeService) {}


  ngOnInit() {

this.ReportedBy=this.Loginservice.getToken()
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



    this.puit.dateCreation = new Date();
    this.loading = true;
    this.puitService.getAllPuits().subscribe((v: Puit[]) => {
      this.puits = v;
      this.loading = false;


    }, error => {
      console.log(error)
    })

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

this.getAllPompes();
  }
getAllPompes(){
    this.pompeService.getAllPompes().subscribe(listPompe =>this.pompes=listPompe )
}
  openNew() {
    this.puit = {};
    this.puit.reference = "puit-" + this.createId()
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedPuits() {

    this.deleteProductsDialog = true;

  }

  editPuit(puit: Puit) {
    this.isUpdatePuit = true;


    this.puit = {...puit};
    this.productDialog = true;
  }

  deletePuit(puit: Puit) {
    this.deleteProductDialog = true;

    this.puit = {...puit};
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.selectedPuits.forEach(selectedPuit => {
      this.puitService.deletePuit(selectedPuit.id).subscribe(
        () => {
          this.puits = this.puits.filter(puit => puit.id !== selectedPuit.id);
          this.messageService.add({severity: 'success', summary: 'successful', detail: 'The wells are removed', life: 3000});

        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Can not deleted",
            text: "Well related with Pond !",

          });
          console.error( error);
        }
      );
    });


  }

  confirmDelete() {
    this.deleteProductDialog = false;

      this.puitService.deletePuit(this.puit.id).subscribe(() => {

        this.puits = this.puits.filter(val => val.id !== this.puit.id);
        this.messageService.add({severity: 'success', summary: 'successful', detail: 'Well deleted', life: 3000});

      },error =>{

          Swal.fire({
            icon: "error",
            title: "Can not deleted",
            text: "Well related with Pond !",
          })

        console.error( error);
      }
      );


  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  savePuit() {
    this.submitted = false;


    if (this.puit.nom === undefined || this.puit.nom.trim() === '') {
      this.submitted = true
    } else if (this.puit.reference === undefined || this.puit.reference.trim() == '')
      this.submitted = true
    else {
      this.productDialog = false;
      if (this.isUpdatePuit == true) {
        this.puitService.updatePuit(this.puit).subscribe(() => {
          this.puitService.getAllPuits().subscribe((puits: Puit[]) => {
            this.puits = puits;
          });
        });
        console.log('Puit updated');
        this.isUpdatePuit = false;
      } else {
        this.puitService.addPuit(this.puit).subscribe(() => {
          this.puitService.getAllPuits().subscribe((puits: Puit[]) => {
            this.puits = puits;
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
    const chars = '0123456789';
    for (let i = 0; i < 2; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  selectedPuitPrint: Puit = {}

  exportrapport(puit: Puit) {
    this.selectedPuitPrint = puit;
    this.visiblePrint = true;
  }
  exportexcel(puit: Puit) {
    this.selectedPuitPrint = puit;
    this.visiblePrint = true
  }

  getAllPuit() {
    this.loading = true;
    this.puitService.getAllPuits().subscribe((puits: Puit[]) => {
      this.puits = puits;
      this.loading = false;

    });
  }


  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  SearchDate: any;




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



  filtredate() {

   const data=this.selectedPuitPrint.analysesChimiques !== undefined ? this.selectedPuitPrint.analysesChimiques : []
    const newAnalyse:AnalysesChimique[] =[]
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
    this.selectedPuitPrint.analysesChimiques=[...newAnalyse] ;



  }

  clear(dt1: Table) {
    dt1.clear() ;
  }

  Viderfiltredate() {
    this.loading = true;
    this.puitService.getAllPuits().subscribe((puits: Puit[]) => {
      this.puits = puits;
      this.loading = false;
      const searchpuit: Puit | undefined = this.puits.find(value => this.selectedPuitPrint.id == value.id)
      if (searchpuit)
        this.selectedPuitPrint = searchpuit

    });
  }

  getAnalyse() {
    return this.selectedPuitPrint.analysesChimiques !== undefined ? this.selectedPuitPrint.analysesChimiques : []
  }



  getColsfiltr() {
    return this.colsfiltre.filter(value => value.hide==true)
  }

  AfterTodate(date1:Date , date2:Date):boolean{

    return date1.getDay()<=date2.getDay() && date1.getMonth()<=date2.getMonth() && date1.getFullYear()<=date2.getFullYear()
  }

  SelectAllCheck() {
    this.colsfiltre.forEach(value => {
      value.hide = this.SelectAll;
    })
  }
  // =====================================



  SaveExcel() {
    const headings = [
      ['Name Borehole', 'Reference Pool',  'Date Creation'],

    ];

    const wb: WorkBook = utils.book_new();
    const ws: WorkSheet = utils.json_to_sheet([]);

    // Ajouter les en-têtes de colonne  de fiche de vieà partir de A2
    utils.sheet_add_aoa(ws, headings, { origin: 'A2' });


    const PuitData = [
      [this.selectedPuitPrint.nom, this.selectedPuitPrint.reference, this.selectedPuitPrint.dateCreation]
    ];

    utils.sheet_add_json(ws, PuitData, {
      origin: 'A3',
      skipHeader: true,
    });

    // Ajouter les données du tableau HTML
    let element = document.getElementById('EXCEL');
    const wst: WorkSheet = utils.table_to_sheet(element);

    // Convertir les données du tableau HTML en format JSON
    let tableData: any[][] = utils.sheet_to_json(wst, { header: 1 }) as any[][];

    // Formater les dates dans les données du tableau HTML
    tableData = tableData.map((row: any[]) => row.map((cell: any) => {

      // Supposons que les dates soient dans la deuxième colonne (index 1)
      if (typeof cell === 'number' && cell > 40000) { // Vérifier si c'est un nombre de date Excel
        return new Date((cell - 25569) * 86400 * 1000).toLocaleDateString();
      }
      return cell;
    }));

    // Ajouter les données formatées du tableau HTML à la feuille principale
    utils.sheet_add_json(ws, tableData, {
      origin: 'A6',
      skipHeader: true,
    });

    // Enregistrer la feuille de calcul
    utils.book_append_sheet(wb, ws, 'Fiche de Vie');

    writeFile(wb, 'Puit Report.xlsx');
  }

  exportcsv() {
    const headings = [
      ['Name Borehole', 'Reference Pool', 'Date Creation'],
    ];

    // Prepare borehole data
    const puitData = [
      [this.selectedPuitPrint.nom, this.selectedPuitPrint.reference, this.selectedPuitPrint.dateCreation],
    ];

    // Extract data from the HTML table
    let element = document.getElementById('EXCEL');
    if (!element) {
      console.error('Element with id "EXCEL" not found.');
      return;
    }

    const wst: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // Convert table data to JSON format
    let tableData: any[][] = XLSX.utils.sheet_to_json(wst, { header: 1 }) as any[][];

    // Format dates in table data
    tableData = tableData.map((row: any[]) =>
      row.map((cell: any) => {
        // Assume dates are in the second column (index 1)
        if (typeof cell === 'number' && cell > 40000) {
          return new Date((cell - 25569) * 86400 * 1000).toLocaleDateString();
        }
        return cell;
      })
    );

    // Combine headings, puitData, and formatted tableData
    const csvData: (string | number)[][] = [...headings, ...puitData, ...tableData];

    // Convert data to CSV format using PapaParse
    const csv = Papa.unparse(csvData);

    // Create a Blob from CSV data
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger the download
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Puit_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  protected readonly getToken = getToken;
}
