import {Component, OnInit} from '@angular/core';
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {NgClass, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ProduitDefectueux} from "../../Models/produitDefectueux";
import {ProduitDefectueuxService} from "../../Services/produit-defectueux.service";
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-produit-defectueux',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FormsModule,
    NgClass,
    CalendarModule
  ],
  templateUrl: './produit-defectueux.component.html',
  styleUrl: './produit-defectueux.component.css'
})
export class ProduitDefectueuxComponent implements OnInit{
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;




  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============

  produitsdefectueux: ProduitDefectueux[]=[];
  produitdefectueux:ProduitDefectueux={};
  selectedProduitdefectueux: ProduitDefectueux[] = [];

  private isUpdateProduitDefectuation=false;




  constructor( private messageService: MessageService,private produitdefectueuxService :ProduitDefectueuxService) {}

  ngOnInit() {

    this.produitdefectueuxService.getAllProduitsDefectueux().subscribe(value => {this.produitsdefectueux=value},
      error => {console.log(error)})

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'nom', header: 'nom' },
      { field: 'idProduit', header: 'idProduit' },
      { field: 'idInventaire', header: 'idInventaire' },
      { field: 'quantiteDefectueux', header: 'quantiteDefectueux' },

      { field: 'description', header: 'description' },
      { field: 'dateDeffectuation', header: 'dateDeffectuation' },

    ];


  }

  openNew() {
    this.produitdefectueux;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProduitDefectueuxs() {

    this.deleteProductsDialog = true;

  }

  editProduitDefectueux(produitdefectueux: ProduitDefectueux) {
    this.isUpdateProduitDefectuation=true;


    this.produitdefectueux = { ...produitdefectueux };
    this.productDialog = true;
  }

  deleteProduitDefectueux(produitdefectueux: ProduitDefectueux) {
    this.deleteProductDialog = true;

    this.produitdefectueux = { ...produitdefectueux };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedProduitdefectueux.length)
    this.selectedProduitdefectueux.forEach(selectedProduitDefectueux => {
      this.produitdefectueuxService.deleteProduitDefectueux(selectedProduitDefectueux.id).subscribe(
        () => {
          this.produitsdefectueux = this.produitsdefectueux.filter(produitdefectueux =>produitdefectueux.id !== selectedProduitDefectueux.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'ProduitDefectueux Deleted', life: 3000 });
    this.selectedProduitdefectueux = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.produitdefectueux.id", this.produitdefectueux.id);
    this.produitsdefectueux = this.produitsdefectueux.filter(val => val.id !== this.produitdefectueux.id);
    if (this.produitdefectueux.id!= null) {
      this.produitdefectueuxService.deleteProduitDefectueux(this.produitdefectueux.id).subscribe(() => console.log("produitdefectueux deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'produitdefectueux Deleted', life: 3000 });
    this.produitdefectueux ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduitDefectuation() {
    this.submitted = false;
    this.productDialog=false
    // alert(new JsonPipe().transform(this.produitdefectueux))
    if(this.isUpdateProduitDefectuation==true) {
      this.produitdefectueuxService.updateProduitDefectueux(this.produitdefectueux).subscribe(() =>{
        this.produitdefectueuxService.getAllProduitsDefectueux().subscribe((produitsdefectueux: ProduitDefectueux[]) => {
          this.produitsdefectueux = produitsdefectueux;
        });
      });
      console.log('produitdefectueux updated');
      this.isUpdateProduitDefectuation=false;
    }
    else
    {
      this.produitdefectueuxService.createProduitDefectueux(this.produitdefectueux).subscribe(() => {

        this.produitdefectueuxService.getAllProduitsDefectueux().subscribe((produitsdefectueux: ProduitDefectueux[]) => {
          this.produitsdefectueux = produitsdefectueux;
        });
      });
      console.log('produitdefectueux added');
    }
    this.produitdefectueux={}
  }





  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }



}
