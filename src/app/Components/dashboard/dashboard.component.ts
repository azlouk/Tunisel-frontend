import {Component,  OnInit} from '@angular/core';
import {CurrencyPipe, JsonPipe, NgStyle} from "@angular/common";
import {TableModule} from "primeng/table";
import {MenuModule} from "primeng/menu";
import {ChartModule} from "primeng/chart";
import {DashboardService} from "../../Services/dashboard.service";
import {Dashboard} from "../../Models/Dashboard";
import {OrganizationChartModule} from "primeng/organizationchart";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {RegisterRequest} from "../../Models/register-request";
import {UserService} from "../../Services/user.service";


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
export class DashboardComponent implements OnInit {
  chartDataAnalyse: any;
  basin:any[]=[];
  totalChimiques:any[]=[];
  chartOptions: any;
  public dashboardData: Dashboard = new Dashboard(0, 0,0,0);
  public userConnect:RegisterRequest=new RegisterRequest();
  constructor( private dashboardService: DashboardService,
               private userService:UserService) {}

  ngOnInit() {
    this.getUserConnected();
    this.getCountTotalAnalysesChimiques();
    this.getCountAnalyseChemiqueBassin();
     this.fetchDashboardData()

  }

  getCountTotalAnalysesChimiques(){
    this.dashboardService.getCountTotalAnalysesChimiques().subscribe((value:any[]) => {
      this.totalChimiques = value;
      console.log("tt chimiques: "+new JsonPipe().transform(value))

      this.initChart();
    } );
  }
  getCountAnalyseChemiqueBassin(){
    this.dashboardService.getCountAnalyseChemiqueBassin().subscribe((value:any[])=> {
      this.basin = value;
      console.log("tt chimiques bassin: "+new JsonPipe().transform(value))
      this.initChart();
    } );
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
          label: 'Total Chimical Analyse',
          data: this.totalChimiques.map((a:any)=>a[1]),
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: .4
        },
        {
          label: 'Total Chimical Analyse Pond',
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

 public getUserConnected(){
    this.userService.getUserConnect().subscribe(value => this.userConnect=value)
}



}
