import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
import { DragDropModule } from 'primeng/dragdrop';
import {PickListModule} from "primeng/picklist";
import {ProduitService} from "../../Services/produit.service";
import {InventaireProduitAssociation} from "../../Models/InventaireProduitAssociation";
import {ProduitDefectueuxService} from "../../Services/produit-defectueux.service";
import {ProduitDefectueux} from "../../Models/produitDefectueux";
import {PaginatorModule} from "primeng/paginator";

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
    PaginatorModule


  ],
  templateUrl: './ajouter-inventaire.component.html',
  styleUrl: './ajouter-inventaire.component.css'
})
export class AjouterInventaireComponent implements OnInit{

  checked: boolean = false;

  cols: any[] = [];
  // ====================
  visibale:boolean=false;
  produit:Produit={};
  listeProduits:Produit[] =[];

  inventaire:Inventaire={inventaireProduitAssociations :[]};

  // =================
  association:InventaireProduitAssociation={};
  selectedProduit: Produit[] = [];
  private inventaireId:any;
  public  isUpdateInventaire:boolean=false;
  sourceProduits!: Produit[];

  targetProduits!: Produit[];

  produitsDefectueux?: ProduitDefectueux[];
  produitDefectueux: ProduitDefectueux={};
  originalProduit : Produit={};

  constructor(private router: Router,private inventaireService:InventaireService,
              private produitService:ProduitService,private route:ActivatedRoute,
              private cdr: ChangeDetectorRef, private produitDefectueuxService :ProduitDefectueuxService)
  {}



  ngOnInit(): void {
    this.inventaireId=this.route.snapshot.paramMap.get('id');
    this.isUpdateInventaire=this.inventaireId!==null;
     this.inventaire.dateInventaire=new Date() ;
    this.inventaire.inventaireProduitAssociations=[]
    this.inventaire.reference="Inv-"+new Date().getFullYear() ;
    this.sourceProduits=[];
    this.produitService.getProduit().subscribe(value => {
      this.sourceProduits=[...value]
      this.listeProduits=[...value] ;
      this.cdr.markForCheck();
      console.log('=============>>>>>>>>    '+new JsonPipe().transform(this.sourceProduits))

    })
    this.targetProduits = [];
   this.getInventaireById();
  }
getInventaireById(){
  this.inventaireService.getInventaireById(this.inventaireId).subscribe(value => {
    this.inventaire = value;
    if(this.inventaire.inventaireProduitAssociations){
      this.inventaire.inventaireProduitAssociations.forEach(value1 => {
        if(value1.produit)
          this.targetProduits.push(value1.produit)
      })
    }

  })
}

  retour() {
    this.router.navigate(['/inventaire']);
  }





  showDialog() {
    this.visibale=true;

  }

  hideDialog() {
this.visibale=false;
  }





  saveInventaire() {

    if(this.inventaire.dateInventaire && this.inventaire.reference) {

      // this.produitsDefectueux = this.targetProduits;
     // console.log("target defectueux", this.produitsDefectueux);
      this.inventaireService.createInventaire(this.inventaire).subscribe(
        value => {this.router.navigate(['/inventaire']);
          this.inventaire = value;
          this.createProduitDefectueux(this.inventaire);

        },error => {
        console.log(error)
      })

    }
    else {
    }
  }

  // createProduitDefectueux(inventaire : Inventaire)
  // {
  //   if(inventaire && inventaire.inventaireProduitAssociations && inventaire.inventaireProduitAssociations.length >0) {
  //     for (const association of inventaire.inventaireProduitAssociations) {
  //       let produitDefect: ProduitDefectueux = {};
  //       produitDefect.idInventaire = inventaire.id;
  //       produitDefect.idProduit = association.produit?.id;
  //       if (association.produit?.id)
  //         this.produitService.getProduitById(association.produit?.id).subscribe(value => {
  //           this.originalProduit = value;
  //           if (this.originalProduit?.quantite && association.quantitePI)
  //             produitDefect.quantiteDefectueux = this.originalProduit?.quantite - association.quantitePI;
  //
  //         });
  //
  //       this.produitDefectueuxService.createProduitDefectueux(produitDefect).subscribe(value => {
  //       });
  //     }
  //   }
  // }

  createProduitDefectueux(inventaire: Inventaire) {
    if (inventaire && inventaire.inventaireProduitAssociations && inventaire.inventaireProduitAssociations.length > 0) {

      for (const association of inventaire.inventaireProduitAssociations) {
        if (association.produit?.id) {
          this.produitService.getProduitById(association.produit.id)
            .toPromise() // Convertir l'Observable en Promise
            .then(originalProduit => {
              const produitDefect: ProduitDefectueux = {};
              produitDefect.idInventaire = inventaire.id;
              if(association.produit?.id)
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

  saveProduitClacule() {
    this.inventaire.inventaireProduitAssociations = [];
    for (const produit of [...this.targetProduits]) {
      this.association.quantitePI = produit.quantite;
      this.association.produit = this.listeProduits.find(value => produit.id ==value.id );

      this.inventaire.inventaireProduitAssociations.push(this.association);
    }
    this.visibale=false;
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteIntervention(produit: Produit) {

    if (this.isUpdateInventaire==true){
      this.produitService.deleteProduit(produit.id).subscribe(value => { this.getInventaireById()
      } )


      this.targetProduits = this.targetProduits.filter(item => item !== produit)
    }else {
      this.targetProduits = this.targetProduits.filter(item => item !== produit);
    }
  }

  editIntrvention(produuit: Produit) {
    this.produit = { ...produuit };

    this.visibale=true

  }

  // @ts-ignore
  getqtyRestant(produit: Produit):number {

    let qty=0 ;
    let inventaireProduitAssociations=this.inventaire.inventaireProduitAssociations
    if(inventaireProduitAssociations){
     inventaireProduitAssociations.forEach(value => {
       if(value.produit && value.produit.id==produit.id){
         if(value.quantitePI) {
           qty = value.quantitePI;
         }else {
           console.log("no qty")
         }
       }
     })
    }else {
      console.log("no inventaireProduitAssociations")
    }

    return qty ;

     }
}
