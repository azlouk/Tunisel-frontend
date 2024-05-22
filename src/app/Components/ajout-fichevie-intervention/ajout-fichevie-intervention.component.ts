import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {DatePipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
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
import {Intervention} from "../../Models/intervention";
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
    DatePipe,
    NgIf,
    NgClass
  ],
  templateUrl: './ajout-fichevie-intervention.component.html',
  styleUrl: './ajout-fichevie-intervention.component.css'
})
export class AjoutFichevieInterventionComponent implements OnInit {
  puits: Puit[] = [];
  bassins: Bassin[] = [];
  sbnls: Sbnl[] = [];
  sbls: Sbl[] = [];
  sblfs: Sblf[] = [];
  checked: boolean = false;
  cols: any[] = [];
  // ====================
  visibale: boolean = false;
  intervention: Intervention = {};
  listeInterventions: Intervention[] = [];

  ficheVie: FicheVie = {};

  selectedIntervention: Intervention[] = [];
  ficheVieId: any | null;
  public isUpdateFichVie: boolean = false;
  submitted: boolean=false;

  constructor(private router: Router, private interventionService: InterventionService, private ficheVieService: FicheVieService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {

    this.ficheVieId = this.route.snapshot.paramMap.get('id');
    this.isUpdateFichVie = this.ficheVieId !== null;
    if (this.ficheVieId !== null) {
      this.ficheVieService.getFicheById(this.ficheVieId).subscribe(value => {
        this.ficheVie = value;
        this.listeInterventions = this.ficheVie.interventions === undefined ? [] : this.ficheVie.interventions;
      });
    } else {
    }


  }


  retour() {
    this.router.navigate(['/etalonage']);
  }


  showDialog() {
    this.visibale = true;

  }

  hideDialog() {
    this.visibale=false
  }


  saveFicheVie() {
    this.submitted=true;
    if(this.ficheVie.societe?.trim())
    {
      this.ficheVie.interventions = this.listeInterventions;
      this.listeInterventions = [];

      if (this.isUpdateFichVie) {

        this.ficheVieService.updateFicheVie(this.ficheVie).subscribe(value => this.router.navigate(['/etalonage']))
      } else {

        this.ficheVieService.createFicheVie(this.ficheVie).subscribe(value => {
          this.router.navigate(['/etalonage']);
        }, error => {
          console.log('eroooooooorrrrr')
        });
      }

    }

  }

  saveIntervention() {
    this.submitted = true;

      this.listeInterventions.push(this.intervention);
      this.visibale = false;
      this.intervention = {}

  }



  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteIntervention(intervention: Intervention) {

    if (this.isUpdateFichVie == true) {
      this.interventionService.deleteIntervention(intervention.id).subscribe(value => {
        this.ficheVieService.getFicheById(this.ficheVieId).subscribe(value => {
          this.ficheVie = value;
          this.listeInterventions = this.ficheVie.interventions == undefined ? [] : this.ficheVie.interventions;
        })

      })
      this.listeInterventions = this.listeInterventions.filter(item => item !== intervention)
    } else {
      this.listeInterventions = this.listeInterventions.filter(item => item !== intervention);
    }
  }

  editIntrvention(intervention: Intervention) {
    this.intervention = {...intervention};
    this.visibale = true

  }
}
