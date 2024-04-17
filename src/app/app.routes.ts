import { Routes } from '@angular/router';
import {DashboardComponent} from "./Components/dashboard/dashboard.component";
import {UserComponent} from "./Components/user/user.component";
import {BassinComponent} from "./Components/bassin/bassin.component";

export const routes: Routes = [{path:'dash', component:DashboardComponent },{path:'users', component:UserComponent },{path:'bassins', component:BassinComponent }];
