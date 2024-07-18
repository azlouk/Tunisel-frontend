import {Component, OnInit} from '@angular/core';
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {NgClass, NgIf} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {getToken} from "../../../main";
import {PompeService} from "../../Services/pompe.service";
import {Pompe} from "../../Models/pompe";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputNumberModule} from "primeng/inputnumber";

@Component({
  selector: 'app-pompe',
  standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        FormsModule,
        InputTextModule,
        ListboxModule,
        NgIf,
        SharedModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        NgClass,
        AutoCompleteModule,
        FloatLabelModule,
        InputNumberModule
    ],
  templateUrl: './pompe.component.html',
  styleUrl: './pompe.component.css'
})
export class PompeComponent implements OnInit{
  pompeDialog: boolean = false;

  deletePompeDialog: boolean = false;

  deletePompesDialog: boolean = false;




  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============


  pompe:Pompe=new Pompe();
  selectedPompe: Pompe[] = [];

  private isUpdatePompe=false;
  pompes: Pompe[]=[];
   filtereddataPompeType: any[]=[];

  dataPompe: any = [];


  constructor( private messageService: MessageService,private pompeService:PompeService) {}

  ngOnInit() {
this.getAllPompes();

    this.dataPompe=["SOLAR","MECHANICAL"];

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'nom', header: 'nom' },
      { field: 'quantite', header: 'quantite' },
      { field: 'reference', header: 'reference' },
      { field: 'article', header: 'article' },


    ];


  }
getAllPompes(){
  this.pompeService.getAllPompes()
    .subscribe((listPopmes:Pompe[]) => {
      this.pompes = listPopmes;
    }, error => {
      console.log( error);
    });
}
  openNew() {
    this.pompe=new Pompe();
    this.submitted = false;
    this.pompeDialog = true;
  }

  deleteSelectedPompe() {

    this.deletePompesDialog = true;

  }

  editPompe(pompe: Pompe) {
    this.isUpdatePompe=true;


    this.pompe = pompe;
    this.pompeDialog = true;
  }

  deletePompe(pompe: Pompe) {
    this.deletePompeDialog = true;

    this.pompe = pompe;
  }

  confirmDeleteSelected() {
    this.deletePompesDialog = false;
    this.selectedPompe.forEach(selectedPompe => {
      this.pompeService.deletePompe(selectedPompe.id).subscribe(
        () => {
          this.pompes = this.pompes.filter(pompe =>pompe.id !== selectedPompe.id);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pompe Deleted', life: 3000 });

        },
        (error) => {
          console.error('Error deleting Pompe:', error);
        }
      );
    });


  }

  confirmDelete() {
    this.deletePompeDialog = false;
    this.pompes = this.pompes.filter(val => val.id !== this.pompe.id);
    if (this.pompe.id!= null) {
      this.pompeService.deletePompe(this.pompe.id).subscribe(() => console.log("Pompe deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pompe Deleted', life: 3000 });

  }

  hideDialog() {
    this.pompeDialog = false;
    this.submitted = false;
  }

  savePompe() {
    this.submitted = true;

      this.pompeDialog=false;
      if(this.isUpdatePompe==true) {
        this.pompeService.updatePompe(this.pompe).subscribe(() =>{
         this.getAllPompes()
        });
        this.isUpdatePompe=false;


      }
      else
      {

        this.pompeService.addPompe(this.pompe).subscribe(() => {

          this.getAllPompes()
        });

      }



  }





  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  filterPompe(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];

    let query = event.query;

    for (let i = 0; i < (this.dataPompe as any[]).length; i++) {
      let country = (this.dataPompe as any[])[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filtereddataPompeType = filtered;
  }

  protected readonly getToken = getToken;

}
