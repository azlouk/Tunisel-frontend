import {Component, Input, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DatePipe, JsonPipe, NgClass, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {PaginatorModule} from "primeng/paginator";
import {RippleModule} from "primeng/ripple";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Concasseur} from "../../Models/concasseur";
import {CribleLiwell} from "../../Models/cribleLiwell";
import {ResultConcasseur} from "../../Models/result-concasseur";
import {ConcasseurService} from "../../Services/concasseur.service";
import {ResultConcasseurService} from "../../Services/result-concasseur.service";
import Swal from "sweetalert2";
import {Sbnl} from "../../Models/sbnl";
import {getToken} from "../../../main";
import {Crible} from "../../Models/crible";
import {CribleService} from "../../Services/crible.service";

@Component({
  selector: 'app-concasseur',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    MultiSelectModule,
    NgIf,
    PaginatorModule,
    RippleModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    NgClass
  ],
  templateUrl: './concasseur.component.html',
  styleUrl: './concasseur.component.css'
})
export class ConcasseurComponent implements OnInit{
  concasseurDialog: boolean = false;

  deleteConcasseurDialog: boolean = false;

  deleteConcasseursDialog: boolean = false;

  submitted: boolean = false;
  rowsPerPageOptions = [5, 10, 20];
  // ======********============
  concasseurs: Concasseur[] = [];

  concasseur:Concasseur=new Concasseur();

  selectedConcasseurs: Concasseur[] = [];
  cribles: Crible[] = [];
  public isUpdateConcasseur=false;
  SelectAll: boolean = false;


  public  _selectedColumns: any[]=[];
  detailsDialog: boolean=false;
  public selectedCrible: Crible=new Crible();
  public resultConcasseurDialog: boolean=false
  resultConcasseur:ResultConcasseur=new ResultConcasseur();
  ListResultConcasseurs:ResultConcasseur[]=[];
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  constructor( private messageService: MessageService,private concasseurService :ConcasseurService,private cribleService:CribleService,
               private resultConcasseurService:ResultConcasseurService) {}

  ngOnInit() {
    this.getAllConcasseurs() ;

  }

  openNew() {
    this.concasseur=new Concasseur();
    this.submitted = false;
    this.concasseurDialog = true;
    this.  getAllCribles();

  }

  deleteSelectedSbls() {

    this.deleteConcasseursDialog = true;

  }

  editConcasseur(concasseur: Concasseur) {
    this.isUpdateConcasseur=true;
    this.concasseur= concasseur ;
    this.concasseurDialog = true;
    this.  getAllCribles();
  }

  deleteConcasseur(concasseur: Concasseur) {
    this.deleteConcasseurDialog = true;
    this.concasseur= concasseur ;
  }

  confirmDeleteSelected() {
    this.deleteConcasseursDialog = false;
    this.selectedConcasseurs.forEach(selectedConcasseur => {
      this.concasseurService.deleteConcasseur(selectedConcasseur.id).subscribe(
        () => {
          this.concasseurs = this.concasseurs.filter(concasseur =>concasseur.id !== selectedConcasseur.id);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Concasseur Deleted', life: 3000 });

        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Can not deleted",
            text: "Can not deleted",
          })
          console.error( error);
        }
      );
    });

  }

  confirmDelete() {
    this.deleteConcasseurDialog = false;
    if (this.concasseur.id!= null) {
      this.concasseurService.deleteConcasseur(this.concasseur.id).subscribe(() => {
        this.concasseurs = this.concasseurs.filter(val => val.id !== this.concasseur.id);

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Concasseur Deleted', life: 3000 });

      },error => {
        Swal.fire({
          icon: "error",
          title: "Can not deleted",
          text: "Can not deleted",
        })
        console.log(error)
      });
    }
  }

  hideDialog() {
    this.concasseurDialog = false;
    this.submitted = false;
  }

  saveConcasseur() {

    this.submitted = false;
    this.concasseurDialog=false
    if(this.isUpdateConcasseur==true) {
      this.concasseurService.updateConcasseur(this.concasseur).subscribe(() =>{
        this.getAllConcasseurs();
      });
      console.log('concasseur updated');

      this.isUpdateConcasseur=false;
    }
    else
    {
      this.concasseurService.addConcasseur(this.concasseur).subscribe(value => {
        // console.log(value);
        this.getAllConcasseurs();

      })


    }
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAllConcasseurs() {
    this.loading=true ;

    this.concasseurService.getAllConcasseurs().subscribe((value:  Concasseur[]) => {
      this.concasseurs=value;
      this.loading=false ;

    },error => {
      console.log(error)})
  }

  loading: boolean=false;


  public openDialog(concasseur: Concasseur) {
    this.detailsDialog=true;
    this.concasseur=concasseur;
  }

  public AddResultConcasseur(concasseur: Concasseur) {
    this.resultConcasseurDialog=true;
    this.concasseur=concasseur;
    this.getListResultConcasseurs();
  }

  public saveResultConcasseur() {
    if ( this.concasseur.id!==undefined)
      this.resultConcasseurService.addResultConcasseur(this.resultConcasseur,this.concasseur.id).subscribe(value => {
        this.getListResultConcasseurs();
        this.resultConcasseur=new ResultConcasseur();
      })
  }
  getListResultConcasseurs(){
    if(this.concasseur.id!=undefined)
      this.concasseurService.getConcasseurById(this.concasseur.id).subscribe(value => {
        if(value.resultConcasseurs!=undefined)
          this.ListResultConcasseurs= value.resultConcasseurs;
      } )
  }


  public updateResultConcasseur(resultConcasseur: ResultConcasseur) {
    this.resultConcasseur=resultConcasseur;

  }

  public saveUpdateResultConcasseur() {
    this.resultConcasseurService.updateResultConcasseur(this.resultConcasseur).subscribe(value => {
      this. getListResultConcasseurs();

    })
  }

  public deleteResultConcasseur(resultConcasseur: ResultConcasseur) {
    this.resultConcasseurService.deleteResultConcasseur(resultConcasseur.id).subscribe(value =>     this.ListResultConcasseurs= this.ListResultConcasseurs.filter(res => res.id !== resultConcasseur.id))

  }



  public getTotalQuantityConcasseur(concasseur: Concasseur) {
    let totalRefus:number=0;
    let totalResultConcasseur:number=0;

    if(concasseur.resultConcasseurs!=undefined){
      totalResultConcasseur= concasseur.resultConcasseurs.reduce((sum, resultConcasseur) => sum+resultConcasseur.result,0)
    }
    if(concasseur.cribleList!=undefined){
      concasseur.cribleList?.forEach(crible => {
        if(crible.resultCribles!=undefined)
          totalRefus +=crible.resultCribles.reduce((sum, resultCrible) => sum + resultCrible.refus, 0)
      } )}

    return totalRefus-totalResultConcasseur;
  }

  public hideDialogResult() {
    this.getAllConcasseurs();
    this.resultConcasseurDialog=false;
  }

  protected readonly getToken = getToken;

  getAllCribles(){
    this.cribleService.getAllCribles().subscribe(value => this.cribles=value)
  }
}
