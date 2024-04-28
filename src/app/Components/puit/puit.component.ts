import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
import {ProductService} from "../../Services/product.service";
import {Puit} from "../../Models/puit";
import {PuitService} from "../../Services/puit.service";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";

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
    CalendarModule
  ],
  templateUrl: './puit.component.html',
  styleUrl: './puit.component.css'

})
export class PuitComponent implements OnInit{
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
  puits: Puit[] = [];

  puit:Puit={};

  selectedPuits: Puit[] = [];

  private isUpdateUser=false;
  loading: boolean=false;

  constructor(private productService: ProductService, private messageService: MessageService,private puitService :PuitService) {}

  ngOnInit() {
    this.puit.dateCreation=new Date() ;
    this.loading=true;
    this.puitService.getAllPuits().subscribe((v:  Puit[]) => {
      this.puits=v;
      this.loading=false;

      console.log(new JsonPipe().transform("====================>>>>>>"+this.puits))

    },error => {
      console.log(error)})

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'reference', header: 'reference' },
      { field: 'description', header: 'description' },
      { field: 'dateCreation', header: 'dateCreation' },
      { field: 'nom', header: 'nom' },
      { field: 'emplacement', header: 'emplacement' },
      { field: 'etat', header: 'etat' },
      { field: 'dateFermeture', header: 'dateFermeture' },
    ];


  }

  openNew() {
    this.puit={};
    this.puit.reference="puit-"+this.createId()
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedPuits() {

    this.deleteProductsDialog = true;

  }

  editPuit(puit: Puit) {
    this.isUpdateUser=true;


    this.puit = { ...puit };
    this.productDialog = true;
  }

  deletePuit(puit: Puit) {
    this.deleteProductDialog = true;

    this.puit = { ...puit };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedPuits.length)
    this.selectedPuits.forEach(selectedPuit => {
      this.puitService.deletePuit(selectedPuit.id).subscribe(
        () => {
          this.puits = this.puits.filter(puit =>puit.id !== selectedPuit.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Puit est bien ajouté', life: 3000 });
    this.selectedPuits = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.puit.id", this.puit.id);
    this.puits = this.puits.filter(val => val.id !== this.puit.id);
    if (this.puit.id!= null) {
      this.puitService.deletePuit(this.puit.id).subscribe(() => console.log("puit deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Puit a été suprrimé', life: 3000 });
    this.puit ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  savePuit() {
    this.submitted = false;


    if(this.puit.nom===undefined || this.puit.nom.trim()===''){
      this.submitted=true
    }else if(this.puit.reference===undefined || this.puit.reference.trim()=='')
      this.submitted=true
   else {
      this.productDialog=false;
      if (this.isUpdateUser == true) {
        this.puitService.updatePuit(this.puit).subscribe(() => {
          this.puitService.getAllPuits().subscribe((puits: Puit[]) => {
            this.puits = puits;
          });
        });
        console.log('Puit updated');
        this.isUpdateUser = false;
      } else {
        this.puitService.addPuit(this.puit).subscribe(() => {
          this.puitService.getAllPuits().subscribe((puits: Puit[]) => {
            this.puits = puits;
          });
        });
        console.log('Puit added');
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

  exportrapport(puit :Puit) {

    console.log(new JsonPipe().transform(puit)) ;
  }

  getAllPuit() {
    this.loading=true;
    this.puitService.getAllPuits().subscribe((puits: Puit[]) => {
      this.puits = puits;
      this.loading=false;

    });
  }
}
