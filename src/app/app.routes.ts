import { Routes } from '@angular/router';
import {DashboardComponent} from "./Components/dashboard/dashboard.component";
import {UserComponent} from "./Components/user/user.component";
import {PuitComponent} from "./Components/puit/puit.component";
import {BassinComponent} from "./Components/bassin/bassin.component";
import {SblComponent} from "./Components/sbl/sbl.component";
import {SbnlComponent} from "./Components/sbnl/sbnl.component";
import {SblfComponent} from "./Components/sblf/sblf.component";
import {InventaireComponent} from "./Components/inventaire/inventaire.component";
import {FichevieComponent} from "./Components/fichevie/fichevie.component";
import {AnalyseChimiqueComponent} from "./Components/analyse-chimique/analyse-chimique.component";
import {
  AjouterPrelevmentChimiqueComponent
} from "./Components/ajouter-prelevment-chimique/ajouter-prelevment-chimique.component";
import {
  AjoutFichevieInterventionComponent
} from "./Components/ajout-fichevie-intervention/ajout-fichevie-intervention.component";
import {AnalysePhysiqueComponent} from "./Components/analyse-physique/analyse-physique.component";
import {
  AjouterPrelevmentPhysiqueComponent
} from "./Components/ajouter-prelevment-physique/ajouter-prelevment-physique.component";
import {LoginComponent} from "./Components/login/login.component";

export const routes: Routes = [
  {path:'dash', component:DashboardComponent},
  {path:'users', component:UserComponent },
  {path:'puits', component:PuitComponent},
  {path:'bassins', component:BassinComponent},
  {path:'sbls', component:SblComponent},
  {path:'sbnls', component:SbnlComponent},
  {path:'sblfs', component:SblfComponent},
  {path:'', component:LoginComponent},
  {path:'sblfs', component:SblfComponent},
  {path:'inventaire', component:InventaireComponent},
  {path:'etalonage', component:FichevieComponent},
  {path:'ajouterFichevieIntervention', component:AjoutFichevieInterventionComponent},
  {path:'ajouterFichevieIntervention/:id', component:AjoutFichevieInterventionComponent},

  {path:'analyseChimique', component:AnalyseChimiqueComponent},
  {path:'ajouterPrelevmentChimique', component:AjouterPrelevmentChimiqueComponent},
  {path:'updatePrelevmentChimique/:id', component:AjouterPrelevmentChimiqueComponent},

  {path:'analysePhysique', component:AnalysePhysiqueComponent},
  {path:'ajouterPrelevmentPhysique', component:AjouterPrelevmentPhysiqueComponent},
  {path:'updatePrelevmentPhysique/:id', component:AjouterPrelevmentPhysiqueComponent},
];
