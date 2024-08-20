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
export class DailyUpdateComponent implements OnInit{


  dateToday: Date = new Date();
  public date: Date=new Date();
  listDateDaily:DateDaily[]=[];
  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  constructor(private dailyUpdateService:DailyUpdateService ) {
  }
  public ngOnInit(): void {


  }
  public getDataByDay(date: Date) {
    this.listDateDaily=[];
    const month=this.getMonthFromDateString(this.date);
    const year=this.getYearFromDateString(this.date);
      this.dailyUpdateService.getDataByDay(month,year).subscribe(value => {
        this.listDateDaily = value
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
  // }

  public SavePDF(): void {
    if (this.htmlContent) {
      html2canvas(this.htmlContent.nativeElement, { scale: 1 }).then((canvas) => {
        const imgWidth = 210; // PDF width in mm
        const pageHeight = 297; // PDF height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculating image height while maintaining aspect ratio
        const heightLeft = imgHeight;
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        if (heightLeft <= pageHeight) {
          // If content fits on one page
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
        } else {
          // If content exceeds one page
          while (position < heightLeft) {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            position -= pageHeight; // Move position to the next page
            if (position < heightLeft) {
              pdf.addPage(); // Add a new page if there's more content
            }
          }
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

  public getLengthofObeservation(observation: string) {

    return observation.length!=0 || observation.trim()!="";
  }
}
