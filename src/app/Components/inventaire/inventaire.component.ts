import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ProductService} from "../../Services/product.service";
import {Product} from "../../Models/product";
import {Router} from "@angular/router";
import {Inventaire} from "../../Models/inventaire";
import {InventaireService} from "../../Services/inventaire.service";

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
    NgClass
  ],
  templateUrl: './inventaire.component.html',
  styleUrl: './inventaire.component.css'
})
export class InventaireComponent implements OnInit{

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
  inventaires: Inventaire[] = [];

  inventaire:Inventaire={};

  selectedInventaire: Inventaire[] = [];

  private isUpdateInventaire=false;


  constructor(private router: Router,private productService: ProductService, private messageService: MessageService,private inventaireService :InventaireService) {}

  ngOnInit() {
    this.inventaireService.getInventaires().subscribe((v:  Inventaire[]) => {
      this.inventaires=v;
      console.log(new JsonPipe().transform("====================>>>>>>"+this.inventaires))

    },error => {
      console.log(error)})

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'reference', header: 'reference' },
      { field: 'designation', header: 'designation' },
      { field: 'code', header: 'code' },
      { field: 'serie', header: 'serie' },
      { field: 'marque', header: 'marque' },
      { field: 'verification', header: 'verification' },
      { field: 'dateInventaire', header: 'dateInventaire' },
      { field: 'etatFiche', header: 'etatFiche' },
      { field: 'emplacement', header: 'emplacement' },

    ];


  }

  openNew() {

    this.router.navigate(['/ajouterInventaire']);
  }

  deleteSelectedInventaire() {

    this.deleteProductsDialog = true;

  }

  editInventaire(inventaire: Inventaire) {
    this.isUpdateInventaire=true;
    this.router.navigate(['/ajouterFichevieIntervention/'+inventaire.id]);


    this.inventaire = { ...inventaire };
    this.productDialog = true;
  }

  deleteInventaire(inventaire:Inventaire) {
    this.deleteProductDialog = true;

    this.inventaire = { ...inventaire };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedInventaire.length)
    this.selectedInventaire.forEach(selectedInventaire => {
      this.inventaireService.deleteInventaire(selectedInventaire.id).subscribe(
        () => {
          this.inventaires = this.inventaires.filter(inventaire =>inventaire.id !== selectedInventaire.id);

        },
        (error) => {
          console.error('Error deleting fiche de vie:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'fiche de vie Deleted', life: 3000 });
    this.selectedInventaire = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.inventaires = this.inventaires.filter(val => val.id !== this.inventaire.id);
    if (this.inventaire.id!= null) {
      this.inventaireService.deleteInventaire(this.inventaire.id).subscribe(() => console.log("fiche vie deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Fiche vie Deleted', life: 3000 });
    this.inventaire ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveInventaire() {
    // this.submitted = false;
    // this.productDialog=false
    // // alert(new JsonPipe().transform(this.puit))
    // if(this.isUpdateInventaire==true) {
    //   this.inventaireService.updateInventaire(this.inventaire).subscribe(() =>{
    //     this.inventaireService.getFichesVies().subscribe((inventaires: Inventaire[]) => {
    //       this.inventaires = inventaires;
    //     });
    //   });
    //   console.log('Puit updated');
    //   this.isUpdateInventaire=false;
    // }
    // else
    // {
    //   this.inventaireService.(this.inventaire).subscribe(() => {
    //     this.inventaireService.getFichesVies().subscribe((inventaires: Inventaire[]) => {
    //       this.inventaires = inventaires;
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
