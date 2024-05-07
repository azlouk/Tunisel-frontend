import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DatePipe, JsonPipe, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";

import {Inventaire} from "../../Models/inventaire";
import {ActivatedRoute, Router} from "@angular/router";
import {InterventionService} from "../../Services/intervention.service";
import {InventaireService} from "../../Services/inventaire.service";
import {Produit} from "../../Models/produit";
import {DragDropModule} from 'primeng/dragdrop';
import {PickListModule} from "primeng/picklist";
import {ProduitService} from "../../Services/produit.service";
import {InventaireProduitAssociation} from "../../Models/InventaireProduitAssociation";
import {ProduitDefectueuxService} from "../../Services/produit-defectueux.service";
import {ProduitDefectueux} from "../../Models/produitDefectueux";
import {PaginatorModule} from "primeng/paginator";
import {find} from "rxjs";
import {ListboxModule} from "primeng/listbox";
import {ConsoleLogger} from "@angular/compiler-cli";

@Component({
  selector: 'app-ajouter-inventaire',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    DatePipe,
    DialogModule,
    FloatLabelModule,
    InputTextModule,
    NgIf,
    RadioButtonModule,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
    ToolbarModule,
    FormsModule,
    DragDropModule,
    PickListModule,
    PaginatorModule,
    ListboxModule


  ],
  templateUrl: './ajouter-inventaire.component.html',
  styleUrl: './ajouter-inventaire.component.css'
})
export class AjouterInventaireComponent implements OnInit {


  checked: boolean = false;

  cols: any[] = [];
  // ====================
  visibale: boolean = false;
  produit: Produit = {};

  listeProduits: Produit[] = [];
  inventaire: Inventaire = {inventaireProduitAssociations: []};

  // =================
  selectedProduit: Produit[] = [];
  private inventaireId: any;
  public isUpdateInventaire: boolean = false;
  public isAjoutProduit: boolean = false;
  sourceProduits!: Produit[];

  targetProduits!: Produit[];
  sourceUpdate!: Produit[];

  targetUpdate!: Produit[];
  produitsDefectueux?: ProduitDefectueux[];
  produitDefectueux: ProduitDefectueux = {};
   association: any = {};


  constructor(private router: Router, private inventaireService: InventaireService,
              private produitService: ProduitService, private route: ActivatedRoute,
              private cdr: ChangeDetectorRef, private produitDefectueuxService: ProduitDefectueuxService) {
  }


  ngOnInit(): void {

this.listeProduits
    this.inventaireId = this.route.snapshot.paramMap.get('id');
    this.isUpdateInventaire = this.inventaireId !== null;
    this.inventaire.dateInventaire = new Date();
    this.inventaire.inventaireProduitAssociations = []
    this.inventaire.reference = "Inv-" + new Date().getFullYear();
    this.sourceProduits = [];
this.sourceUpdate = [];
      this.produitService.getProduit().subscribe(value => {
        this.sourceProduits = [...value]

        this.listeProduits = [...value];

        this.cdr.markForCheck();
console.log("on init", this.sourceUpdate)
      })

    if (this.isUpdateInventaire) {

      this.inventaireService.getProduitFiltre(this.inventaireId).subscribe(value => {
        this.sourceUpdate = [...value];
      });

    }

    this.targetProduits = [];
  if(this.isUpdateInventaire){
    this.getInventaireById();

  }


  }

  getInventaireById() {
    if(!this.isUpdateInventaire){
      this.targetProduits = [];
    }
    else{
      this.targetUpdate = [];
    }
    this.inventaireService.getInventaireById(this.inventaireId).subscribe(value => {
      this.inventaire = value;
      if (this.inventaire.inventaireProduitAssociations) {
        this.inventaire.inventaireProduitAssociations.forEach((value1: InventaireProduitAssociation) => {
          if (value1.produit) {
            // const newP: Produit = {id: value1.produit.id, nom: value1.produit.nom}
            const newP=value1.produit
            // if(!this.isUpdateInventaire){
            // this.targetProduits.push(newP)
            //   console.log("createnewP"+newP)
            // }
            // else{

              // console.log("updatenewP"+newP)

              this.targetUpdate.push(newP)
            console.log('new listeUpdated: ',JSON.stringify(this.targetUpdate))
            // }
          }
        })
      }

    })

  }
  retour() {
    this.router.navigate(['/inventaire']);
  }


  showDialog() {
    this.isAjoutProduit = true;
    this.visibale = true;
     this.targetUpdate = [];

    if (this.isUpdateInventaire) {

      this.inventaireService.getProduitFiltre(this.inventaireId).subscribe(value => {
        this.targetProduits = [...value];
      });
    }
  }

  hideDialog() {
    this.visibale = false;
  }


