import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DatePipe, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {Puit} from "../../Models/puit";
import {Bassin} from "../../Models/bassin";
import {Sbnl} from "../../Models/sbnl";
import {Sbl} from "../../Models/sbl";
import {Sblf} from "../../Models/sblf";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {Intervention} from "../../Models/intervention";
import {FicheVie} from "../../Models/fichevie";
import {ActivatedRoute, Router} from "@angular/router";
import {InterventionService} from "../../Services/intervention.service";
import {FicheVieService} from "../../Services/fichevie.service";

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
    FormsModule
  ],
  templateUrl: './ajouter-inventaire.component.html',
  styleUrl: './ajouter-inventaire.component.css'
})
export class AjouterInventaireComponent implements OnInit{
  puits: Puit[] = [];
  selectedPuit:Puit={};
  bassins: Bassin[] = [];
  selectedBassin: Bassin = {};
  sbnls: Sbnl[] = [];
  selectedSbnl:Sbnl={};
  sbls: Sbl[] = [];
  selectedSbl:Sbl={};
  sblfs: Sblf[] = [];
  selectedSblf:Sblf={};
  checked: boolean = false;
  analysesChimique: AnalysesChimique={} ;
  cols: any[] = [];
  // ====================
  visibale:boolean=false;
  intervention:Intervention={};
  listeInterventions:Intervention[] =[];

  ficheVie:FicheVie={};

  // =================
  selectedIntervention: Intervention[] = [];
  private ficheVieId:any;
  public  isUpdateFichVie:boolean=false;
  constructor(private router: Router,private  interventionService:InterventionService,private ficheVieService:FicheVieService,private route:ActivatedRoute)
  {}



  ngOnInit(): void {
    this.ficheVieId=this.route.snapshot.paramMap.get('id');
    this.isUpdateFichVie=this.ficheVieId!==null;
    this.ficheVieService.getFicheById(this.ficheVieId).subscribe(value =>{this.ficheVie=value;
      this.listeInterventions=this.ficheVie.interventions==undefined?[]:this.ficheVie.interventions ;
    } )


  }


  retour() {
    this.router.navigate(['/etalonage']);
  }





  showDialog() {
    this.visibale=true;

  }

  hideDialog() {

  }





  saveFicheVie() {
    if (this.isUpdateFichVie){
      this.ficheVieService.updateFicheVie(this.ficheVie).subscribe(value =>   this.router.navigate(['/etalonage']))
    }
    else {
      this.ficheVie.interventions=this.listeInterventions;
      this.ficheVieService.createFicheVie(this.ficheVie).subscribe(value =>{this.listeInterventions=[];
        console.log('=====emp: '+this.ficheVie.emplacement)},error =>{ console.log('=====emp: '+this.ficheVie.emplacement)});
      this.router.navigate(['/etalonage']);}
  }

  saveIntervention() {
    if(this.isUpdateFichVie==true){
      this.interventionService.updateIntervention(this.intervention).subscribe(value => {console.log('intervent is update');


          this.visibale=false;
          this.ficheVieService.getFicheById(this.ficheVieId).subscribe(value =>{this.ficheVie=value;
            this.listeInterventions=this.ficheVie.interventions==undefined?[]:this.ficheVie.interventions ;
          } )
        }
      )


    }else {
      this.listeInterventions.push(this.intervention);
      this.visibale=false;
      this.intervention={};
    }
    this.ficheVieService.updateFicheVie(this.ficheVie).subscribe(value => {console.log('fiche is update')})
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteIntervention(intervention: Intervention) {

    if (this.isUpdateFichVie==true){
      this.interventionService.deleteIntervention(intervention.id).subscribe(value => { this.ficheVieService.getFicheById(this.ficheVieId).subscribe(value =>{this.ficheVie=value;
        this.listeInterventions=this.ficheVie.interventions==undefined?[]:this.ficheVie.interventions ;
      } )

      })
      this.listeInterventions = this.listeInterventions.filter(item => item !== intervention)
    }else {
      this.listeInterventions = this.listeInterventions.filter(item => item !== intervention);
    }
  }

  editIntrvention(intervention: Intervention) {
    this.intervention = { ...intervention };
    this.visibale=true

  }
}
