import {Component, Injectable, OnInit} from '@angular/core';
import {Product} from "../../Models/product";
import {Puit} from "../../Models/puit";
import {ProductService} from "../../Services/product.service";
import {MessageService, SharedModule} from "primeng/api";
import {PuitService} from "../../Services/puit.service";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {Table, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Router} from "@angular/router";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {AnalyseChimiqueService} from "../../Services/analyse-chimique.service";

@Component({
  selector: 'app-analyse-chimique',
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
  templateUrl: './analyse-chimique.component.html',
  styleUrl: './analyse-chimique.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class AnalyseChimiqueComponent implements OnInit{
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

  analysesChimiques:AnalysesChimique[] = [];

  analyseChimique:AnalysesChimique={};
  public updateAnalyseChimique:AnalysesChimique={};
  selectedAnalysesChimiques: AnalysesChimique[] = [];
  private isUpdateAnalyseChimique=false;

  constructor(private router: Router,private productService: ProductService, private messageService: MessageService,private analyseChimiqueService :AnalyseChimiqueService) {}

  ngOnInit() {
    this.analyseChimiqueService.getAllAnalysesChimiques().subscribe((analysesChimiques:  AnalysesChimique[]) => {
      this.analysesChimiques=analysesChimiques;
      console.log(new JsonPipe().transform("====================>>>>>>"+this.analysesChimiques))

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

    this.router.navigate(['/ajouterPrelevmentChimique']);
  }

  deleteSelectedAnalysesChimiques() {

    this.deleteProductsDialog = true;

  }

  editAnalyseChimique(analyseChimique: AnalysesChimique) {
    this.router.navigate([`/updatePrelevmentChimique/${analyseChimique.id}`]);
    this.isUpdateAnalyseChimique=true;
    this.analyseChimique = { ...analyseChimique };
    this.updateAnalyseChimique = { ...analyseChimique };
    console.log('======>>>> hhffhfhfhfffhhf  '+new JsonPipe().transform(this.updateAnalyseChimique))

    this.productDialog = true;
  }

  deleteAnalyseChimique(analyseChimique: AnalysesChimique) {
    this.deleteProductDialog = true;

    this.analyseChimique = { ...analyseChimique };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedAnalysesChimiques.length)
    this.selectedAnalysesChimiques.forEach(selectedAnalyseChimique => {
      this.analyseChimiqueService.deleteAnalyseChimique(selectedAnalyseChimique.id).subscribe(
        () => {
          this.analysesChimiques = this.analysesChimiques.filter(analyseChimique =>analyseChimique.id !== selectedAnalyseChimique.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    this.selectedAnalysesChimiques = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.analysesChimiques = this.analysesChimiques.filter(val => val.id !== this.analyseChimique.id);
    if (this.analyseChimique.id!= null) {
      this.analyseChimiqueService.deleteAnalyseChimique(this.analyseChimique.id).subscribe(() => console.log("analyse Chimique deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Analyse Chimique Deleted', life: 3000 });
    this.analyseChimique ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
