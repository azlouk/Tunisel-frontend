import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
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
    FormsModule,
    InputTextModule,
    NgIf,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
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

  produitDefectueuxs: ProduitDefectueux[]=[];
  produitDefectueux:ProduitDefectueux={};
  selectedProduitDefectueuxs: ProduitDefectueux[] = [];

  private isUpdateProduitDefectuation=false;




  constructor( private messageService: MessageService,private produitDefectueuxService :ProduitDefectueuxService) {}

  ngOnInit() {


    this.produitDefectueuxService.getAllProduitsDefectueux().subscribe(value => {this.produitDefectueuxs=value},
      error => {console.log(error)})

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'nom', header: 'nom' },
      { field: 'description', header: 'description' },
      { field: 'quantite', header: 'quantite' },
      { field: 'dateDafectation', header: 'dateDafectation' },


    ];


  }

  openNew() {
    this.produitDefectueux;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProduitDefectuation() {

    this.deleteProductsDialog = true;

  }

  editProduitDefectuation(produitDefectueux: ProduitDefectueux) {
    this.isUpdateProduitDefectuation=true;


    this.produitDefectueux = { ...produitDefectueux };
    this.productDialog = true;
  }

  deleteProduitDefectuation(produitDefectueux: ProduitDefectueux) {
    this.deleteProductDialog = true;

    this.produitDefectueux = { ...produitDefectueux };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedProduitDefectueuxs.length)
    this.selectedProduitDefectueuxs.forEach(selectedProduitDefectueux => {
      this.produitDefectueuxService.deleteProduitDefectueux(selectedProduitDefectueux.id).subscribe(
        () => {
          this.produitDefectueuxs = this.produitDefectueuxs.filter(produitDefectueux =>produitDefectueux.id !== selectedProduitDefectueux.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Article Deleted', life: 3000 });
    this.selectedProduitDefectueuxs = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.produitDefectueux.id", this.produitDefectueux.id);
    this.produitDefectueuxs = this.produitDefectueuxs.filter(val => val.id !== this.produitDefectueux.id);
    if (this.produitDefectueux.id!= null) {
      this.produitDefectueuxService.deleteProduitDefectueux(this.produitDefectueux.id).subscribe(() => console.log("produitDefectueux deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'produitDefectueux Deleted', life: 3000 });
    this.produitDefectueux ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduitDefectuation() {
    this.submitted = false;
    this.productDialog=false
    // alert(new JsonPipe().transform(this.produitDefectueux))
    if(this.isUpdateProduitDefectuation==true) {
      this.produitDefectueuxService.updateProduitDefectueux(this.produitDefectueux).subscribe(() =>{
        this.produitDefectueuxService.getAllProduitsDefectueux().subscribe((produitDefectueuxs: ProduitDefectueux[]) => {
          this.produitDefectueuxs = produitDefectueuxs;
        });
      });
      console.log('produitDefectueux updated');
      this.isUpdateProduitDefectuation=false;
    }
    else
    {
      console.log(new JsonPipe().transform("====================>>>>>>"+this.produitDefectueux))

      this.produitDefectueuxService.createProduitDefectueux(this.produitDefectueux).subscribe(() => {

        this.produitDefectueuxService.getAllProduitsDefectueux().subscribe((produitDefectueuxs: ProduitDefectueux[]) => {
          this.produitDefectueuxs = produitDefectueuxs;
        });
      });
      this.produitDefectueux={}
      console.log('produitDefectueux added');
    }
  }





  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
