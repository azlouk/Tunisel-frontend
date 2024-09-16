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

  totalRecolteValue:any[]=[];
  totalSortie1:any[]=[];
  totalSortie2:any[]=[];
  totalBigSalt:any[]=[];
  totalResultConcasseur:any[]=[];

  public dashboardData: Dashboard = new Dashboard(0, 0,0,0);
  public userConnect:RegisterRequest=new RegisterRequest();
  public bassins: Bassin[]=[];
  public selectedBassin: Bassin={};
  public selectedSbnl: Sbnl={};
  public sbnls: Sbnl[]=[];
  public sbls: Sbl[]=[];
  public selectedSbl: Sbl={};
  public puits: Puit[]=[];
  public selectedPuit: Puit={};
  public sblfs: Sblf[]=[];
  public selectedSblf: Sblf={};
  public selectedBassinRecolte: Bassin={};
  public selectedStockOrder:StockOrder=new StockOrder();
  public stockOrders:StockOrder[]=[];
  constructor( private dashboardService: DashboardService,
               private userService:UserService,
               private bassinService:BassinService,
               private sbnlService:SbnlService,
               private sblService:SblService,
               private puitService:PuitService,
               private sblfService:SblfService,
               private stockOrderService:StockOrderService) {}

  ngOnInit() {
    this.getUserConnected();
    // this.getCountTotalAnalysesChimiques();
    // this.getCountAnalyseChemiqueBassin();
     this.fetchDashboardData()
    this.getAllBassin();
    this.getAllSbnl();
    this.getAllSbl();
    this.getAllSblf();
    this.getAllPuit();
    this.getAllStockOder();
   this.initChartBarForProduction()

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

 public getUserConnected(){
    this.userService.getUserConnect().subscribe(value => this.userConnect=value)
}
getAllBassin(){
    this.bassinService.getAllBassinsDTO().subscribe(value => this.bassins=value)
}

getAllSbnl(){
    this.sbnlService.getAllSbnls().subscribe(value => this.sbnls=value)
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



  public changeSelectedBassin(selectedBassin: Bassin) {
  if(selectedBassin.id!=undefined){
    this.getCountAnalyseChemiqueBassin(selectedBassin.id,this.extractYearFromDate(this.date));
    this.countPhysicalAnalysesByBassinIdAndByMonth(selectedBassin.id,this.extractYearFromDate(this.date));
  }
this. selectedSbnl={};
this. selectedSbl={};
this. selectedPuit={};
    this. selectedSblf={};
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

}
