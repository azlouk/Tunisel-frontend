
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

        label: 'Main',
        items: [
          {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dash']},
          {label: 'Order', icon: 'pi pi-fw pi-home', routerLink: ['/commande']}
        ]
      },
      {
        label: 'Interfaces',
        items: [
          {label: 'Users', icon: 'pi pi-fw pi-user', routerLink: ['/users']},
          {label: 'Well', icon: 'pi pi-fw pi-filter', routerLink: ['/puits']},
          {label: 'Pond', icon: 'pi pi-fw pi-check-square', routerLink: ['/bassins']},

        ]

      },
      {
        label: 'Stock Basin',
        items: [
          {label: 'Unwashed', icon: 'pi pi-fw pi-box', routerLink: ['sbnls']},
          {label: 'Band', icon: 'pi pi-fw pi-box', routerLink: ['bandes']},
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

    ]

  }
}
