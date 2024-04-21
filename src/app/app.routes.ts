import { Routes } from '@angular/router';
import {DashboardComponent} from "./Components/dashboard/dashboard.component";
import {UserComponent} from "./Components/user/user.component";
import {PuitComponent} from "./Components/puit/puit.component";
import {BassinComponent} from "./Components/bassin/bassin.component";
import {SblComponent} from "./Components/sbl/sbl.component";
import {SbnlComponent} from "./Components/sbnl/sbnl.component";
import {SblfComponent} from "./Components/sblf/sblf.component";
import {AnalyseChimiqueComponent} from "./Components/analyse-chimique/analyse-chimique.component";
import {
  AjouterPrelevmentChimiqueComponent
} from "./Components/ajouter-prelevment-chimique/ajouter-prelevment-chimique.component";

export const routes: Routes = [
  {path:'dash', component:DashboardComponent},
  {path:'users', component:UserComponent },
  {path:'puits', component:PuitComponent},
  {path:'bassins', component:BassinComponent},
  {path:'sbls', component:SblComponent},
  {path:'sbnls', component:SbnlComponent},
  {path:'sblfs', component:SblfComponent},
  {path:'analyseChimique', component:AnalyseChimiqueComponent},
  {path:'ajouterPrelevmentChimique', component:AjouterPrelevmentChimiqueComponent}

];
