import { Routes } from '@angular/router';
import {DashboardComponent} from "./Components/dashboard/dashboard.component";
import {UserComponent} from "./Components/user/user.component";

export const routes: Routes = [{path:'dash', component:DashboardComponent },{path:'stock', component:UserComponent }];
