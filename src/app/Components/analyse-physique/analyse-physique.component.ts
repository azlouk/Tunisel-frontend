import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {JsonPipe, NgIf} from "@angular/common";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
import {Router} from "@angular/router";
 import {AnalysePhysiqueService} from "../../Services/analysePhysique.service";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import {getToken} from "../../../main";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-analyse-physique',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    NgIf,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FormsModule,
    CalendarModule
  ],
  templateUrl: './analyse-physique.component.html',
  styleUrl: './analyse-physique.component.css'
})
export class AnalysePhysiqueComponent implements OnInit{
  date!: Date;
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};


  submitted: boolean = false;

  cols: any[] = [];


  rowsPerPageOptions = [5, 10, 20];
  // ======********============

  analysesPhysiques:AnalysesPhysique[] = [];

  analysePhysique:AnalysesPhysique={};
  public updateAnalysePhysique:AnalysesPhysique={};
  selectedAnalysesPhysiques: AnalysesPhysique[] = [];
  private isUpdateAnalysePhysique=false;

  constructor(private router: Router,  private messageService: MessageService,private analysePhysiqueService :AnalysePhysiqueService) {}

  ngOnInit() {
this.getALLphysique() ;

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

    this.router.navigate(['/ajouterPrelevmentPhysique']);
  }

  deleteSelectedAnalysesPhysiques() {

    this.deleteProductsDialog = true;

  }

  editAnalysePhysique(analysePhysique: AnalysesPhysique) {
    this.router.navigate([`/updatePrelevmentPhysique/${analysePhysique.id}`]);
    this.isUpdateAnalysePhysique=true;
    this.analysePhysique = { ...analysePhysique };
    this.updateAnalysePhysique = { ...analysePhysique };

    this.productDialog = true;
  }

  deleteAnalysePhysique(analysePhysique: AnalysesPhysique) {
    this.deleteProductDialog = true;

    this.analysePhysique = { ...analysePhysique };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    // console.log(this.selectedAnalysesPhysiques.length)
    this.selectedAnalysesPhysiques.forEach(selectedAnalysePhysique => {
      this.analysePhysiqueService.deleteAnalysesPhysiques(selectedAnalysePhysique.id).subscribe(
        () => {
          this.analysesPhysiques = this.analysesPhysiques.filter(analysePhysique =>analysePhysique.id !== selectedAnalysePhysique.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    this.selectedAnalysesPhysiques = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.analysesPhysiques = this.analysesPhysiques.filter(val => val.id !== this.analysePhysique.id);
    if (this.analysePhysique.id!= null) {
      this.analysePhysiqueService.deleteAnalysesPhysiques(this.analysePhysique.id).subscribe(() => console.log("analyse Chimique deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Analyse Chimique Deleted', life: 3000 });
    this.analysePhysique ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getALLphysique() {
    this.loading=true ;

    this.analysePhysiqueService.getAllAnalysesPhysiques().subscribe((analysesPhysiques:  AnalysesPhysique[]) => {
      this.analysesPhysiques=analysesPhysiques;
       this.analysesPhysiques.forEach(analysephysique => {
        if (analysephysique.id != null) {
          this.analysePhysiqueService.getElementByAnalysesPhysiquesId(analysephysique.id).subscribe((value: any) => {
            // if(value.puit){
            //   analysephysique.ref=value.puit.reference+ " "+value.puit.nom
            // }
            if(value.bassin){
              analysephysique.ref=value.bassin.reference+ " "+value.bassin.nom
            }
             if(value.sbl) {
              analysephysique.ref=value.sbl.reference
            }
            if(value.sbnl) {
              analysephysique.ref=value.sbnl.reference
            }
            if(value.sblf) {
              analysephysique.ref=value.sblf.reference
            } if(value.bande) {
              analysephysique.ref=value.bande.reference
            }




          }, error => {

          });
        }
      })

      this.loading=false ;

    },error => {
      console.log(error)})
  }
  filterPerMonth(date: Date) {
    if (!date) {
      this.getALLphysique();
      return;
    }
    this.analysesPhysiques = this.analysesPhysiques.filter(value => {
      if (value.dateAnalyse) {
        const analyseDate = new Date(value.dateAnalyse);
        return analyseDate.getFullYear() === date.getFullYear() && analyseDate.getMonth() === date.getMonth();
      }
      return false;
    });
  }

  protected readonly getToken = getToken;
  loading: boolean=false;

}
