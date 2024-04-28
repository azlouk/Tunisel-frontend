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
    PickListModule


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

  inventaire:Inventaire={};

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
     this.inventaire.dateInventaire=new Date() ;
     this.inventaire.reference="Inv-"+new Date().getFullYear() ;
    this.sourceProduits=[];
    this.produitService.getProduit().subscribe(value => {
      this.sourceProduits=value
      this.listeProduits=[...value] ;
      this.cdr.markForCheck();
      console.log('=============>>>>>>>>    '+new JsonPipe().transform(this.sourceProduits))

    })
    this.targetProduits = [];
  }


  retour() {
    this.router.navigate(['/inventaire']);
  }





  showDialog() {
    this.visibale=true;

  }

  hideDialog() {

  }





  saveInventaire() {
    if(this.inventaire.dateInventaire && this.inventaire.reference) {
      this.inventaire.inventaireProduitAssociations = [];
      for (const produit of this.targetProduits) {
        this.association.produit = this.listeProduits.find(value => value.id == produit.id);
        this.association.quantitePI = produit.quantite;
        this.inventaire.inventaireProduitAssociations.push(this.association);
      }
      this.produitsDefectueux = this.targetProduits;
      console.log("target defectueux", this.produitsDefectueux);
      this.inventaireService.createInventaire(this.inventaire).subscribe(value => {
       console.log(new JsonPipe().transform(value))
     })
      this.createProduitDefectueux()
      this.router.navigate(['/inventaire']);
    }


    else {
    }
  }

  createProduitDefectueux()
  {
    if(this.produitsDefectueux)
    {
      for (const produitDefect of this.produitsDefectueux)
      {
        if(produitDefect.id) {
          this.produitService.getProduitById(produitDefect.id).subscribe(value => {
            this.originalProduit = value;
            console.log(new JsonPipe().transform(value))

            if(this.originalProduit && this.originalProduit.quantite && produitDefect.quantite) {
              produitDefect.quantite = this.originalProduit.quantite - produitDefect.quantite;
             let  quantitedeffect=this.originalProduit.quantite - produitDefect.quantite;

              console.log('pi==========================>',new JsonPipe().transform(this.association.quantitePI))


            }

          })

        }
      }
    }

  }
  saveProduitClacule() {
    this.visibale=false;
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteIntervention(produuit: Produit) {

    // if (this.isUpdateFichVie==true){
    //   this.interventionService.deleteIntervention(intervention.id).subscribe(value => { this.inventaireService.getFicheById(this.inventaireId).subscribe(value =>{this.inventaire=value;
    //     this.listeInterventions=this.inventaire.interventions==undefined?[]:this.inventaire.interventions ;
    //   } )
    //
    //   })
    //   this.listeInterventions = this.listeInterventions.filter(item => item !== intervention)
    // }else {
    //   this.listeInterventions = this.listeInterventions.filter(item => item !== intervention);
    // }
  }

  editIntrvention(produuit: Produit) {
    this.produit = { ...produuit };
    this.visibale=true

  }
}
