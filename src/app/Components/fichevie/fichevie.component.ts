import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {DatePipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
import {Router} from "@angular/router";
import {ProductService} from "../../Services/product.service";
import {FicheVie} from "../../Models/fichevie";
import {FicheVieService} from "../../Services/fichevie.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {AutoFocusModule} from "primeng/autofocus";
import {CheckboxModule} from "primeng/checkbox";
import {FloatLabelModule} from "primeng/floatlabel";
import {RadioButtonModule} from "primeng/radiobutton";
import {utils, WorkBook, WorkSheet, writeFile} from "xlsx";
import * as XLSX from 'xlsx';
import {EtatFiche} from "../../Enum/etat-fiche";
import {Emplacement} from "../../Enum/emplacement";
import * as Papa from 'papaparse';

@Component({
  selector: 'app-fichevie',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    AutoFocusModule,
    CheckboxModule,
    DatePipe,
    NgForOf,
    FormsModule,
    FloatLabelModule,
    RadioButtonModule,
    NgClass
  ],
  templateUrl: './fichevie.component.html',
  styleUrl: './fichevie.component.css'
})
export class FichevieComponent implements OnInit {
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
  ficheVies: FicheVie[] = [];

  ficheVie: FicheVie = {};

  selectedFicheVie: FicheVie[] = [];

  private isUpdateFicheVie = false;


  constructor(private router: Router, private productService: ProductService, private messageService: MessageService, private ficheVieService: FicheVieService) {
  }
  getAllVie() {
    this.ficheVieService.getFichesVies().subscribe((v: FicheVie[]) => {
      this.ficheVies = v;

    }, error => {
      console.log(error)
    })
  }

  ngOnInit() {
   this.getAllVie()

    this.cols = [
      {field: 'id', header: 'id'},
      {field: 'societe', header: 'societe'},
      {field: 'designation', header: 'designation'},
      {field: 'code', header: 'code'},
      {field: 'serie', header: 'serie'},
      {field: 'marque', header: 'marque'},
      {field: 'verification', header: 'verification'},
      {field: 'dateReception', header: 'dateReception'},
      {field: 'etatFiche', header: 'etatFiche'},
      {field: 'emplacement', header: 'emplacement'},

    ];


  }

  openNew() {

    this.router.navigate(['/ajouterFichevieIntervention']);
  }

  deleteSelectedFicheVie() {

    this.deleteProductsDialog = true;

  }

  editFicheVie(ficheVie: FicheVie) {
    this.isUpdateFicheVie = true;
    this.router.navigate(['/ajouterFichevieIntervention/' + ficheVie.id]);


    this.ficheVie = {...ficheVie};
    this.productDialog = true;
  }

