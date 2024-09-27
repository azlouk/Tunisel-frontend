import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

export function  getKeyToken(){
  if(localStorage.getItem("token"))
return localStorage.getItem("token")
 return ""


}
export function  getToken(){
  if(localStorage.getItem("role"))
    return localStorage.getItem("role")
  return ""
}
export async function getTokenn(): Promise<string> {
  return new Promise((resolve) => {
    const role = localStorage.getItem("role");
    resolve(role ? role : "");
  });
}
export function getModelDefault(){
  let list:any[]=[
    {

      label: 'Main',
      items: [
        {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dash']},
        {label: 'Daily Monitoring', icon: 'pi pi-clipboard', routerLink: ['/daily']},
        {label: 'Daily Update', icon: 'pi pi-clipboard', routerLink: ['/DailyUpdate']}

      ]
    },
    {


      label: 'Orders',
      items: [
        {label: 'Orders/Volumes', icon: 'pi  pi-chart-line', routerLink: ['/commande']},
      ]
    },
    {
      label: 'Interfaces',
      items: [
        {label: 'Users', icon: 'pi pi-fw pi-user', routerLink: ['/users']},
        {label: 'Well', icon: 'pi pi-fw pi-filter', routerLink: ['/puits']},
        {label: 'Pump', icon: 'pi pi-fw pi-filter', routerLink: ['/pompe']},
        {label: 'Pond', icon: 'pi pi-fw pi-check-square', routerLink: ['/bassins']},

      ]

    },
    {
      label: 'Stock Order',
      items: [
        {label: 'Stock Order', icon: 'pi pi-fw pi-user', routerLink: ['/stockOrder']},


      ]

    },
    {
      label: 'Stock Basin',
      items: [
        {label: 'Unwashed', icon: 'pi pi-fw pi-box', routerLink: ['sbnls']},
        {label: 'Crible Liwells', icon: 'pi pi-fw pi-box', routerLink: ['cribleLiwells']},
        {label: 'Crible', icon: 'pi pi-fw pi-box', routerLink: ['cribles']},
        {label: 'Concasseur', icon: 'pi pi-fw pi-box', routerLink: ['concasseurs']},
        {label: 'Washed', icon: 'pi pi-fw pi-box', routerLink: ['/sbls']},
        {label: 'Washed Ship', icon: 'pi pi-fw pi-box', routerLink: ['/sblfs']},

      ]

    },
    {
      label: 'Analysis ',
      items: [
        {label: 'Analysis Report', icon: 'pi pi-fw pi-check-circle', routerLink: ['/rapport']},
        {label: 'Chemical Analysis', icon: 'pi pi-fw pi-check-circle', routerLink: ['/analyseChimique']},
        {label: 'Granulometric Analysis', icon: 'pi pi-fw pi-check-circle', routerLink: ['/analysePhysique']},
      ]
    },
    {
      label: 'Instrument management',
      items: [
        {label: 'Calibration', icon: 'pi pi-fw pi-clipboard', routerLink: ['/etalonage']},


      ]
    },

    {
      label: 'Laboratory management',
      items: [
        {label: 'Items', icon: 'pi pi-fw pi-clipboard', routerLink: ['/articles']},
        {label: 'Products', icon: 'pi pi-fw pi-clipboard', routerLink: ['/produit']},
        {label: 'Inventory', icon: 'pi pi-fw pi-clipboard', routerLink: ['/inventaire']},


      ]
    },

  ];
  return list;
}
export function getModelFiltree(){
  let list:any[]=[
    {

      label: 'Orders',
      items: [
        {label: 'Orders/Volumes', icon: 'pi pi-fw pi-home', routerLink: ['/commande']},
      ]
    },

  ];
  return list;
}
export function roundToDecimalPlaces(num: number, decimalPlaces: number): number {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
}
