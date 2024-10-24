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


import {CalendarModule} from "primeng/calendar";
import {Produit} from "../../Models/produit";
import {ProduitService} from "../../Services/produit.service";
import {Article} from "../../Models/article";
import {ArticleService} from "../../Services/article.service";
import {ListboxModule} from "primeng/listbox";
import {getToken} from "../../../main";

@Component({
  selector: 'app-produit',
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
    CalendarModule,
    ListboxModule
  ],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit{
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;




  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============

  produits: Produit[]=[];
  produit:Produit={};
  selectedProduit: Produit[] = [];

  private isUpdateProduit=false;
  articles: Article[]=[];





  constructor( private messageService: MessageService,private produitService :ProduitService,private articleService :ArticleService) {}

  ngOnInit() {

    this.articleService.getAllArticles()
      .subscribe((a: Article[]) => {
        this.articles = a;
      }, error => {
        console.log('Error fetching users:', error);
      });
    this.produitService.getProduit().subscribe(value => {this.produits=value},
      error => {console.log(error)})

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'nom', header: 'nom' },
      { field: 'quantite', header: 'quantite' },
      { field: 'reference', header: 'reference' },
      { field: 'article', header: 'article' },


    ];


  }

  openNew() {
    this.produit;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProduit() {

    this.deleteProductsDialog = true;

  }

  editProduit(produit: Produit) {
    this.isUpdateProduit=true;


    this.produit = { ...produit };
    this.productDialog = true;
  }

  deleteProduit(produit: Produit) {
    this.deleteProductDialog = true;

    this.produit = { ...produit };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.selectedProduit.forEach(selectedProduit => {
      this.produitService.deleteProduit(selectedProduit.id).subscribe(
        () => {
          this.produits = this.produits.filter(produit =>produit.id !== selectedProduit.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Article Deleted', life: 3000 });
    this.selectedProduit = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.produits = this.produits.filter(val => val.id !== this.produit.id);
    if (this.produit.id!= null) {
      this.produitService.deleteProduit(this.produit.id).subscribe(() => console.log("produit deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'produit Deleted', life: 3000 });
    this.produit ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduit() {
    this.submitted = true;
    if (this.produit.reference?.trim() && this.produit.article){
      this.productDialog=false;
      if(this.isUpdateProduit==true) {
        this.produitService.updateProduit(this.produit).subscribe(() =>{
          this.produitService.getProduit().subscribe((produits: Produit[]) => {
            this.produits = produits;
          });
        });
        this.isUpdateProduit=false;
        this.produit={}

      }
      else
      {

        this.produitService.createProduit(this.produit).subscribe(() => {

          this.produitService.getProduit().subscribe((produits: Produit[]) => {
            this.produits = produits;
          });
        });
        this.produit={}
      }
    }


  }





  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

    protected readonly getToken = getToken;
}
