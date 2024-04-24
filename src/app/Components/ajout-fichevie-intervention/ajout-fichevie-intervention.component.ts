import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {DatePipe, JsonPipe, NgForOf} from "@angular/common";
import {SharedModule} from "primeng/api";
import {TabViewModule} from "primeng/tabview";
import {ToolbarModule} from "primeng/toolbar";
import {TooltipModule} from "primeng/tooltip";
import {Puit} from "../../Models/puit";
import {Bassin} from "../../Models/bassin";
import {Sbnl} from "../../Models/sbnl";
import {Sbl} from "../../Models/sbl";
import {Sblf} from "../../Models/sblf";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {ActivatedRoute, Router} from "@angular/router";

import {FormsModule} from "@angular/forms";
import {RadioButtonModule} from "primeng/radiobutton";
import {DialogModule} from "primeng/dialog";
import {InterventionService} from "../../Services/intervention.service";
import {Intervention} from "../../Models/inventaire";
import {FicheVieService} from "../../Services/fichevie.service";
import {FicheVie} from "../../Models/fichevie";
import {Table, TableModule} from "primeng/table";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-ajout-fichevie-intervention',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    FloatLabelModule,
    InputNumberModule,
    InputTextModule,
    ListboxModule,
    NgForOf,
    SharedModule,
    TabViewModule,
    ToolbarModule,
    TooltipModule,
    FormsModule,
    RadioButtonModule,
    DialogModule,
    TableModule,
    DatePipe
  ],
  templateUrl: './ajout-fichevie-intervention.component.html',
  styleUrl: './ajout-fichevie-intervention.component.css'
})
export class AjoutFichevieInterventionComponent implements  OnInit{
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
listeInterventions:Intervention[]=[];
  ficheVie:FicheVie={};

  // =================
  selectedIntervention: Intervention[] = [];
private ficheVieId:any;
private  isUpdateFichVie:boolean=false;
  constructor(private router: Router,private  interventionService:InterventionService,private ficheVieService:FicheVieService,private route:ActivatedRoute)
  {}



  ngOnInit(): void {
this.ficheVieId=this.route.snapshot.paramMap.get('id');
this.isUpdateFichVie=this.ficheVieId!==null;
this.ficheVieService.getFicheById(this.ficheVieId).subscribe(value =>{this.ficheVie=value;
  console.log('hhhhhhhhhhhh====>>>>    '+new JsonPipe().transform(this.ficheVie))} )


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
    this.listeInterventions.push(this.intervention);
    this.visibale=false;
    this.intervention={};
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteIntervention(intervention: Intervention) {
    this.listeInterventions = this.listeInterventions.filter(item => item !== intervention);

  }
}