  saveInventaire() {

    if (this.inventaire.dateInventaire && this.inventaire.reference) {


      if (this.isUpdateInventaire) {
        this.inventaireService.updateInventaire(this.inventaire).subscribe(
          value => {
            this.router.navigate(['/inventaire']);
            this.inventaire = value;
            this.createProduitDefectueux(this.inventaire);
            this.isUpdateInventaire = false;

          }, error => {
            console.log(error)
          })
      } else {
        this.inventaireService.createInventaire(this.inventaire).subscribe(
          value => {
            this.router.navigate(['/inventaire']);
            this.inventaire = value;
            this.createProduitDefectueux(this.inventaire);
          }, error => {
            console.log(error)
          })
      }
    } else {
    }
  }




  createProduitDefectueux(inventaire: Inventaire) {
    if (inventaire && inventaire.inventaireProduitAssociations && inventaire.inventaireProduitAssociations.length > 0) {

      for (const association of inventaire.inventaireProduitAssociations) {
        if (association.produit?.id) {
          this.produitService.getProduitById(association.produit.id)
            .toPromise() // Convertir l'Observable en Promise
            .then(originalProduit => {
              const produitDefect: ProduitDefectueux = {};
              produitDefect.idInventaire = inventaire.id;
              if (association.produit?.id)
                produitDefect.idProduit = association.produit.id;
              if (originalProduit && originalProduit.quantite && association.quantitePI) {
                produitDefect.quantiteDefectueux = originalProduit.quantite - association.quantitePI;
                this.produitDefectueuxService.createProduitDefectueux(produitDefect).subscribe(value => {
                });
              }
            })
            .catch(error => {
              console.error("Une erreur s'est produite lors de la récupération du produit :", error);
            });
        }
      }
    }
  }

  // saveProduitClacule() {
  //   let TargetListProduit = [];
  //   if (this.isUpdateInventaire) {
  //     TargetListProduit = [...this.targetUpdate];
  //   } else {
  //     this.inventaire.inventaireProduitAssociations = [];
  //     TargetListProduit = [...this.targetProduits];
  //   }
  //   for (const produit of TargetListProduit) {
  //     this.association.quantitePI = produit.quantite;
  //     this.association.produit = this.listeProduits.find(value => produit.id === value.id);
  //     this.produit.quantite = this.listeProduits.find(value => produit.id === value.id ? value.quantite : 0);
  //     this.inventaire.inventaireProduitAssociations?.push(this.association);
  //   }
  //   this.visibale = false;
  // }

  saveProduitClacule() {
    let TargetListProduit = [];
    if (this.isUpdateInventaire) {
      TargetListProduit = [...this.targetUpdate];
    } else {
      this.inventaire.inventaireProduitAssociations = [];
      TargetListProduit = [...this.targetProduits];
    }
    for (const produit of TargetListProduit) {
      this.association.quantitePI = produit.quantite;
      this.association.produit = this.listeProduits.find(value => produit.id === value.id);

      // Vérification si produit est trouvé
      const foundProduit = this.listeProduits.find(value => produit.id === value.id);
      if (foundProduit) {
        this.produit.quantite = foundProduit.quantite;
      } else {
        this.produit.quantite = 0;
      }
      this.inventaire.inventaireProduitAssociations?.push(this.association);
    }
    this.visibale = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteProduitFromInventaire(produit: Produit) {
    if (this.isUpdateInventaire) {
      this.inventaire.inventaireProduitAssociations = this.inventaire.inventaireProduitAssociations?.filter(item => item.produit !== produit)

    } else {
      this.inventaire.inventaireProduitAssociations = this.inventaire.inventaireProduitAssociations?.filter(item => item.produit !== produit)
    }
  }

  editIntrvention(produuit: Produit) {
    this.produit = {...produuit};

    this.visibale = true

  }


  getqtyRestant(produit: Produit): number {

    let qty = 0;
    let inventaireProduitAssociations = this.inventaire.inventaireProduitAssociations
    if (inventaireProduitAssociations) {
      inventaireProduitAssociations.forEach(value => {
        if (value.produit && value.produit.id == produit.id) {
          if (value.quantitePI) {
            qty = value.quantitePI;
          } else {
          }
        }
      })
    } else {
    }

    return qty;

  }

  onRowEditSave(p: any) {

  }


  onRowEditInit(p: any) {

  }

  filterSource(): Produit[] {
    if (this.isUpdateInventaire == true) {



      const newListFiltre: Produit[] = [...this.sourceProduits.filter((p: Produit) =>
        this.inventaire.inventaireProduitAssociations?.find((pinv: InventaireProduitAssociation) => pinv.produit?.id == p.id) == undefined)];
      return newListFiltre
    } else {
      return this.sourceProduits;
    }

  }


}
