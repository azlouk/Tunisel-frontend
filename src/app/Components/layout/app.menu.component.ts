
import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = [
      {

        label: 'Principal',
        items: [
          {label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/dash']}
        ]
      },
      {
        label: 'Interfaces',
        items: [
          {label: 'Puits', icon: 'pi pi-fw pi-filter', routerLink: ['/puits']},
          {label: 'Utilisateurs', icon: 'pi pi-fw pi-user', routerLink: ['/users']},
          {label: 'Bassins', icon: 'pi pi-fw pi-check-square', routerLink: ['/bassins']},

        ]

      },
      {
        label: 'Stock',
        items: [
          {label: 'Stock Non Lavé', icon: 'pi pi-fw pi-box', routerLink: ['sbnls']},
          {label: 'Stock Lavé', icon: 'pi pi-fw pi-box', routerLink: ['/sbls']},
          {label: 'Stock Lavé Finale', icon: 'pi pi-fw pi-box', routerLink: ['/sblfs']},

        ]

      },
      {
        label: 'Analyses ',
        items: [
          {label: 'Prélèvement Chimique', icon: 'pi pi-fw pi-check-circle', routerLink: ['/analyseChimique']},
          {label: 'Prélèvement Physique', icon: 'pi pi-fw pi-check-circle', routerLink: ['/analysePhysique']},
        ]
      },
      {
        label: 'Gestion Des Instruments',
        items: [
          {label: 'Etalonage', icon: 'pi pi-fw pi-clipboard', routerLink: ['/etalonage']},


    ]
      },

      {
        label: 'Gestion De Laboratoire',
        items: [
          {label: 'Article', icon: 'pi pi-fw pi-clipboard', routerLink: ['/articles']},
          {label: 'Produits', icon: 'pi pi-fw pi-clipboard', routerLink: ['/produit']},
          {label: 'Produits Defectueux', icon: 'pi pi-fw pi-clipboard', routerLink: ['/produitDefectueux']},

          {label: 'Inventaire', icon: 'pi pi-fw pi-clipboard', routerLink: ['/inventaire']},


        ]
      },

    ]

  }
}
