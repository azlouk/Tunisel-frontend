import { Routes } from '@angular/router';
import {DashboardComponent} from "./Components/dashboard/dashboard.component";
import {UserComponent} from "./Components/user/user.component";
import {PuitComponent} from "./Components/puit/puit.component";
import {BassinComponent} from "./Components/bassin/bassin.component";
import {SblComponent} from "./Components/sbl/sbl.component";
import {SbnlComponent} from "./Components/sbnl/sbnl.component";
import {SblfComponent} from "./Components/sblf/sblf.component";
import {FichevieComponent} from "./Components/fichevie/fichevie.component";
import {InventaireComponent} from "./Components/inventaire/inventaire.component";
import {AnalyseChimiqueComponent} from "./Components/analyse-chimique/analyse-chimique.component";
import {
  AjouterPrelevmentChimiqueComponent
} from "./Components/ajouter-prelevment-chimique/ajouter-prelevment-chimique.component";
import {
  AjoutFichevieInterventionComponent
} from "./Components/ajout-fichevie-intervention/ajout-fichevie-intervention.component";
import {ArticleComponent} from "./Components/article/article.component";
import {ProduitDefectueuxComponent} from "./Components/produit-defectueux/produit-defectueux.component";
import {AjouterInventaireComponent} from "./Components/ajouter-inventaire/ajouter-inventaire.component";

export const routes: Routes = [
  {path:'dash', component:DashboardComponent},
  {path:'users', component:UserComponent },
  {path:'puits', component:PuitComponent},
  {path:'bassins', component:BassinComponent},
  {path:'sbls', component:SblComponent},
  {path:'sbnls', component:SbnlComponent},
  {path:'sblfs', component:SblfComponent},
  {path:'inventaire', component:InventaireComponent},
  {path:'etalonage', component:FichevieComponent},
  {path:'ajouterFichevieIntervention', component:AjoutFichevieInterventionComponent},
  {path:'ajouterFichevieIntervention/:id', component:AjoutFichevieInterventionComponent},
  {path:'articles', component:ArticleComponent},
  {path:'produitdefectueux', component:ProduitDefectueuxComponent},
  {path:'ajouterInventaire', component:AjouterInventaireComponent},



  {path:'analyseChimique', component:AnalyseChimiqueComponent},
  {path:'ajouterPrelevmentChimique', component:AjouterPrelevmentChimiqueComponent},
  {path:'updatePrelevmentChimique/:id', component:AjouterPrelevmentChimiqueComponent}

];
