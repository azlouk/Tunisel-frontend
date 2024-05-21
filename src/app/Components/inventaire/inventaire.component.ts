import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DatePipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ProductService} from "../../Services/product.service";
import {Product} from "../../Models/product";
import {Router} from "@angular/router";
import {Inventaire} from "../../Models/inventaire";
import {InventaireService} from "../../Services/inventaire.service";
import {AutoFocusModule} from "primeng/autofocus";
import {Puit} from "../../Models/puit";
import {CheckboxModule} from "primeng/checkbox";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {Article} from "../../Models/article";
import {ArticleService} from "../../Services/article.service";
import {utils, writeFile} from "xlsx";

@Component({
  selector: 'app-inventaire',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    NgIf,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    NgClass,
    AutoFocusModule,
    CheckboxModule,
    DatePipe,
    NgForOf
  ],
  templateUrl: './inventaire.component.html',
  styleUrl: './inventaire.component.css'
})
export class InventaireComponent implements OnInit {

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];
  articles: Article[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============
  inventaires: Inventaire[] = [];

  inventaire: Inventaire = {};

  selectedInventaire: Inventaire[] = [];

  private isUpdateInventaire = false;
  public selectedInventairePrint: Inventaire={};


  constructor(private router: Router, private productService: ProductService,private articleService: ArticleService, private messageService: MessageService, private inventaireService: InventaireService) {
  }

  ngOnInit() {
    this.inventaireService.getInventaires().subscribe((v: Inventaire[]) => {
      this.inventaires = v;

    }, error => {
      console.log(error)
    })
    this.articleService.getAllArticles().subscribe((v: Article[]) => {
      this.articles = v;

    }, error => {
      console.log(error)
    })

    this.cols = [
      {field: 'id', header: 'id'},
      {field: 'reference', header: 'reference'},
      {field: 'designation', header: 'designation'},
      {field: 'code', header: 'code'},
      {field: 'serie', header: 'serie'},
      {field: 'marque', header: 'marque'},
      {field: 'verification', header: 'verification'},
      {field: 'dateInventaire', header: 'dateInventaire'},
      {field: 'etatFiche', header: 'etatFiche'},
      {field: 'emplacement', header: 'emplacement'},

    ];


  }

  openNew() {

    this.router.navigate(['/ajouterInventaire']);
  }

  deleteSelectedInventaire() {

    this.deleteProductsDialog = true;

  }

  editInventaire(inventaire: Inventaire) {
    this.isUpdateInventaire = true;
    this.router.navigate(['/editInventaire/' + inventaire.id]);


    this.inventaire = {...inventaire};
    this.productDialog = true;
  }

  deleteInventaire(inventaire: Inventaire) {
    this.deleteProductDialog = true;

    this.inventaire = {...inventaire};
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.selectedInventaire.forEach(selectedInventaire => {
      this.inventaireService.deleteInventaire(selectedInventaire.id).subscribe(
        () => {
          this.inventaires = this.inventaires.filter(inventaire => inventaire.id !== selectedInventaire.id);

        },
        (error) => {
          console.error('Error deleting fiche de vie:', error);
        }
      );
    });

    this.messageService.add({severity: 'success', summary: 'réussi', detail: 'inventaire supprimé', life: 3000});
    this.selectedInventaire = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.inventaires = this.inventaires.filter(val => val.id !== this.inventaire.id);
    if (this.inventaire.id != null) {
      this.inventaireService.deleteInventaire(this.inventaire.id).subscribe(() => console.log("fiche vie deleted"));
    }
    this.messageService.add({severity: 'success', summary: 'réussi', detail: 'inventaire supprimé', life: 3000});
    this.inventaire;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

////////////////////////////////////////////////////////////////////ExportPdfInventaire//////////////////////////////////////////////////////////////////////
  @ViewChild("pdfinventaire") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  // DatefiltrageStart: Date = new Date();
  // DatefiltrageEnd: Date = new Date();
  // SearchDate: any;

  getInventaire() {
    return this.selectedInventairePrint.inventaireProduitAssociations !== undefined ? this.selectedInventairePrint.inventaireProduitAssociations : []
  }

  exportrapport(inventaire: Inventaire) {
    this.selectedInventairePrint =inventaire ;
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
  //   const headings = [['id', '','Name', '', 'designation', '', 'quantity', '',]];
  //
  //   const wb = utils.book_new();
  //   const ws = utils.json_to_sheet([]);
  //   utils.sheet_add_aoa(ws, headings);
  //
  //   const formattedData = this.selectedInventairePrint.inventaireProduitAssociations!.map(record => {
  //     return [
  //       record.id, '',
  //       record.produit?.nom, '',
  //       record.produit?.designation, '',
  //       record.quantitePI, '',
  //
  //     ];
  //   });
  //
  //   utils.sheet_add_json(ws, formattedData, {
  //     origin: 'A2',
  //     skipHeader: true,
  //   });
  //
  //   utils.book_append_sheet(wb, ws, 'inventaireProduitAssociations');
  //   writeFile(wb, 'inventaireProduitAssociations Report.xlsx');
  // }
  // csvExport() {
  //   const tableName = this.selectedInventairePrint.reference;
  //   const headings = [['id', '','Name', '', 'designation', '', 'quantity', '',]];
  //
  //   const wb = utils.book_new();
  //   const ws = utils.json_to_sheet([]);
  //
  //   // Ajouter le nom du tableau en A1
  //   utils.sheet_add_aoa(ws, [[tableName]], { origin: 'A1' });
  //
  //   // Ajouter les en-têtes de colonne à partir de A2
  //   utils.sheet_add_aoa(ws, headings, { origin: 'A2' });
  //
  //   // Préparer les données avec des colonnes vides intercalées
  //   const formattedData = this.selectedInventairePrint.inventaireProduitAssociations!.map(record => {
  //     return [
  //       record.id, '',
  //             record.produit?.nom, '',
  //             record.produit?.designation, '',
  //             record.quantitePI, '',
  //     ];
  //   });
  //
  //   // Ajouter les données à partir de A3 (en raison de l'ajout du nom du tableau et des en-têtes)
  //   utils.sheet_add_json(ws, formattedData, {
  //     origin: 'A3',
  //     skipHeader: true,
  //   });
  //   const cellA1 = ws['A1'];
  //   if (!cellA1.s) {
  //     cellA1.s = {};
  //   }
  //   cellA1.s.font = { bold: true };
  //
  //
  //   utils.book_append_sheet(wb, ws, 'Bassins');
  //   writeFile(wb, 'Bassins Report.xlsx');
  // }

  csvExport() {
    const tableName = this.selectedInventairePrint.reference; // Ajoutez le nom de votre tableau ici
    const headings = [['id', '','Name', '', 'designation', '', 'quantity', '',]];

    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);

    // Ajouter le nom du tableau en A1
    utils.sheet_add_aoa(ws, [[tableName]], { origin: 'A1' });

    // Ajouter les en-têtes de colonne à partir de A2
    utils.sheet_add_aoa(ws, headings, { origin: 'A2' });

    // Préparer les données avec des colonnes vides intercalées
    const formattedData = this.selectedInventairePrint.inventaireProduitAssociations!.map(record => {
      return [
        record.id, '',
                    record.produit?.nom, '',
                  record.produit?.designation, '',
                     record.quantitePI, '',
      ];
    });

    // Ajouter les données à partir de A3 (en raison de l'ajout du nom du tableau et des en-têtes)
    utils.sheet_add_json(ws, formattedData, {
      origin: 'A3',
      skipHeader: true,
    });



    utils.book_append_sheet(wb, ws, 'Inventaire');
    writeFile(wb, 'Inventaire Report.xlsx');
  }

existeArticle(a:Article):boolean|undefined{
    const foundItem = this.selectedInventairePrint.inventaireProduitAssociations?.find(elem => elem.produit?.article?.nom === a.nom)

    return !!foundItem

}


}
