import {Component,  OnInit} from '@angular/core';
import {CurrencyPipe, JsonPipe, NgIf, NgStyle} from "@angular/common";
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
import {getToken} from "../../../main";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToolbarModule} from "primeng/toolbar";
import {Bassin} from "../../Models/bassin";
import {BassinService} from "../../Services/bassin.service";
import {Sbnl} from "../../Models/sbnl";
import {PuitService} from "../../Services/puit.service";
import {SbnlService} from "../../Services/sbnl.service";
import {CalendarModule} from "primeng/calendar";
import {FloatLabelModule} from "primeng/floatlabel";
import {SblService} from "../../Services/sbl.service";
import {Sbl} from "../../Models/sbl";
import {Puit} from "../../Models/puit";
import {SblfService} from "../../Services/sblf.service";
import {Sblf} from "../../Models/sblf";
import {StockOrder} from "../../Models/stock-order";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;
import {StockOrderService} from "../../Services/stock-order.service";
import {TabViewModule} from "primeng/tabview";
import {MultiSelectModule} from "primeng/multiselect";
import {SumForAttributeRequest} from "../../Models/sum-for-attribute-request";
import moment from 'moment-timezone';
import {InputTextModule} from "primeng/inputtext";
import {Band} from "../../Models/band";
import {BandService} from "../../Services/band.service";


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
    ButtonModule,
    NgIf,
    RippleModule,
    ToolbarModule,
    CalendarModule,
    FloatLabelModule,
    TabViewModule,
    MultiSelectModule,
    InputTextModule,

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  chartDataAnalyse: any;
  totalChimique:any[]=[];
  totalPhysique:any[]=[];
  chartOptions: any;
  barOptions: any;
  barData: any;
  pieOptions: any;
  pieData: any;
  barOptionsProduction: any;
  barDataProduction: any;
  barDataTransfer: any;
  barOptionsTransfer: any;
  dataEtatBassin: any;
  optionsEtatBassin: any;
  chartDataForAttribute: any;
  chartDataForAttributeDensite: any[]=[];
  chartDataForAttributeLabels: any[]=[];
  chartDataForAttributePh: any[]=[];
  chartDataForAttributeMatiereEnSuspension: any[]=[];
  chartDataForAttributeSalinite: any[]=[];
  chartDataForAttributeCalcium: any[]=[];
  chartDataForAttributeMagnesium: any[]=[];
  chartDataForAttributeSulfate: any[]=[];
  chartDataForAttributeHumidite: any[]=[];
  chartDataForAttributeMatiereInsoluble: any[]=[];
  chartDataForAttributePotassium: any[]=[];
  chartDataForAttributeSodium: any[]=[];
  chartDataForAttributeChlorure: any[]=[];
  chartDataForAttributeChlorureDeSodium: any[]=[];
  chartDataForAttributeFerrocyanure: any[]=[];
  chartOptionsForAttribute: any;

  totalRecolteValue:any[]=[];
  totalSortie1:any[]=[];
  totalSortie2:any[]=[];
  totalBigSalt:any[]=[];
  totalResultConcasseur:any[]=[];
  totalQuantityTransfer:any[]=[];
  totalSumEtatBassinInodee:any[]=[];
  totalSumEtatBassinAlimentation :any[]=[];
  totalSumEtatBassinSec:any[]=[];
  totalSumEtatBassinVidange:any[]=[];
  totalSumEtatBassinRecolte:any[]=[];
  totalSumEtatBassinMaintenance:any[]=[];

  public dashboardData: Dashboard = new Dashboard(0, 0,0,0);
  public userConnect:RegisterRequest=new RegisterRequest();
  public bassins: Bassin[]=[];
  public selectedBassin: Bassin={};
  public selectedBassinForAttribute: Bassin={};
  public selectedSbnl: Sbnl={};
  public selectedBand: Band=new Band();
  public bands: Band[]=[];
  public selectedSbnlForAttribute: Sbnl={};
  public sbnls: Sbnl[]=[];
  public sbls: Sbl[]=[];
  public selectedSbl: Sbl={};
  public selectedSblForAttribute: Sbl={};
  public puits: Puit[]=[];
  public selectedPuit: Puit={};
  public selectedPuitForAttribute: Puit={};
  public sblfs: Sblf[]=[];
  public selectedSblf: Sblf={};
  public selectedSblfForAttribute: Sblf={};
  public selectedBassinRecolte: Bassin={};
  public selectedStockOrder:StockOrder=new StockOrder();
  public stockOrders:StockOrder[]=[];
  selectedEtatBassin:Bassin={};
  TransferAttributs:any[]=[];
  TransferAttributsStart:any[]=[];
  TransferAttributsEnd:any[]=[];

  startingPoint: any;
  arrivingPoint: any;
  attributes: any[]=[];
  selectedAttributes: any[]=[];
  constructor( private dashboardService: DashboardService,
               private userService:UserService,
               private bassinService:BassinService,
               private sbnlService:SbnlService,
               private sblService:SblService,
               private puitService:PuitService,
               private sblfService:SblfService,
               private stockOrderService:StockOrderService,
               private bandService:BandService) {}

  ngOnInit(){
this.attributes=
  [
    {name:'d',label:'densite' },
    {name:'MS',label:'matiereEnSuspension'},
    {name:'S',label:'salinite'},
    {name:'Ca',label:'calcium'},
    {name:'Mg',label:'magnesium'},
    {name:'SO₄',label:'sulfate'},
    {name:'H₂O',label:'humidite'},
    {name:'MI',label:'matiereInsoluble'},
    {name:'K',label:'potassium'},
    {name:'Na',label:'sodium'},
    {name:'Cl',label:'chlorure'},
    {name:'pH',label:'ph'},
    {name:'NaCl',label:'chlorureDeSodium'},
    {name:'Fe(CN)₆',label:'ferrocyanure'}

  ];
  this.TransferAttributs= [
    {id:0,label:'Saline volume'},
    {id:1,label:'Terrain volume'},
    {id:2,label:'Port volume'},
    {id:3,label:'Quai volume'},

  ] ;
    this.TransferAttributsStart=   [...this.TransferAttributs];
    this.TransferAttributsEnd=   [...this.TransferAttributs];

    this.getUserConnected();
    // this.getCountTotalAnalysesChimiques();
    // this.getCountAnalyseChemiqueBassin();
    this.fetchDashboardData()
    this. getAllBassin();
    this.getAllSbnl();
    this.getAllBand();
    this.getAllSbl();
    this.getAllSblf();
    this.getAllPuit();
    this.getAllStockOder();
    this.initChartBarForProduction();
    this.initChart();
    this.initChartBar();
    this.initChartPieChart(0,0,0,0);
    this.initChartBarForTransfer()
    this.initChartStackedBarForEtatBassin();
    this.initChartForAttributeBassin();
  }

  // getCountTotalAnalysesChimiques(){
  //   this.dashboardService.getCountTotalAnalysesChimiques().subscribe((value:any[]) => {
  //     this.totalChimiques = value;
  //
  //     this.initChart();
  //   } );
  // }

  countPhysicalAnalysesByBassinIdAndByMonth(bassinID:number,year :number){
    this.dashboardService.countPhysicalAnalysesByBassinIdAndByMonth(bassinID,year).subscribe((value:any[]) => {
      this.totalPhysique = value;

      this.initChart();
    } );
  }
  getCountAnalyseChemiqueBassin(bassinId:number,year:number){
    this.dashboardService.countAnalysesChimiqueByBassinIdAndByMonth(bassinId,year).subscribe((value:any[])=> {
      this.totalChimique = value;
      this.initChart();
    } );
  }

  // ===============SBNL===============================
  countAnalysesChimiquesBySbnlIdAndByMonth(sbnlID:number,year:number){
    this.dashboardService.countAnalysesChimiquesBySbnlIdAndByMonth(sbnlID,year).subscribe((value:any[]) => {
      this.totalChimique = value;

      this.initChart();
    } );
  }
  countPhysicalAnalysesBySbnlIdAndByMonth(sbnlID:number,year:number){
    this.dashboardService.countPhysicalAnalysesBySbnlIdAndByMonth(sbnlID,year).subscribe((value:any[])=> {
      this.totalPhysique = value;
      this.initChart();
    } );
  }


  // ===============SBL===============================
  countAnalysesChimiquesBySblIdAndByMonth(sblID:number,year:number){
    this.dashboardService.countAnalysesChimiquesBySblIdAndByMonth(sblID,year).subscribe((value:any[]) => {
      this.totalChimique = value;

      this.initChart();
    } );
  }
  countPhysicalAnalysesBySblIdAndByMonth(sblID:number,year:number){
    this.dashboardService.countPhysicalAnalysesBySblIdAndByMonth(sblID,year).subscribe((value:any[])=> {
      this.totalPhysique = value;
      this.initChart();
    } );
  }

  // ===============PUIT===============================
  countAnalysesChimiquesByPuitIdAndByMonth(puitID:number,year:number){
    this.dashboardService.countAnalysesChimiquesByPuitIdAndByMonth(puitID,year).subscribe((value:any[]) => {
      this.totalChimique = value;

      this.initChart();
    } );
  }
  // ===============SBLF===============================
  countAnalysesChimiquesBySblfIdAndByMonth(sblfID:number,year:number){
    this.dashboardService.countAnalysesChimiquesBySblfIdAndByMonth(sblfID,year).subscribe((value:any[]) => {
      this.totalChimique = value;

      this.initChart();
    } );
  }
  countPhysicalAnalysesBySblfIdAndByMonth(sblfID:number,year:number){
    this.dashboardService.countPhysicalAnalysesBySblfIdAndByMonth(sblfID,year).subscribe((value:any[])=> {
      this.totalPhysique = value;
      this.initChart();
    } );
  }

  // ===============BAND===============================
  countAnalysesChimiquesByBandIdAndByMonth(bandID:number,year:number){
    this.dashboardService.countAnalysesChimiquesByBandIdAndByMonth(bandID,year).subscribe((value:any[]) => {
      this.totalChimique = value;

      this.initChart();
    } );
  }
  countPhysicalAnalysesByBandIdAndByMonth(bandID:number,year:number){
    this.dashboardService.countPhysicalAnalysesByBandIdAndByMonth(bandID,year).subscribe((value:any[])=> {
      this.totalPhysique = value;
      this.initChart();
    } );
  }
  // ========================================================
  sumRecolteValueByBassinIdAndByMonthAndYear(bassinID:number,year:number){
    this.dashboardService.sumRecolteValueByBassinIdAndByMonthAndYear(bassinID,year).subscribe((value:any[])=> {
      this.totalRecolteValue = value;
      this.initChartBar();
    } );
  }

  sumRecolteValueByBassinIdAndByDayAndMonthInYear(bassinID:number,year:number,month:number){
    this.dashboardService.sumRecolteValueByBassinIdAndByDayAndMonthInYear(bassinID,year,month).subscribe((value:any[])=> {
      this.totalRecolteValue = value;
      this.initChartBar();
    } );
  }

  // ============PRODUCTION PER YEAR=========================================================================
  sumSortie1ByMonthAndYear(year:number){
    this.dashboardService.sumSortie1ByMonthAndYear(year).subscribe((value:any[])=> {
      this.totalSortie1 = value;
      this.initChartBarForProduction();    } );
  }

  sumSortieB2ByMonthAndYear(year:number){
    this.dashboardService.sumSortieB2ByMonthAndYear(year).subscribe((value:any[])=> {
      this.totalSortie2 = value;
      this.initChartBarForProduction();    } );
  }

  sumBigSaltByMonthAndYear(year:number){
    this.dashboardService.sumBigSaltByMonthAndYear(year).subscribe((value:any[])=> {
      this.totalBigSalt = value;
      this.initChartBarForProduction();    } );
  }

  sumResultByMonthAndYear(year:number){
    this.dashboardService.sumResultByMonthAndYear(year).subscribe((value:any[])=> {
      this.totalResultConcasseur = value;
      this.initChartBarForProduction();    } );
  }

  // ============PRODUCTION PER Month=========================================================================
  sumSortieB1ByDayAndMonthInYear(year:number,month:number){
    this.dashboardService.sumSortieB1ByDayAndMonthInYear(year,month).subscribe((value:any[])=> {
      this.totalSortie1 = value;
      this.initChartBarForProduction();    } );
  }

  sumSortieB2ByDayAndMonthInYear(year:number,month:number){
    this.dashboardService.sumSortieB2ByDayAndMonthInYear(year,month).subscribe((value:any[])=> {
      this.totalSortie2 = value;
      this.initChartBarForProduction();    } );
  }

  sumBigSaltByDayAndMonthInyear(year:number,month:number){
    this.dashboardService.sumBigSaltByDayAndMonthInyear(year,month).subscribe((value:any[])=> {
      this.totalBigSalt = value;
      this.initChartBarForProduction();    } );
  }

  sumResultByDayAndMonthInYear(year:number,month:number){
    this.dashboardService.sumResultByDayAndMonthInYear(year,month).subscribe((value:any[])=> {
      this.totalResultConcasseur = value;
      this.initChartBarForProduction();    } );
  }

  findMonthlySumTransferQuantityByStartingPointArrivingPointAndYear(startingPoint:string,arrivingPoint:string,year:number){
    this.dashboardService.findMonthlySumTransferQuantityByStartingPointArrivingPointAndYear(startingPoint,arrivingPoint,year).subscribe((value:any[])=> {
      this.totalQuantityTransfer = value;
      this.initChartBarForTransfer();    } );
  }

  findDailySumTransferQuantityByStartingPointArrivingPointAndYearAndMonth(startingPoint:string,arrivingPoint:string,year:number,month:number){
    this.dashboardService.findDailySumTransferQuantityByStartingPointArrivingPointAndYearAndMonth(startingPoint,arrivingPoint,year,month).subscribe((value:any[])=> {
      this.totalQuantityTransfer = value;
      this.initChartBarForTransfer();    } );
  }
  // =======================SUM ETAT BASSIN ==========================================
  sumDaysByEtatBassinAndMonthAndYearInodee(bassinId:number,year:number,etatBassin:string){
    this.dashboardService.sumDaysByEtatBassinAndMonthAndYear(bassinId,year,etatBassin).subscribe((value:any[])=> {
      this.totalSumEtatBassinInodee = value;
      this.initChartStackedBarForEtatBassin();    } );
  }
  sumDaysByEtatBassinAndMonthAndYearAlimentation (bassinId:number,year:number,etatBassin:string){
    this.dashboardService.sumDaysByEtatBassinAndMonthAndYear(bassinId,year,etatBassin).subscribe((value:any[])=> {
      this.totalSumEtatBassinAlimentation = value;
      this.initChartStackedBarForEtatBassin();    } );
  }

  sumDaysByEtatBassinAndMonthAndYearSec (bassinId:number,year:number,etatBassin:string){
    this.dashboardService.sumDaysByEtatBassinAndMonthAndYear(bassinId,year,etatBassin).subscribe((value:any[])=> {
      this.totalSumEtatBassinSec = value;
      this.initChartStackedBarForEtatBassin();    } );
  }

  sumDaysByEtatBassinAndMonthAndYearVidange(bassinId:number,year:number,etatBassin:string){
    this.dashboardService.sumDaysByEtatBassinAndMonthAndYear(bassinId,year,etatBassin).subscribe((value:any[])=> {
      this.totalSumEtatBassinVidange = value;
      this.initChartStackedBarForEtatBassin();    } );
  }

  sumDaysByEtatBassinAndMonthAndYearRecolte(bassinId:number,year:number,etatBassin:string){
    this.dashboardService.sumDaysByEtatBassinAndMonthAndYear(bassinId,year,etatBassin).subscribe((value:any[])=> {
      this.totalSumEtatBassinRecolte = value;
      this.initChartStackedBarForEtatBassin();    } );
  }
  sumDaysByEtatBassinAndMonthAndYearMaintenance(bassinId:number,year:number,etatBassin:string){
    this.dashboardService.sumDaysByEtatBassinAndMonthAndYear(bassinId,year,etatBassin).subscribe((value:any[])=> {
      this.totalSumEtatBassinMaintenance = value;
      this.initChartStackedBarForEtatBassin();    } );
  }
  // =======================SUM ETAT BASSIN ==========================================
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
          label: 'Total Granulometric Analyse',
          data: this.totalPhysique.map((a:any)=>a[1]),
          fill: false,
          backgroundColor: '#5d5d5d',
          borderColor: '#5d5d5d',
          tension: .4
        },
        {
          label: 'Total Chimical Analyse ',
          data: this.totalChimique.map(b=>b[1]),
          fill: false,
          backgroundColor: '#ced621',
          borderColor: '#ced621',
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
  initChartBar() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Conditional labels based on `dateSumRecolte` or `dateSumRecolteByDay` flags
    let labels: string[];

    if (this.dateSumRecolte) {
      // Use month labels
      labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    } else if (this.dateSumRecolteByDay) {
      // Extract month and year, then generate labels based on the days in that month
      const month = this.getMonthFromDateString(this.dateSumRecolteByDay);
      const year = this.extractYearFromDate(this.dateSumRecolteByDay);
      const daysInMonth = this.getDaysInMonth(month, year);

      labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    } else {
      // Default or fallback label, if needed
      labels = [];
    }

    this.barData = {
      labels: labels,
      datasets: [
        {
          label: 'SUM HARVEST',
          backgroundColor: '#00a6b9',
          borderColor: '#00a6b9',
          data: this.totalRecolteValue.map((a: any) => a[1]), // Assuming a[1] contains the values
        }
      ]
    };

    this.barOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor // Use `color` for newer chart.js versions
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
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

  initChartPieChart(sumSaline:number,sumTerrain:number,sumPort:number,sumQuai:number) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.pieData = {
      labels: ['SALINE', 'TERRAIN', 'PORT','QUAI'],
      datasets: [
        {
          data: [sumSaline, sumTerrain, sumPort,sumQuai],
          backgroundColor: [
            '#bcbcbc',
            '#5d5d5d',
            '#00a6b9' ,
           '#ced621'
          ],
          hoverBackgroundColor: [
            '#bcbcbc',
            '#5d5d5d',
            '#00a6b9' ,
            '#ced621'

          ]
        }]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };

  }

  initChartBarForProduction() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Conditional labels based on `dateSumRecolte` or `dateSumRecolteByDay` flags
    let labels: string[];

    if (this.dateSumProduction) {
      // Use month labels
      labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    } else if (this.dateSumProductionByDay) {
      // Extract month and year, then generate labels based on the days in that month
      const month = this.getMonthFromDateString(this.dateSumProductionByDay);
      const year = this.extractYearFromDate(this.dateSumProductionByDay);
      const daysInMonth = this.getDaysInMonth(month, year);

      labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    } else {
      // Default or fallback label, if needed
      labels = [];
    }

    this.barDataProduction = {
      labels: labels,
      datasets: [
        {
          label: 'OUTPUT B1',
          backgroundColor: '#bcbcbc',
          borderColor: '#bcbcbc',
          data: this.totalSortie1.map((a: any) => a[1]),

        },
        {
          label: 'OUTPUT B2',
          backgroundColor: '#5d5d5d',
          borderColor: '#5d5d5d',
          data: this.totalSortie2.map((a: any) => a[1]),

        },
        {
          label: 'BIG SALT',
          backgroundColor: '#00a6b9',
          borderColor:'#00a6b9',
          data: this.totalBigSalt.map((a: any) => a[1]),

        },
        {
          label: 'RESULT CONCASSEUR',
          backgroundColor: '#ced621',
          borderColor: '#ced621',
          data: this.totalResultConcasseur.map((a: any) => a[1]),

        }
      ]
    };

    this.barOptionsProduction = {
      plugins: {
        legend: {
          labels: {
            color: textColor // Use `color` for newer chart.js versions
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
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

  initChartBarForTransfer() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Conditional labels based on `dateSumTransfer` or `dateSumTransferByDay` flags
    let labels: string[];

    if (this.dateSumTransfer) {
      // Use month labels
      labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    } else if (this.dateSumTransferByDay) {
      // Extract month and year, then generate labels based on the days in that month
      const month = this.getMonthFromDateString(this.dateSumTransferByDay);
      const year = this.extractYearFromDate(this.dateSumTransferByDay);
      const daysInMonth = this.getDaysInMonth(month, year);

      labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    } else {
      // Default or fallback label, if needed
      labels = [];
    }

    this.barDataTransfer = {
      labels: labels,
      datasets: [

        {
          label: 'TRANSFER QUANTITY',
          backgroundColor: '#ced621',
          borderColor: '#ced621',
          data: this.totalQuantityTransfer.map((a: any) => a[1]),

        }
      ]
    };

    this.barOptionsTransfer = {
      plugins: {
        legend: {
          labels: {
            color: textColor // Use `color` for newer chart.js versions
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
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
  getAllBassin(){
    this.bassinService.getAllBassinsDTO().subscribe(value => this.bassins=value)
  }

  getAllSbnl(){
    this.sbnlService.getAllSbnls().subscribe(value => this.sbnls=value)
}
  getAllBand(){
    this.bandService.getAllBands().subscribe(value => this.bands=value)
  }

  getAllSbl(){
    this.sblService.getAllSblDTO().subscribe(value => this.sbls=value)
}


  getAllPuit(){
    this.puitService.getAllPuits().subscribe(value => this.puits=value)
}

  getAllSblf(){
    this.sblfService.getAllSblfsDTO().subscribe(value => this.sblfs=value)
  }

  getAllStockOder(){
    this.stockOrderService.getAllStockOrderDTO().subscribe(value => this.stockOrders=value)
}
  protected readonly getToken = getToken;
  public date:Date=new Date();
  public dateSumRecolte!:Date|null;
  public dateSumRecolteByDay!:Date|null;
  public dateSumProductionByDay!:Date|null;
  public dateSumProduction!:Date|null;
  public dateSumTransfer!:Date|null;
  public dateSumTransferByDay!:Date|null;
  public dateSumEtatBassin!:Date|null;
  public dateStartForAttribute!:Date|null;
  public dateEndForAttribute!:Date|null;



  public changeSelectedBassin(selectedBassin: Bassin) {
  if(selectedBassin.id!=undefined){
    this.getCountAnalyseChemiqueBassin(selectedBassin.id,this.extractYearFromDate(this.date));
    this.countPhysicalAnalysesByBassinIdAndByMonth(selectedBassin.id,this.extractYearFromDate(this.date));
  }
    this. selectedSbnl={};
    this. selectedSbl={};
    this. selectedPuit={};
    this. selectedSblf={};
    this. selectedBand=new Band();
  }

  public changeSelectedSbnl(selectedSbnl: Sbnl) {
    if(selectedSbnl.id!=undefined){
      this.countAnalysesChimiquesBySbnlIdAndByMonth(selectedSbnl.id,this.extractYearFromDate(this.date));
      this.countPhysicalAnalysesBySbnlIdAndByMonth(selectedSbnl.id,this.extractYearFromDate(this.date));
    }
    this. selectedBassin={};
    this. selectedSbl={};
    this. selectedPuit={};
    this. selectedSblf={};
    this. selectedBand=new Band();

  }

  public changeSelectedSbl(selectedSbl: Sbl) {
    if(selectedSbl.id!=undefined){
      this.countAnalysesChimiquesBySblIdAndByMonth(selectedSbl.id,this.extractYearFromDate(this.date));
      this.countPhysicalAnalysesBySblIdAndByMonth(selectedSbl.id,this.extractYearFromDate(this.date));
    }
    this. selectedBassin={};
    this. selectedSbnl={};
    this. selectedPuit={};
    this. selectedSblf={};
    this. selectedBand=new Band();

  }



  public changeSelectedPuit(selectedPuit: Puit) {
    if(selectedPuit.id!=undefined){
      this.countAnalysesChimiquesByPuitIdAndByMonth(selectedPuit.id,this.extractYearFromDate(this.date));
      this.totalPhysique=[];
    }
    this. selectedBassin={};
    this. selectedSbnl={};
    this. selectedSbl={};
    this. selectedSblf={};
    this. selectedBand=new Band();

  }

  public changeSelectedSblf(selectedSblf: Sblf) {
    if(selectedSblf.id!=undefined){
      this.countAnalysesChimiquesBySblfIdAndByMonth(selectedSblf.id,this.extractYearFromDate(this.date));
      this.countPhysicalAnalysesBySblfIdAndByMonth(selectedSblf.id,this.extractYearFromDate(this.date));
    }
    this. selectedBassin={};
    this. selectedSbnl={};
    this. selectedPuit={};
    this. selectedSbl={};
    this. selectedBand=new Band();

  }
  public changeSelectedBand(selectedBand: Band) {
    if(selectedBand.id!=undefined){
      this.countAnalysesChimiquesByBandIdAndByMonth(selectedBand.id,this.extractYearFromDate(this.date));
      this.countPhysicalAnalysesByBandIdAndByMonth(selectedBand.id,this.extractYearFromDate(this.date));
    }
    this. selectedBassin={};
    this. selectedSbnl={};
    this. selectedPuit={};
    this. selectedSbl={};
    this. selectedSblf={};
  }
  extractYearFromDate(date: Date): number {
    return date.getFullYear();
  }
  getMonthFromDateString(dateS: Date): number {
    const date = new Date(dateS);
    return date.getMonth() + 1;
  }


  public changeYear(date: Date) {

  }




  public changeSelectedBassinSumRecolte(selectedBassinRecolte: Bassin) {
    if (selectedBassinRecolte && selectedBassinRecolte.id !== undefined) {
      const year = this.dateSumRecolte ? this.extractYearFromDate(this.dateSumRecolte) : null;
      const month = this.dateSumRecolteByDay ? this.getMonthFromDateString(this.dateSumRecolteByDay) : null;
      const yearForMonth = this.dateSumRecolteByDay ? this.extractYearFromDate(this.dateSumRecolteByDay) : null;

      if (year) {
        // Fetch data for the selected year and update the chart
        this.sumRecolteValueByBassinIdAndByMonthAndYear(selectedBassinRecolte.id, year);
      }

      if (month !== null && yearForMonth!==null && this.dateSumRecolteByDay) {
        // Fetch data for the selected day and month and update the chart
        this.sumRecolteValueByBassinIdAndByDayAndMonthInYear(selectedBassinRecolte.id, yearForMonth, month);
      }


    }
  }

  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();}

  public changedateSumRecolte(dateSumRecolte: Date | null) {
    // When the year is selected, clear the day-level selection
    this.dateSumRecolteByDay = null;
    this.dateSumRecolte = dateSumRecolte;
  }
  getSumSalines(stockOrder:StockOrder){
    const TotalSaline= stockOrder.salines.reduce((sum, saline) => sum+saline.volumeSaline,0)
    const TotalTransferFromSaline=stockOrder.listHistory.filter(lh=>lh.startingPoint=='Saline volume').reduce((sum, history) => sum+history.transferQuantity,0)
    const TotalTransferToSaline=stockOrder.listHistory.filter(lh=>lh.arrivingPoint=='Saline volume').reduce((sum, history) => sum+history.transferQuantity,0)

    return  (TotalSaline-TotalTransferFromSaline) +TotalTransferToSaline;

  }

  public changedateSumRecolteByDay(dateSumRecolteByDay: Date | null) {
    // When the month is selected, clear the year-level selection
    this.dateSumRecolte = null;
    this.dateSumRecolteByDay = dateSumRecolteByDay;
  }

  public changeSelectedStockOrder(s: StockOrder) {
    this.initChartPieChart(this.getSumSalines(s),s.volumeTerrain,s.volumePort,s.volumeQuai);
  }

  public changedateSumProduction(dateSumProduction: Date | null) {
    this.dateSumProductionByDay=null;
    this.dateSumProduction=dateSumProduction;
    this.changeProductionYearAndMonth();
  }

  public changedateSumProductionByDay(dateSumProductionByDay: Date | null) {
    this.dateSumProduction=null;
    this.dateSumProductionByDay=dateSumProductionByDay;
    this.changeProductionYearAndMonth();
  }


  public changeProductionYearAndMonth() {
      const year = this.dateSumProduction ? this.extractYearFromDate(this.dateSumProduction) : null;
      const month = this.dateSumProductionByDay ? this.getMonthFromDateString(this.dateSumProductionByDay) : null;
      const yearForMonth = this.dateSumProductionByDay ? this.extractYearFromDate(this.dateSumProductionByDay) : null;
      if (year) {
        // Fetch data for the selected year and update the chart
      this.sumSortie1ByMonthAndYear(year)  ;
      this.sumSortieB2ByMonthAndYear(year)  ;
      this.sumBigSaltByMonthAndYear(year)  ;
      this.sumResultByMonthAndYear(year)  ;


      }

      if (month !== null && yearForMonth!==null && this.dateSumProductionByDay) {
        // Fetch data for the selected day and month and update the chart
        this.sumSortieB1ByDayAndMonthInYear(yearForMonth,month)  ;
        this.sumSortieB2ByDayAndMonthInYear(yearForMonth,month)  ;
        this.sumBigSaltByDayAndMonthInyear(yearForMonth,month ) ;
        this.sumResultByDayAndMonthInYear(yearForMonth,month)  ;
      }


  }

  public changedateSumTransferByDay(dateSumTransferByDay: Date | null) {
    this.dateSumTransfer=null;
    this.dateSumTransferByDay=dateSumTransferByDay;
    this.changeTransferYearAndMonth()
  }

  public changedateSumTransfer(dateSumTransfer: Date | null) {
    this.dateSumTransferByDay=null;
    this.dateSumTransfer=dateSumTransfer;
    this.changeTransferYearAndMonth()
  }

  public getTransferAttributsFiltredStart() {
    if(this.startingPoint!=undefined)
      this.TransferAttributsEnd=this.TransferAttributs.filter(t=>t.id!=this.startingPoint.id)
    else
      this.TransferAttributsEnd=[...this.TransferAttributs] ;
  }
  public getTransferAttributsFiltredEnd() {

    if(this.arrivingPoint!=undefined)
      this.TransferAttributsStart=this.TransferAttributs.filter(t=>t.id!=this.arrivingPoint.id)
    else
      this.TransferAttributsStart=[...this.TransferAttributs] ;
  }


  public changeTransferYearAndMonth() {
    const year = this.dateSumTransfer? this.extractYearFromDate(this.dateSumTransfer) : null;
    const month = this.dateSumTransferByDay ? this.getMonthFromDateString(this.dateSumTransferByDay) : null;
    const yearForMonth = this.dateSumTransferByDay ? this.extractYearFromDate(this.dateSumTransferByDay) : null;
    if (year) {
      // Fetch data for the selected year and update the chart
      this.findMonthlySumTransferQuantityByStartingPointArrivingPointAndYear(this.startingPoint.label,this.arrivingPoint.label,year);


    }

    if (month !== null && yearForMonth!==null && this.dateSumTransferByDay) {
      // Fetch data for the selected day and month and update the chart
      this.findDailySumTransferQuantityByStartingPointArrivingPointAndYearAndMonth(this.startingPoint.label,this.arrivingPoint.label,yearForMonth,month);
    }


  }


  initChartStackedBarForEtatBassin(){

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.dataEtatBassin = {
      labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

      datasets: [
        {
          type: 'bar',
          label: 'Flooding',
          backgroundColor: '#bcbcbc',
          data: this.totalSumEtatBassinInodee.map((a: any) => a[1]),
        },
        {
          type: 'bar',
          label: 'Feeding ',
          backgroundColor: '#5d5d5d',
          data: this.totalSumEtatBassinAlimentation.map((a: any) => a[1]),
        },
        {
          type: 'bar',
          label: 'Dry',
          backgroundColor:  '#00a6b9',
          data: this.totalSumEtatBassinSec.map((a: any) => a[1]),
        },
        {
          type: 'bar',
          label: 'Draining',
          backgroundColor:  '#ced621',
          data: this.totalSumEtatBassinVidange.map((a: any) => a[1]),
        },
        {
          type: 'bar',
          label: 'Harvest',
          backgroundColor:  '#56cd8b',
          data: this.totalSumEtatBassinRecolte.map((a: any) => a[1]),
        },
        {
          type: 'bar',
          label: 'Maintenance',
          backgroundColor:  '#d39b9e',
          data: this.totalSumEtatBassinMaintenance.map((a: any) => a[1]),
        }
      ]
    };

    this.optionsEtatBassin = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          stacked: true,
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


  public changeSelectedEtatBassin(selectedEtatBassin: Bassin) {
    if( selectedEtatBassin.id!==undefined ){
      const year = this.dateSumEtatBassin? this.extractYearFromDate(this.dateSumEtatBassin) : null;

if(year){


      this.sumDaysByEtatBassinAndMonthAndYearAlimentation(selectedEtatBassin.id,year,'Feeding')
      this.sumDaysByEtatBassinAndMonthAndYearInodee(selectedEtatBassin.id,year,'Flooding')
      this.sumDaysByEtatBassinAndMonthAndYearSec(selectedEtatBassin.id,year,'Dry')
      this.sumDaysByEtatBassinAndMonthAndYearVidange(selectedEtatBassin.id,year,'Draining')
      this.sumDaysByEtatBassinAndMonthAndYearRecolte(selectedEtatBassin.id,year,'Harvest')
      this.sumDaysByEtatBassinAndMonthAndYearMaintenance(selectedEtatBassin.id,year,'Maintenance')
}
    }
  }


  public changedateSumEtatBassin(dateSumEtatBassin: Date | null) {

  }

  public changeDateEndForAttribute(dateStartForAttribute: Date | null) {

  }

  public changeDateStartForAttribute(dateStartForAttribute: Date | null) {

  }




  // public changeSelectedBassinForAttribute(selectedBassinForAttribute: Bassin) {
  //
  //     if(selectedBassinForAttribute && selectedBassinForAttribute.id!==undefined && this.dateEndForAttribute!==null && this.dateStartForAttribute!== null && this.selectedAttributes.length>0){
  //       this.selectedAttributes.forEach(value => {
  //         if (selectedBassinForAttribute.id !== undefined && this.dateEndForAttribute!==null && this.dateStartForAttribute!== null){
  //           if(value.label=='densite'){
  //           this.calculateSumForAttributeBassinDensite(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //           if(value.label=='matiereEnSuspension'){
  //             this.calculateSumForAttributeBassinMatiereEnSuspension(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //           if(value.label=='salinite'){
  //             this.calculateSumForAttributeBassinSalinite(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //           if(value.label=='calcium'){
  //             this.calculateSumForAttributeBassinCalcium(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //           if(value.label=='magnesium'){
  //             this.calculateSumForAttributeBassinMagnesium(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //           if(value.label=='sulfate'){
  //             this.calculateSumForAttributeBassinSulfate(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //           if(value.label=='humidite'){
  //             this.calculateSumForAttributeBassinHumidite(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //           if(value.label=='matiereInsoluble'){
  //             this.calculateSumForAttributeBassinMatiereInsoluble(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //           if(value.label=='potassium'){
  //             this.calculateSumForAttributeBassinPotassium(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //           if(value.label=='sodium'){
  //             this.calculateSumForAttributeBassinSodium(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //           if(value.label=='chlorure'){
  //             this.calculateSumForAttributeBassinChlorure(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //
  //           if(value.label=='ph'){
  //             this.calculateSumForAttributeBassinPh(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //           if(value.label=='chlorureDeSodium'){
  //             this.calculateSumForAttributeBassinChlorureDeSodium(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //           if(value.label=='ferrocyanure'){
  //             this.calculateSumForAttributeBassinFerrocyanure(selectedBassinForAttribute.id, this.dateStartForAttribute, this.dateEndForAttribute, value.label)
  //
  //           }
  //
  //         }
  //
  //       })
  //     }
  // }








  initChartForAttributeBassin(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    // Process the data to extract labels and values
    const labels = this.chartDataForAttributeLabels
      .map((item: any) => Object.keys(item)[0]).map((dateStr: string) => new Date(dateStr)).sort((a: Date, b: Date) => a.getTime() - b.getTime()).map((date: Date) => date.toISOString().split('T')[0]);
    // Extraire les données de densité en les triant dans le même ordre que les labels
    const dataDensite = labels.map(label => {
      const item = this.chartDataForAttributeDensite.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });

    const dataPh = labels.map(label => {
      const item = this.chartDataForAttributePh.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });




    const dataMatiereEnSuspension = labels.map(label => {
      const item = this.chartDataForAttributeMatiereEnSuspension.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });
    const dataSalinite = labels.map(label => {
      const item = this.chartDataForAttributeSalinite.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });
    const dataCalcium = labels.map(label => {
      const item = this.chartDataForAttributeCalcium.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });
    const dataMagnesium = labels.map(label => {
      const item = this.chartDataForAttributeMagnesium.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });
    const dataSulfate = labels.map(label => {
      const item = this.chartDataForAttributeSulfate.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });
    const dataHumidite = labels.map(label => {
      const item = this.chartDataForAttributeHumidite.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });
    const dataMatiereInsoluble = labels.map(label => {
      const item = this.chartDataForAttributeMatiereInsoluble.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });
    const dataPotassium = labels.map(label => {
      const item = this.chartDataForAttributePotassium.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });
    const dataSodium = labels.map(label => {
      const item = this.chartDataForAttributeSodium.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });
    const dataChlorure = labels.map(label => {
      const item = this.chartDataForAttributeChlorure.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });
    const dataChlorureDeSodium = labels.map(label => {
      const item = this.chartDataForAttributeChlorureDeSodium.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });
    const dataFerrocyanure = labels.map(label => {
      const item = this.chartDataForAttributeFerrocyanure.find((data: any) => Object.keys(data)[0] === label);
      return item ? Object.values(item)[0] : 0; // Assurer qu'il y a toujours une valeur pour chaque label
    });

    this.chartDataForAttribute = {

      labels:labels,
      datasets: [
        {
          label: 'D',
          data: dataDensite,
          fill: false,
          backgroundColor: '#5d5d5d',
          borderColor: '#5d5d5d',
          tension: .4
        },
        {
          label: 'MS',
          data: dataMatiereEnSuspension,
          fill: false,
          backgroundColor: '#bcbcbc',
          borderColor: '#bcbcbc',
          tension: .4
        },
        {
          label: 'S',
          data: dataSalinite,
          fill: false,
          backgroundColor: '#00a6b9',
          borderColor: '#00a6b9',
          tension: .4
        },
        {
          label: 'Ca',
          data: dataCalcium,
          fill: false,
          backgroundColor: '#ced621',
          borderColor: '#ced621',
          tension: .4
        },
        {
          label: 'Mg',
          data: dataMagnesium,
          fill: false,
          backgroundColor: '#56cd8b',
          borderColor: '#56cd8b',
          tension: .4
        },
        {
          label: 'SO₄',
          data: dataSulfate,
          fill: false,
          backgroundColor: '#4f4cba',
          borderColor: '#4f4cba',
          tension: .4
        },
        {
          label: 'H₂O',
          data: dataHumidite,
          fill: false,
          backgroundColor: '#dd982a',
          borderColor: '#dd982a',
          tension: .4
        },
        {
          label: 'MI',
          data: dataMatiereInsoluble,
          fill: false,
          backgroundColor: '#d9bec5',
          borderColor: '#d9bec5',
          tension: .4
        },
        {
          label: 'K',
          data: dataPotassium,
          fill: false,
          backgroundColor: '#759556',
          borderColor: '#759556',
          tension: .4
        },
        {
          label: 'Na',
          data: dataSodium,
          fill: false,
          backgroundColor: '#ebecd0',
          borderColor: '#ebecd0',
          tension: .4
        },
        {
          label: 'Cl',
          data: dataChlorure,
          fill: false,
          backgroundColor: '#008b8b',
          borderColor: '#008b8b',
          tension: .4
        },
        {
          label: 'NaCl',
          data: dataChlorureDeSodium,
          fill: false,
          backgroundColor: '#844b38',
          borderColor: '#844b38',
          tension: .4
        },
        {
          label: 'PH ',
          data: dataPh,
          fill: false,
          backgroundColor: '#e6e8ff',
          borderColor: '#e6e8ff',
          tension: .4
        },
        {
          label: 'Fe(CN)₆',
          data: dataFerrocyanure,
          fill: false,
          backgroundColor: '#006699',
          borderColor: '#006699',
          tension: .4
        }
      ]
    };
    this.chartOptionsForAttribute = {
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


  // ======For Attribute Bassin=============
  calculateSumForAttributeBassin(bassinId: number, startDate: Date, endDate: Date, attributeName: string, chartDataVariable: string): void {

    const sumForAttributeRequest: SumForAttributeRequest = new SumForAttributeRequest();
    sumForAttributeRequest.id=bassinId;
    sumForAttributeRequest.startDate=startDate;
    sumForAttributeRequest.endDate=endDate;
    sumForAttributeRequest.attributeName=attributeName;
    this.dashboardService.calculateSumForAttributeBassin(sumForAttributeRequest).subscribe({
      next: (value: any[]) => {
        if (this.hasOwnProperty(chartDataVariable)) {
          (this as any)[chartDataVariable] = value; // Type assertion to allow dynamic property access
          this.chartDataForAttributeLabels = value;
          this.initChartForAttributeBassin();
        } else {
          console.error(`Property ${chartDataVariable} does not exist on the component.`);
        }
      },
      error: (err: any) => {
        console.error('Error occurred while fetching data', err);
      }
    });
  }
  public changeSelectedBassinForAttribute(selectedBassinForAttribute: Bassin): void {
    // Check if the selectedBassinForAttribute object and its ID are valid
    if (
      selectedBassinForAttribute &&
      selectedBassinForAttribute.id !== undefined &&
      this.dateEndForAttribute !== null &&
      this.dateStartForAttribute !== null &&
      this.selectedAttributes.length > 0
    ) {
      // Define the mapping between attributes and chart data variables
      const attributeToChartDataMap: { [key: string]: string } = {
        'densite': 'chartDataForAttributeDensite',
        'matiereEnSuspension': 'chartDataForAttributeMatiereEnSuspension',
        'salinite': 'chartDataForAttributeSalinite',
        'calcium': 'chartDataForAttributeCalcium',
        'magnesium': 'chartDataForAttributeMagnesium',
        'sulfate': 'chartDataForAttributeSulfate',
        'humidite': 'chartDataForAttributeHumidite',
        'matiereInsoluble': 'chartDataForAttributeMatiereInsoluble',
        'potassium': 'chartDataForAttributePotassium',
        'sodium': 'chartDataForAttributeSodium',
        'chlorure': 'chartDataForAttributeChlorure',
        'chlorureDeSodium': 'chartDataForAttributeChlorureDeSodium',
        'ferrocyanure': 'chartDataForAttributeFerrocyanure'
      };

      // Iterate over the selected attributes
      this.selectedAttributes.forEach(attribute => {
        // Find the corresponding chart data variable for the attribute
        const chartDataVariable = attributeToChartDataMap[attribute.label];

        // Check if the chart data variable is defined
        if (chartDataVariable && selectedBassinForAttribute.id !== undefined && this.dateEndForAttribute !== null && this.dateStartForAttribute !== null ) {
          // Call the method to calculate the sum for the attribute
          this.calculateSumForAttributeBassin(
            selectedBassinForAttribute.id,
            this.dateStartForAttribute,
            this.dateEndForAttribute,
            attribute.label,
            chartDataVariable
          );
        }
      });
    }

    this. selectedSbnlForAttribute={};
    this. selectedPuitForAttribute={};
    this. selectedSblForAttribute={};
    this. selectedSblfForAttribute={};
  }

// ======For Attribute Bassin=============

  // ======For Attribute Puit=============
  calculateSumForAttributePuit(puitId: number, startDate: Date, endDate: Date, attributeName: string, chartDataVariable: string): void {

    const sumForAttributeRequest: SumForAttributeRequest = new SumForAttributeRequest();
    sumForAttributeRequest.id=puitId;
    sumForAttributeRequest.startDate=startDate;
    sumForAttributeRequest.endDate=endDate;
    sumForAttributeRequest.attributeName=attributeName;
    this.dashboardService.calculateSumForAttributePuit(sumForAttributeRequest).subscribe({
      next: (value: any[]) => {
        if (this.hasOwnProperty(chartDataVariable)) {
          (this as any)[chartDataVariable] = value; // Type assertion to allow dynamic property access
          this.chartDataForAttributeLabels = value;
          this.initChartForAttributeBassin();
        } else {
          console.error(`Property ${chartDataVariable} does not exist on the component.`);
        }
      },
      error: (err: any) => {
        console.error('Error occurred while fetching data', err);
      }
    });
  }
  public changeSelectedPuitForAttribute(selectedPuitForAttribute: Puit): void {
    // Check if the selectedBassinForAttribute object and its ID are valid
    if (
      selectedPuitForAttribute &&
      selectedPuitForAttribute.id !== undefined &&
      this.dateEndForAttribute !== null &&
      this.dateStartForAttribute !== null &&
      this.selectedAttributes.length > 0
    ) {
      // Define the mapping between attributes and chart data variables
      const attributeToChartDataMap: { [key: string]: string } = {
        'densite': 'chartDataForAttributeDensite',
        'matiereEnSuspension': 'chartDataForAttributeMatiereEnSuspension',
        'salinite': 'chartDataForAttributeSalinite',
        'calcium': 'chartDataForAttributeCalcium',
        'magnesium': 'chartDataForAttributeMagnesium',
        'sulfate': 'chartDataForAttributeSulfate',
        'humidite': 'chartDataForAttributeHumidite',
        'matiereInsoluble': 'chartDataForAttributeMatiereInsoluble',
        'potassium': 'chartDataForAttributePotassium',
        'sodium': 'chartDataForAttributeSodium',
        'chlorure': 'chartDataForAttributeChlorure',
        'chlorureDeSodium': 'chartDataForAttributeChlorureDeSodium',
        'ferrocyanure': 'chartDataForAttributeFerrocyanure'
      };

      // Iterate over the selected attributes
      this.selectedAttributes.forEach(attribute => {
        // Find the corresponding chart data variable for the attribute
        const chartDataVariable = attributeToChartDataMap[attribute.label];

        // Check if the chart data variable is defined
        if (chartDataVariable && selectedPuitForAttribute.id !== undefined && this.dateEndForAttribute !== null && this.dateStartForAttribute !== null ) {
          // Call the method to calculate the sum for the attribute
          this.calculateSumForAttributePuit(
            selectedPuitForAttribute.id,
            this.dateStartForAttribute,
            this.dateEndForAttribute,
            attribute.label,
            chartDataVariable
          );
        }
      });
    }

    this. selectedSbnlForAttribute={};
    this. selectedBassinForAttribute={};
    this. selectedSblForAttribute={};
    this. selectedSblfForAttribute={};
  }

// ======For Attribute Puit=============

  // ======For Attribute Sbnl=============
  calculateSumForAttributeSbnl(sbnlId: number, startDate: Date, endDate: Date, attributeName: string, chartDataVariable: string): void {

    const sumForAttributeRequest: SumForAttributeRequest = new SumForAttributeRequest();
    sumForAttributeRequest.id=sbnlId;
    sumForAttributeRequest.startDate=startDate;
    sumForAttributeRequest.endDate=endDate;
    sumForAttributeRequest.attributeName=attributeName;
    this.dashboardService.calculateSumForAttributeSbnl(sumForAttributeRequest).subscribe({
      next: (value: any[]) => {
        if (this.hasOwnProperty(chartDataVariable)) {
          (this as any)[chartDataVariable] = value; // Type assertion to allow dynamic property access
          this.chartDataForAttributeLabels = value;
          this.initChartForAttributeBassin();
        } else {
          console.error(`Property ${chartDataVariable} does not exist on the component.`);
        }
      },
      error: (err: any) => {
        console.error('Error occurred while fetching data', err);
      }
    });
  }
  public changeSelectedSbnlForAttribute(selectedSbnlForAttribute: Sbnl): void {
    // Check if the selectedBassinForAttribute object and its ID are valid
    if (
      selectedSbnlForAttribute &&
      selectedSbnlForAttribute.id !== undefined &&
      this.dateEndForAttribute !== null &&
      this.dateStartForAttribute !== null &&
      this.selectedAttributes.length > 0
    ) {
      // Define the mapping between attributes and chart data variables
      const attributeToChartDataMap: { [key: string]: string } = {
        'densite': 'chartDataForAttributeDensite',
        'matiereEnSuspension': 'chartDataForAttributeMatiereEnSuspension',
        'salinite': 'chartDataForAttributeSalinite',
        'calcium': 'chartDataForAttributeCalcium',
        'magnesium': 'chartDataForAttributeMagnesium',
        'sulfate': 'chartDataForAttributeSulfate',
        'humidite': 'chartDataForAttributeHumidite',
        'matiereInsoluble': 'chartDataForAttributeMatiereInsoluble',
        'potassium': 'chartDataForAttributePotassium',
        'sodium': 'chartDataForAttributeSodium',
        'chlorure': 'chartDataForAttributeChlorure',
        'chlorureDeSodium': 'chartDataForAttributeChlorureDeSodium',
        'ferrocyanure': 'chartDataForAttributeFerrocyanure'
      };

      // Iterate over the selected attributes
      this.selectedAttributes.forEach(attribute => {
        // Find the corresponding chart data variable for the attribute
        const chartDataVariable = attributeToChartDataMap[attribute.label];

        // Check if the chart data variable is defined
        if (chartDataVariable && selectedSbnlForAttribute.id !== undefined && this.dateEndForAttribute !== null && this.dateStartForAttribute !== null ) {
          // Call the method to calculate the sum for the attribute
          this.calculateSumForAttributeSbnl(
            selectedSbnlForAttribute.id,
            this.dateStartForAttribute,
            this.dateEndForAttribute,
            attribute.label,
            chartDataVariable
          );
        }
      });
    }

    this. selectedBassinForAttribute={};
    this. selectedPuitForAttribute={};
    this. selectedSblForAttribute={};
    this. selectedSblfForAttribute={};
  }

// ======For Attribute Sbnl=============

  // ======For Attribute Sbl=============
  calculateSumForAttributeSbl(sblId: number, startDate: Date, endDate: Date, attributeName: string, chartDataVariable: string): void {

    const sumForAttributeRequest: SumForAttributeRequest = new SumForAttributeRequest();
    sumForAttributeRequest.id=sblId;
    sumForAttributeRequest.startDate=startDate;
    sumForAttributeRequest.endDate=endDate;
    sumForAttributeRequest.attributeName=attributeName;
    this.dashboardService.calculateSumForAttributeSbl(sumForAttributeRequest).subscribe({
      next: (value: any[]) => {
        if (this.hasOwnProperty(chartDataVariable)) {
          (this as any)[chartDataVariable] = value; // Type assertion to allow dynamic property access
          this.chartDataForAttributeLabels = value;
          this.initChartForAttributeBassin();
        } else {
          console.error(`Property ${chartDataVariable} does not exist on the component.`);
        }
      },
      error: (err: any) => {
        console.error('Error occurred while fetching data', err);
      }
    });
  }
  public changeSelectedSblForAttribute(selectedSblForAttribute: Bassin): void {
    // Check if the selectedBassinForAttribute object and its ID are valid
    if (
      selectedSblForAttribute &&
      selectedSblForAttribute.id !== undefined &&
      this.dateEndForAttribute !== null &&
      this.dateStartForAttribute !== null &&
      this.selectedAttributes.length > 0
    ) {
      // Define the mapping between attributes and chart data variables
      const attributeToChartDataMap: { [key: string]: string } = {
        'densite': 'chartDataForAttributeDensite',
        'matiereEnSuspension': 'chartDataForAttributeMatiereEnSuspension',
        'salinite': 'chartDataForAttributeSalinite',
        'calcium': 'chartDataForAttributeCalcium',
        'magnesium': 'chartDataForAttributeMagnesium',
        'sulfate': 'chartDataForAttributeSulfate',
        'humidite': 'chartDataForAttributeHumidite',
        'matiereInsoluble': 'chartDataForAttributeMatiereInsoluble',
        'potassium': 'chartDataForAttributePotassium',
        'sodium': 'chartDataForAttributeSodium',
        'chlorure': 'chartDataForAttributeChlorure',
        'chlorureDeSodium': 'chartDataForAttributeChlorureDeSodium',
        'ferrocyanure': 'chartDataForAttributeFerrocyanure'
      };

      // Iterate over the selected attributes
      this.selectedAttributes.forEach(attribute => {
        // Find the corresponding chart data variable for the attribute
        const chartDataVariable = attributeToChartDataMap[attribute.label];

        // Check if the chart data variable is defined
        if (chartDataVariable && selectedSblForAttribute.id !== undefined && this.dateEndForAttribute !== null && this.dateStartForAttribute !== null ) {
          // Call the method to calculate the sum for the attribute
          this.calculateSumForAttributeSbl(
            selectedSblForAttribute.id,
            this.dateStartForAttribute,
            this.dateEndForAttribute,
            attribute.label,
            chartDataVariable
          );
        }
      });
    }

    this. selectedSbnlForAttribute={};
    this. selectedPuitForAttribute={};
    this. selectedBassinForAttribute={};
    this. selectedSblfForAttribute={};
  }

// ======For Attribute Sbl=============

  // ======For Attribute Sblf=============
  calculateSumForAttributeSblf(sblfId: number, startDate: Date, endDate: Date, attributeName: string, chartDataVariable: string): void {

    const sumForAttributeRequest: SumForAttributeRequest = new SumForAttributeRequest();
    sumForAttributeRequest.id=sblfId;
    sumForAttributeRequest.startDate=startDate;
    sumForAttributeRequest.endDate=endDate;
    sumForAttributeRequest.attributeName=attributeName;
    this.dashboardService.calculateSumForAttributeSblf(sumForAttributeRequest).subscribe({
      next: (value: any[]) => {
        if (this.hasOwnProperty(chartDataVariable)) {
          (this as any)[chartDataVariable] = value; // Type assertion to allow dynamic property access
          this.chartDataForAttributeLabels = value;
          this.initChartForAttributeBassin();
        } else {
          console.error(`Property ${chartDataVariable} does not exist on the component.`);
        }
      },
      error: (err: any) => {
        console.error('Error occurred while fetching data', err);
      }
    });
  }
  public changeSelectedSblfForAttribute(selectedSblfForAttribute: Sblf): void {
    // Check if the selectedBassinForAttribute object and its ID are valid
    if (
      selectedSblfForAttribute &&
      selectedSblfForAttribute.id !== undefined &&
      this.dateEndForAttribute !== null &&
      this.dateStartForAttribute !== null &&
      this.selectedAttributes.length > 0
    ) {
      // Define the mapping between attributes and chart data variables
      const attributeToChartDataMap: { [key: string]: string } = {
        'densite': 'chartDataForAttributeDensite',
        'matiereEnSuspension': 'chartDataForAttributeMatiereEnSuspension',
        'salinite': 'chartDataForAttributeSalinite',
        'calcium': 'chartDataForAttributeCalcium',
        'magnesium': 'chartDataForAttributeMagnesium',
        'sulfate': 'chartDataForAttributeSulfate',
        'humidite': 'chartDataForAttributeHumidite',
        'matiereInsoluble': 'chartDataForAttributeMatiereInsoluble',
        'potassium': 'chartDataForAttributePotassium',
        'sodium': 'chartDataForAttributeSodium',
        'chlorure': 'chartDataForAttributeChlorure',
        'chlorureDeSodium': 'chartDataForAttributeChlorureDeSodium',
        'ferrocyanure': 'chartDataForAttributeFerrocyanure'
      };

      // Iterate over the selected attributes
      this.selectedAttributes.forEach(attribute => {
        // Find the corresponding chart data variable for the attribute
        const chartDataVariable = attributeToChartDataMap[attribute.label];

        // Check if the chart data variable is defined
        if (chartDataVariable && selectedSblfForAttribute.id !== undefined && this.dateEndForAttribute !== null && this.dateStartForAttribute !== null ) {
          // Call the method to calculate the sum for the attribute
          this.calculateSumForAttributeSblf(
            selectedSblfForAttribute.id,
            this.dateStartForAttribute,
            this.dateEndForAttribute,
            attribute.label,
            chartDataVariable
          );
        }
      });
    }

    this. selectedSbnlForAttribute={};
    this. selectedPuitForAttribute={};
    this. selectedSblForAttribute={};
    this. selectedBassinForAttribute={};
  }

// ======For Attribute Sblf=============


}


