import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AutoFocusModule} from "primeng/autofocus";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DatePipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {DateDaily} from "../../Models/date-daily";
import {DailyUpdateService} from "../../Services/daily-update.service";
import {Transfer} from "../../Models/transfer";
import {Production} from "../../Models/production";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-daily-update',
  standalone: true,
  imports: [
    AutoFocusModule,
    ButtonModule,
    CalendarModule,
    DatePipe,
    DialogModule,
    DropdownModule,
    NgForOf,
    NgIf,
    SharedModule,
    TableModule,
    FormsModule
  ],
  templateUrl: './daily-update.component.html',
  styleUrl: './daily-update.component.css'
})
export class DailyUpdateComponent implements OnInit {


  dateToday: Date = new Date();
  public date: Date = new Date();
  listDateDaily: DateDaily[] = [];
  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  loadDaily: boolean = false;

  constructor(private dailyUpdateService: DailyUpdateService) {
  }

  public ngOnInit(): void {


  }

  public getDataByDay(date: Date) {
    this.listDateDaily = [];
    const month = this.getMonthFromDateString(this.date);
    const year = this.getYearFromDateString(this.date);
    this.loadDaily = true;
    this.dailyUpdateService.getDataByDay(month, year).subscribe(value => {
      this.listDateDaily = value
      this.loadDaily = false
      console.log(new JsonPipe().transform(this.listDateDaily))
      this.getuniqueCalibresProduction();
      this.getuniqueCalibresTransfer();
    })
  }

  getMonthFromDateString(dateS: Date): number {
    const date = new Date(dateS);
    return date.getMonth() + 1;
  }

  getYearFromDateString(dateS: Date): number {
    const date = new Date(dateS);
    return date.getFullYear();
  }


  // public SavePDF(): void {
  //   if (this.htmlContent) {
  //     html2canvas(this.htmlContent.nativeElement, {scale: 1}).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       const imgWidth = 210; // PDF width
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  //       pdf.addImage(imgData, 'png', 2, 2, imgWidth, imgHeight);
  //       pdf.save('Print_' + Math.random() + '.pdf');
  //     });
  //   }
  public SavePDF(): void {
    if (this.htmlContent) {
      html2canvas(this.htmlContent.nativeElement, {scale: 1}).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth - 4; // Adjust for margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

        let position = 0;
        if (imgHeight > pageHeight) {
          // If the content is taller than a single page, split it into multiple pages
          let remainingHeight = imgHeight;
          while (remainingHeight > 0) {
            pdf.addImage(imgData, 'PNG', 2, position, imgWidth, imgHeight);
            remainingHeight -= pageHeight;
            position -= pageHeight;
            if (remainingHeight > 0) {
              pdf.addPage();
            }
          }
        } else {
          // If the content fits on a single page
          pdf.addImage(imgData, 'PNG', 2, 2, imgWidth, imgHeight);
        }

        pdf.save('Print_' + Math.random() + '.pdf');
      });
    }
  }




  getuniqueCalibresProduction(): number[] {
    const calibres = new Set<number>();
    this.listDateDaily.forEach(dateDaily =>
      dateDaily.dataDaily.productionList.forEach((production: any) => {
        calibres.add(production.calibre);
      })
    );
    return Array.from(calibres);
  }
  getuniqueCalibresTransfer(): number[] {
    const calibres = new Set<number>();
    this.listDateDaily.forEach(dateDaily =>
      dateDaily.dataDaily.transferList.forEach((transfer: any) => {
        calibres.add(transfer.calibre);
      })
    );
    return Array.from(calibres);
  }

  public getLengthOfObservation(observation: any) {

    return observation && observation !== 'null' && observation.trim() !== '';
  }

  public getTotalHarvest(): number {
    let totalHarvest: number = 0;
    this.listDateDaily.forEach(dateDaily => {
      totalHarvest += dateDaily.dataDaily.harvestList
        .reduce((sum, harvest) => sum + harvest.t, 0);
    });
    return totalHarvest;
  }


  public getTotalProductionQuantity(calibre: number): number {
    let totalProQuantity: number = 0;
    this.listDateDaily.forEach(dateDaily => {
      totalProQuantity += dateDaily.dataDaily.productionList
        .filter(production => production.calibre === calibre) // Filter by calibre
        .reduce((sum, production) => sum + production.value, 0); // Sum the filtered values
    });
    return totalProQuantity;
  }


  public getTotalTransferQuantity(calibre:number) {
    let totalTransQuantity:number=0;
    this.listDateDaily.forEach(dateDaily => dateDaily.dataDaily.transferList
      .filter(transfer => transfer.calibre === calibre) // Filter by calibre
      .reduce((previousValue, currentValue) =>totalTransQuantity+=previousValue+ currentValue.masse ,0))
    return totalTransQuantity;
  }
}
