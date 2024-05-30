import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem, TreeNode} from "primeng/api";
import {debounceTime, Subscription} from "rxjs";
 import {LayoutService} from "../../Services/app.layout.service";
import {Product} from "../../Models/product";
import {CurrencyPipe, NgStyle} from "@angular/common";
import {TableModule} from "primeng/table";
import {MenuModule} from "primeng/menu";
import {ChartModule} from "primeng/chart";
import {DashboardService} from "../../Services/dashboard.service";
import {Dashboard} from "../../Models/Dashboard";
import {OrganizationChartModule} from "primeng/organizationchart";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {LoginService} from "../../Services/login.service";
import {getToken} from "../../../main";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CurrencyPipe,
    TableModule,
    NgStyle,
    MenuModule,
    ChartModule,
    OrganizationChartModule,
    DropdownModule,
    FormsModule,

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  items!: MenuItem[];

  products!: Product[];

  chartDataAnalyse: any;


  basin:any[]=[];
  chartOptions: any;

  subscription!: Subscription;
  // puit :Puit[];
  public nbrPuits = 0;
  public dashboardData: Dashboard = new Dashboard(0, 0,0,0);

  constructor(public loginservice: LoginService,  public layoutService: LayoutService, private dashboardService: DashboardService) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
        this.initChart();
      });
  }

  ngOnInit() {

    this.dashboardService.getCountAnalyseChemique().subscribe((value:any[]) => {
      this.data = value;
      this.initChart();
    } );
    this.dashboardService.getCountAnalyseChemiqueBassin().subscribe((value:any[])=> {
      this.basin = value;
      this.initChart();
    } );

     this.fetchDashboardData()

    this.items = [
      {label: 'Add New', icon: 'pi pi-fw pi-plus'},
      {label: 'Remove', icon: 'pi pi-fw pi-minus'}
    ];
  }

  fetchDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe(
      (data: Dashboard) => {
        this.dashboardData = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données du tableau de bord :', error);
      }
    );
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartDataAnalyse = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
      datasets: [
        {
          label: 'Chimical Analyse',
          data: this.data.map((a:any)=>a[1]),
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: .4
        },
        {
          label: 'Granulometric Analyse',
          data: this.basin.map(b=>b[1]),
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
          borderColor: documentStyle.getPropertyValue('--green-600'),
          tension: .4
        }
      ]
    };
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

}


  selectedNodes!: TreeNode[];

  data: TreeNode[] = [
    {
      expanded: true,
      type: 'person',
      data: {
        icon: 'pi-filter',
        name: 'Puit',
        title: ''
      },
      children: [
        {
          expanded: true,
          type: 'person',
          data: {
            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
            name: 'Bassin1',
            title: '',
            icon: 'pi-receipt'
          },
          children: [
            {
              label: 'SBNL',
              icon: 'pi-wave-pulse',
              children: [
                {
                  label: 'SBL',
                  children: [
                    {
                      label: 'SBLF',
                    }]
                }]
            }

          ]


        },
        {
          expanded: true,
          type: 'person',
          data: {
            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
            name: 'Bassin2',
            title: '',
            icon: 'pi-receipt'
          },
          children: [
            {
              label: 'SBNL',
              icon: 'pi-wave-pulse'
              ,
              children: [
                {
                  label: 'SBL',
                  children: [
                    {
                      label: 'SBLF',
                    }]
                },

              ]
            },

          ]
        }
      ]
    }
  ];


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
