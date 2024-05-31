import { Component, Injectable, OnInit } from '@angular/core';
import { Product } from "../../Models/product";
import { MessageService, SharedModule } from "primeng/api";
import { AsyncPipe, DatePipe, JsonPipe, NgClass, NgIf } from "@angular/common";
import { Table, TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { Router } from "@angular/router";
import { AnalysesChimique } from "../../Models/analyses-chimique";
import { AnalyseChimiqueService } from "../../Services/analyse-chimique.service";
import { getToken } from "../../../main";
import { filter } from "rxjs";

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
    NgClass,
    AsyncPipe,
    JsonPipe,
    DatePipe
  ],
  templateUrl: './analyse-chimique.component.html',
  styleUrl: './analyse-chimique.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class AnalyseChimiqueComponent implements OnInit {
  date!: Date;

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

  analysesChimiques: AnalysesChimique[] = [];
  analyseChimique: AnalysesChimique = { dateAnalyse: new Date() };
  public updateAnalyseChimique: AnalysesChimique = {};
  selectedAnalysesChimiques: AnalysesChimique[] = [];
  private isUpdateAnalyseChimique = false;
  loadchimique: boolean = false;

  constructor(private router: Router, private messageService: MessageService, private analyseChimiqueService: AnalyseChimiqueService) { }

  ngOnInit() {
    this.getALLChimique();
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
    this.isUpdateAnalyseChimique = true;
    this.analyseChimique = { ...analyseChimique };
    this.updateAnalyseChimique = { ...analyseChimique };
    this.productDialog = true;
  }

  deleteAnalyseChimique(analyseChimique: AnalysesChimique) {
    this.deleteProductDialog = true;
    this.analyseChimique = { ...analyseChimique };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.selectedAnalysesChimiques.forEach(selectedAnalyseChimique => {
      this.analyseChimiqueService.deleteAnalyseChimique(selectedAnalyseChimique.id).subscribe(
        () => {
          this.analysesChimiques = this.analysesChimiques.filter(analyseChimique => analyseChimique.id !== selectedAnalyseChimique.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });
    this.messageService.add({ severity: 'success', summary: 'réussi', detail: 'supprimé', life: 3000 });
    this.selectedAnalysesChimiques = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.analysesChimiques = this.analysesChimiques.filter(val => val.id !== this.analyseChimique.id);
    if (this.analyseChimique.id != null) {
      this.analyseChimiqueService.deleteAnalyseChimique(this.analyseChimique.id).subscribe(() => console.log("analyse Chimique est bien supprimé"));
    }
    this.messageService.add({ severity: 'success', summary: 'réussi', detail: 'Analyse Chimique supprimé', life: 3000 });
    this.analyseChimique;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getALLChimique() {
    this.loadchimique = true;
    this.analyseChimiqueService.getAllAnalysesChimiques().subscribe((analysesChimiques: AnalysesChimique[]) => {
      this.analysesChimiques = analysesChimiques;
      this.analysesChimiques.forEach(analysechimique => {
        if (analysechimique.id != null) {
          this.analyseChimiqueService.getElementByAnalyseChimiqueId(analysechimique.id).subscribe((value: any) => {
            if (value.puit) {
              analysechimique.ref = value.puit.reference + " " + value.puit.nom;
            }
            if (value.bassin) {
              analysechimique.ref = value.bassin.reference + " " + value.bassin.nom;
            }
            if (value.sbl) {
              analysechimique.ref = value.sbl.reference;
            }
            if (value.sbnl) {
              analysechimique.ref = value.sbnl.reference;
            }
            if (value.sblf) {
              analysechimique.ref = value.sblf.reference;
            }
            if (value.bande) {
              analysechimique.ref = value.bande.reference;
            }
          }, error => {
            console.error(error);
          });
        }
      });
      this.loadchimique = false;

    }, error => {
      console.error(error);
    });
  }

  protected readonly getToken = getToken;
  protected readonly filter = filter;

  filterPerMonth(date: Date) {
    if (!date) {
      this.getALLChimique();
      return;
    }
    this.analysesChimiques = this.analysesChimiques.filter(value => {
      if (value.dateAnalyse) {
        const analyseDate = new Date(value.dateAnalyse);
        return analyseDate.getFullYear() === date.getFullYear() && analyseDate.getMonth() === date.getMonth();
      }
      return false;
    });
  }
}