  deleteFicheVie(ficheVie: FicheVie) {
    this.deleteProductDialog = true;

    this.ficheVie = {...ficheVie};
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.selectedFicheVie.forEach(selectedFicheVie => {
      this.ficheVieService.deleteFicheVie(selectedFicheVie.id).subscribe(
        () => {
          this.ficheVies = this.ficheVies.filter(ficheVie => ficheVie.id !== selectedFicheVie.id);

        },
        (error) => {
          console.error('Erreur suppression de  fiche de vie:', error);
        }
      );
    });

    this.messageService.add({severity: 'success', summary: 'Réussie', detail: 'fiche de vie supprimé', life: 3000});
    this.selectedFicheVie = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.ficheVies = this.ficheVies.filter(val => val.id !== this.ficheVie.id);
    if (this.ficheVie.id != null) {
      this.ficheVieService.deleteFicheVie(this.ficheVie.id).subscribe(() => console.log("fiche vie supprimé!"));
    }
    this.messageService.add({severity: 'success', summary: 'Réussie', detail: 'Fiche vie supprimé', life: 3000});
    this.ficheVie;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveFicheVie() {
    // this.submitted = false;
    // this.productDialog=false
    // // alert(new JsonPipe().transform(this.puit))
    // if(this.isUpdateFicheVie==true) {
    //   this.ficheVieService.updateFicheVie(this.ficheVie).subscribe(() =>{
    //     this.ficheVieService.getFichesVies().subscribe((ficheVies: FicheVie[]) => {
    //       this.ficheVies = ficheVies;
    //     });
    //   });
    //   console.log('Puit updated');
    //   this.isUpdateFicheVie=false;
    // }
    // else
    // {
    //   this.ficheVieService.(this.ficheVie).subscribe(() => {
    //     this.ficheVieService.getFichesVies().subscribe((ficheVies: FicheVie[]) => {
    //       this.ficheVies = ficheVies;
    //     });
    //   });
    //   console.log('Puit added');
    // }
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


//   ===========Print PDF==========================
  @ViewChild("pdfFicheVie") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();




  selectedFicheViePrint: FicheVie = {}
  exportrapport(ficheVie: FicheVie) {
    this.selectedFicheViePrint = ficheVie;
    this.visiblePrint = true
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

// csvExport() {
//
//   const headings = [
//     ['id', '', 'societe', '', 'designation', '', 'code', '', 'serie', '', 'marque', '', 'etalonnage', '', 'verification', '', 'dateReception', '', 'etatFiche', '', 'emplacement', ''],
//     [],
//     [],
//     [],
//
//   ];
//   // const interventionHeadings = [
//   //   ['id','', 'dateIntervention','', 'who','', 'natureAction','', 'resultat','', 'certificat','', 'nomVisa','', 'observation']
//   // ];
//   const wb = utils.book_new();
//   const ws = utils.json_to_sheet([]);
//
//   // Ajouter les en-têtes de colonne à partir de A2
//
//   utils.sheet_add_aoa(ws, headings, { origin: 'A2' });
//
//   // Préparer les données formatées pour les fiches de vie et leurs interventions
//
//   const ficheData = this.ficheVies.map(fiche => [
//     fiche.id, '', fiche.societe, '', fiche.designation, '', fiche.code, '', fiche.serie, '', fiche.marque, '', fiche.etalonnage, '', fiche.verification, '',
//     fiche.dateReception, '', fiche.etatFiche, '', fiche.emplacement, ''
//   ]);
//   utils.sheet_add_json(ws, ficheData, {
//     origin: 'A3',
//     skipHeader: true,
//   });
//
//
//
//   let element = document.getElementById('EXCEL');
//  const wst= XLSX.utils.table_to_sheet(element)
//   utils.sheet_add_json(ws, utils.sheet_to_json(wst) , {
//     origin: 'A8',
//
//   });
//
//
//
//
//
//   //saveData sheet
//   utils.book_append_sheet(wb, ws, 'Fiche de Vie');
//
//
//
//   writeFile(wb, 'FicheVie Report.xlsx');
//
//   // const interventionsData2:any[]=[]
//   //   // @ts-ignore
//   // this.selectedFicheViePrint.interventions.forEach(value => {
//   //     interventionsData2.push(value.id)
//   //     interventionsData2.push(value.dateintervention)
//   //     interventionsData2.push(value.qui)
//   //     interventionsData2.push(value.nomVisa)
//   //     interventionsData2.push(value.id)
//   //     interventionsData2.push(value.id)
//   //     interventionsData2.push(value.id)
//   //   })
//   // console.log(interventionsData2)
//
//   // utils.sheet_add_aoa(ws, interventionHeadings, { origin: 'A6' });
//   // // Préparer les données formatées pour les interventions
//   // const interventionsData = this.ficheVies.flatMap(fiche =>
//   //   fiche.interventions!.map(intervention => [
//   //     intervention.id,'', intervention.dateintervention,'', intervention.qui,'', intervention.natureAction,'', intervention.resultat,'', intervention.certificat,'', intervention.nomVisa,'', intervention.observation,'',
//   //   ])
//   // );
//
//   // const tableName = ficheData.; // Nom du tableau
//   // const soustableName = this.ficheVie.designation; // Nom du tableau
//
//
//   // Ajouter le nom du tableau en A1
//   // utils.sheet_add_aoa(ws, [[tableName]], { origin: 'A1' });
//   // Ajouter les données à partir de A3
//
//   // utils.sheet_add_aoa(ws, interventionHeadings, { origin: 'A6' });
//   // utils.sheet_add_json(ws, ['hh','khjik','knk','khjik','knk','khjik','knk','khjik','knk','khjik','knk','khjik','knk','khjik','knk','khjik','knk','khjik','knk','khjik','knk','khjik','knk','khjik','knk','khjik','knk','khjik','knk','khjik','knk'], {
//   //   origin: 'A7',
//   //   skipHeader: true,
//   // });
//
// }
//
// // SaveExcel(): void {
// //     const element = document.getElementById('EXCEL');
// //     if (element) {
// //       const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { raw: true });
// //
// //       const wb: XLSX.WorkBook = XLSX.utils.book_new();
// //       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
// //       XLSX.writeFile(wb, 'Export_' + new Date().getTime() + '.xlsx');
// //     }
// //   }




excelExport() {
  const headings = [
    ['id', '', 'societe', '', 'designation', '', 'code', '', 'serie', '', 'marque', '', 'etalonnage', '', 'verification', '', 'dateReception', '', 'etatFiche', '', 'emplacement', ''],
    [],
    [],
    [],
  ];

  const wb: WorkBook = utils.book_new();
  const ws: WorkSheet = utils.json_to_sheet([]);

  // Ajouter les en-têtes de colonne  de fiche de vieà partir de A2
  utils.sheet_add_aoa(ws, headings, { origin: 'A2' });

  // Préparer les données formatées pour les fiches de vie et leurs interventions
  const ficheData = this.ficheVies.map(fiche => [
    fiche.id, '', fiche.societe, '', fiche.designation, '', fiche.code, '', fiche.serie, '', fiche.marque, '', fiche.etalonnage, '', fiche.verification, '',
    fiche.dateReception ? new Date(fiche.dateReception).toLocaleDateString() : '', // Formater la date
    '', fiche.etatFiche, '', fiche.emplacement, ''
  ]);

  utils.sheet_add_json(ws, ficheData, {
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
    origin: 'A8',
    skipHeader: true,
  });

  // Enregistrer la feuille de calcul
  utils.book_append_sheet(wb, ws, 'Fiche de Vie');

  writeFile(wb, 'FicheVie Report.xlsx');
}


////////////////////////// exportCsv///////////////


  csvExport() {
    const headings = [
      ['id', '', 'societe', '', 'designation', '', 'code', '', 'serie', '', 'marque', '', 'etalonnage', '', 'verification', '', 'dateReception', '', 'etatFiche', '', 'emplacement', ''],
    ];

    // Préparer les données formatées pour les fiches de vie et leurs interventions
    const ficheData = this.ficheVies.map(fiche => [
      fiche.id, '', fiche.societe, '', fiche.designation, '', fiche.code, '', fiche.serie, '', fiche.marque, '', fiche.etalonnage, '', fiche.verification, '',
      fiche.dateReception ? new Date(fiche.dateReception).toLocaleDateString() : '', // Formater la date
      '', fiche.etatFiche, '', fiche.emplacement, ''
    ]);

    // Ajouter les en-têtes et les données des fiches de vie
    let csvData: (string[] | (number | undefined | string | EtatFiche | Emplacement)[])[] = [...headings, ...ficheData];

    // Extraire les données du tableau HTML
    let element = document.getElementById('EXCEL');
    if (!element) {
      console.error('Element with id "EXCEL" not found.');
      return;
    }

    const wst: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // Convertir les données du tableau HTML en format JSON
    let tableData: (string | number)[][] = XLSX.utils.sheet_to_json(wst, { header: 1 }) as (string | number)[][];

    // Formater les dates dans les données du tableau HTML
    tableData = tableData.map((row: (string | number)[]) => row.map((cell: string | number) => {
      // Supposons que les dates soient dans la deuxième colonne (index 1)
      if (typeof cell === 'number' && cell > 40000) { // Vérifier si c'est un nombre de date Excel
        return new Date((cell - 25569) * 86400 * 1000).toLocaleDateString();
      }
      return cell;
    }));

    // Ajouter les données du tableau HTML au CSV
    csvData = [...csvData, ...tableData];

    // Convertir les données en CSV avec PapaParse
    const csv = Papa.unparse(csvData);

    // Créer un Blob à partir des données CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Créer un lien et déclencher le téléchargement
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'FicheVie Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

////////////////////////// exportCsv///////////////
}
