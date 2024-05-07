import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {JsonPipe, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
import {Puit} from "../../Models/puit";
import {Router} from "@angular/router";
import {ProductService} from "../../Services/product.service";
import {PuitService} from "../../Services/puit.service";
import {FicheVie} from "../../Models/fichevie";
import {FicheVieService} from "../../Services/fichevie.service";

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
    ToolbarModule
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

  ngOnInit() {
    this.ficheVieService.getFichesVies().subscribe((v: FicheVie[]) => {
      this.ficheVies = v;

    }, error => {
      console.log(error)
    })

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
}
