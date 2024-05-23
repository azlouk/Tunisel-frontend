import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import {Router} from "@angular/router";
 import {Commande} from "../../Models/commande";
import {CommandeService} from "../../Services/commande.service";
import {getToken} from "../../../main";

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    NgIf,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule
  ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit{
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};


  submitted: boolean = false;

  cols: any[] = [];


  rowsPerPageOptions = [5, 10, 20];
  // ======********============

  comanndes:Commande[] = [];

  commande:Commande={};
 updateCommande:Commande={};
  selectedCommandes:Commande[] = [];
isUpdateCommande:boolean=false;

  constructor(private router: Router,  private messageService: MessageService,private commandeService :CommandeService) {}

  ngOnInit() {
    this. getAllCommandes() ;

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

    this.router.navigate(['/ajouterCommande']);
  }

  deleteSelectedAnalysesPhysiques() {

    this.deleteProductsDialog = true;

  }

  editCommande(commande: Commande) {
    this.router.navigate([`/updateCommande/${commande.id}`]);
    this.isUpdateCommande=true;
    this.commande = { ...commande };
    this.updateCommande = { ...commande };

  }

  deleteCommande(commande: Commande) {
    this.deleteProductDialog = true;
    this.commande = { ...commande };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedCommandes.length)
    this.selectedCommandes.forEach(selectedCommandes => {
      this.commandeService.deleteCommande(selectedCommandes.id).subscribe(
        () => {
          this.comanndes = this.comanndes.filter(commande =>commande.id !== selectedCommandes.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    this.selectedCommandes = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.comanndes = this.comanndes.filter(val => val.id !== this.commande.id);
    if (this.commande.id!= null) {
      this.commandeService.deleteCommande(this.commande.id).subscribe(() => console.log("Command Deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Command Deleted', life: 3000 });
    this.commande ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAllCommandes() {
    this.commandeService.getAllCommande().subscribe((ListCommande:  Commande[]) => {
      this.comanndes=ListCommande;}, error => {
      console.log(error)});
        }


    protected readonly getToken = getToken;
}
