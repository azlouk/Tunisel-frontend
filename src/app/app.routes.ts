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
import {AjouterPrelevmentChimiqueComponent} from "./Components/ajouter-prelevment-chimique/ajouter-prelevment-chimique.component";
import {AnalysePhysiqueComponent} from "./Components/analyse-physique/analyse-physique.component";
import {AjouterPrelevmentPhysiqueComponent} from "./Components/ajouter-prelevment-physique/ajouter-prelevment-physique.component";
import {LoginComponent} from "./Components/login/login.component";
import {AuthGuard} from "./guard/AuthGuard";
import {AjouterInventaireComponent} from "./Components/ajouter-inventaire/ajouter-inventaire.component";
import {ArticleComponent} from "./Components/article/article.component";
import {CribleLiwellComponent} from "./Components/cribleLiwell/cribleLiwell.component";
import {ProduitComponent} from "./Components/produit/produit.component";
import {RapportAnalyseComponent} from "./Components/rapportAnalyse/rapportAnalyse.component";
import {CommandeComponent} from "./Components/commande/commande.component";
import {AjouterCommandeComponent} from "./Components/ajouter-commande/ajouter-commande.component";
import {AjoutFichevieInterventionComponent} from "./Components/ajout-fichevie-intervention/ajout-fichevie-intervention.component";
import {StockOrderComponent} from "./Components/stock-order/stock-order.component";
import {PompeComponent} from "./Components/pompe/pompe.component";
import {JournalierComponent} from "./Components/journalier/journalier.component";
import {
  AjouterLigneJournalierComponent
} from "./Components/ajouter-ligne-journalier/ajouter-ligne-journalier.component";
import {DailyUpdateComponent} from "./Components/daily-update/daily-update.component";
import {CribleComponent} from "./Components/crible/crible.component";
import {ConcasseurComponent} from "./Components/concasseur/concasseur.component";
import {LaverieComponent} from "./Components/laverie/laverie.component";
import {BandComponent} from "./Components/band/band.component";

export const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'dash', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'users', component:UserComponent, canActivate:[AuthGuard] },
  {path:'puits', component:PuitComponent, canActivate:[AuthGuard]},
  {path:'bassins', component:BassinComponent, canActivate:[AuthGuard]},
  {path:'sbls', component:SblComponent, canActivate:[AuthGuard]},
  {path:'sbnls', component:SbnlComponent, canActivate:[AuthGuard]},
  {path:'cribleLiwells', component:CribleLiwellComponent, canActivate:[AuthGuard]},
  {path:'sblfs', component:SblfComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'sblfs', component:SblfComponent, canActivate:[AuthGuard]},
  {path:'inventaire', component:InventaireComponent, canActivate:[AuthGuard]},
  {path:'etalonage', component:FichevieComponent, canActivate:[AuthGuard]},
  {path:'ajouterFichevieIntervention', component:AjoutFichevieInterventionComponent, canActivate:[AuthGuard]},
  {path:'ajouterFichevieIntervention/:id', component:AjoutFichevieInterventionComponent, canActivate:[AuthGuard]},

  {path:'analyseChimique', component:AnalyseChimiqueComponent, canActivate:[AuthGuard]},
  {path:'ajouterPrelevmentChimique', component:AjouterPrelevmentChimiqueComponent, canActivate:[AuthGuard]},
  {path:'updatePrelevmentChimique/:id', component:AjouterPrelevmentChimiqueComponent, canActivate:[AuthGuard]},

  {path:'analysePhysique', component:AnalysePhysiqueComponent, canActivate:[AuthGuard]},
  {path:'ajouterPrelevmentPhysique', component:AjouterPrelevmentPhysiqueComponent, canActivate:[AuthGuard]},
  {path:'updatePrelevmentPhysique/:id', component:AjouterPrelevmentPhysiqueComponent, canActivate:[AuthGuard]},
  {path:'articles', component:ArticleComponent, canActivate:[AuthGuard]},
  {path:'ajouterInventaire', component:AjouterInventaireComponent,  canActivate:[AuthGuard]},
  {path:'produit', component:ProduitComponent , canActivate:[AuthGuard]},
  {path:'editInventaire/:id', component:AjouterInventaireComponent,  canActivate:[AuthGuard]},
  {path:'rapport', component:RapportAnalyseComponent,  canActivate:[AuthGuard]},
  {path:'commande', component:CommandeComponent,  canActivate:[AuthGuard]},
  {path:'ajouterCommande', component:AjouterCommandeComponent,  canActivate:[AuthGuard]},
  {path:'updateCommande/:id', component:AjouterCommandeComponent,  canActivate:[AuthGuard]},
  {path:'stockOrder', component:StockOrderComponent,  canActivate:[AuthGuard]},
  {path:'pompe', component:PompeComponent,  canActivate:[AuthGuard]},
  {path:'daily', component:JournalierComponent,  canActivate:[AuthGuard]},
  {path:'Daily/:id', component:AjouterLigneJournalierComponent,  canActivate:[AuthGuard]},
  {path:'DailyUpdate', component:DailyUpdateComponent,  canActivate:[AuthGuard]},
  {path:'cribles', component:CribleComponent,  canActivate:[AuthGuard]},
  {path:'laveries', component:LaverieComponent,  canActivate:[AuthGuard]},
  {path:'concasseurs', component:ConcasseurComponent,  canActivate:[AuthGuard]},
  {path:'bands', component:BandComponent,  canActivate:[AuthGuard]},
];
