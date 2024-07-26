import {Component, OnInit} from '@angular/core';
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DatePipe, JsonPipe, NgIf} from "@angular/common";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {getToken} from "../../../main";
import {Router} from "@angular/router";
import {Journalier} from "../../Models/journalier";
import {JournalierService} from "../../Services/journalier.service";

@Component({
  selector: 'app-journalier',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    NgIf,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    DatePipe
  ],
  templateUrl: './journalier.component.html',
  styleUrl: './journalier.component.css'
})
export class JournalierComponent implements OnInit{
  journalierDialog: boolean = false;

  deletePompeDialog: boolean = false;

  deletePompesDialog: boolean = false;




  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============



  selectedJournalier: Journalier[] = [];

  private isUpdatePompe=false;
  journaliers: Journalier[]=[];
  filtereddataPompeType: any[]=[];

  dataPompe: any = [];
  journalier:Journalier=new Journalier();

  constructor( private router: Router,private messageService: MessageService,private journalierService:JournalierService) {}

  ngOnInit() {
    this.getAllJournalier()

    this.dataPompe=["SOLAR","MECHANICAL"];

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'nom', header: 'nom' },
      { field: 'quantite', header: 'quantite' },
      { field: 'reference', header: 'reference' },
      { field: 'article', header: 'article' },


    ];


  }
  getAllJournalier(){
    this.journalierService.getAllJournaliers()
      .subscribe((value) => {
        this.journaliers = value ;
      }, error => {
        console.log( error);
      });
  }
  openNew() {
    this.journalierDialog=true;

  }

  deleteSelectedPompe() {

    this.deletePompesDialog = true;

  }

  editJouenalier(journalier1: Journalier) {
    // this.isUpdatePompe=true;
    this.router.navigate([`/Daily/${journalier1.id}`]);

    console.error(new JsonPipe().transform(journalier1))
    // this.journalierDialog = true;
  }

  deleteJouenalier(journalier: Journalier) {
    this.deletePompeDialog = true;

    this.journalier = journalier;
  }

  confirmDeleteSelected() {
    this.deletePompesDialog = false;
    this.selectedJournalier.forEach(selectedJournalier => {
      this.journalierService.deleteJournalier(selectedJournalier.id).subscribe(
        () => {
          this.journaliers = this.journaliers.filter(journalier =>journalier.id !== selectedJournalier.id);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Journalier Deleted', life: 3000 });

        },
        (error) => {
          console.error('Error deleting Journalier:', error);
        }
      );
    });


  }

  confirmDelete() {
    this.deletePompeDialog = false;
    this.journaliers = this.journaliers.filter(val => val.id !== this.journalier.id);
    if (this.journalier.id!= null) {
      this.journalierService.deleteJournalier(this.journalier.id).subscribe(() => console.log("Journalier deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Journalier Deleted', life: 3000 });

  }

  hideDialog() {
    this.journalierDialog = false;
    this.submitted = false;
  }

  saveJournalier() {
    this.submitted = true;



      this.journalierService.addJournalier(this.journalier).subscribe(() => {

        this.getAllJournalier();
        this.journalierDialog=false;
      });





  }





  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }



  protected readonly getToken = getToken;
}
