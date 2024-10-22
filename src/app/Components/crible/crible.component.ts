import {Component,  Input, OnInit} from '@angular/core';
import {AutoFocusModule} from "primeng/autofocus";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {TooltipModule} from "primeng/tooltip";
import {CribleLiwell} from "../../Models/cribleLiwell";
import {CribleLiwellService} from "../../Services/cribleLiwell.service";
import Swal from "sweetalert2";
import {Sbnl} from "../../Models/sbnl";
import {getToken} from "../../../main";
import {Crible} from "../../Models/crible";
import {CribleService} from "../../Services/crible.service";
import {MultiSelectModule} from "primeng/multiselect";
import {RippleModule} from "primeng/ripple";
import {ResultCrible} from "../../Models/result-crible";
import {ResultCribleService} from "../../Services/result-crible.service";
import {TraitementStock} from "../../Models/traitement-stock";
import {Laverie} from "../../Models/laverie";
import {LaverieService} from "../../Services/laverie.service";
import {SbnlService} from "../../Services/sbnl.service";

@Component({
  selector: 'app-calibration',
  standalone: true,
  imports: [
    AutoFocusModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DatePipe,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    ListboxModule,
    NgForOf,
    NgIf,
    OverlayPanelModule,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    FormsModule,
    NgClass,
    MultiSelectModule,
    RippleModule
  ],
  templateUrl: './crible.component.html',
  styleUrl: './crible.component.css'
})
export class CribleComponent implements OnInit{
  cribleDialog: boolean = false;

  deleteClibleDialog: boolean = false;

  deleteCliblesDialog: boolean = false;

  submitted: boolean = false;
  rowsPerPageOptions = [5, 10, 20];
  // ======********============
  cribles: Crible[] = [];

  crible:Crible=new Crible();

  selectedCribles: Crible[] = [];
  cribleLiwells: CribleLiwell[] = [];
 isUpdateCrible=false;
  SelectAll: boolean = false;


  public  _selectedColumns: any[]=[];
  detailsDialog: boolean=false;
  detailsDialogSbnl: boolean=false;
  detailsDialogLaverie: boolean=false;
  public selectedCribleLiwell: CribleLiwell={};
  public resultCribleDialog: boolean=false
  resultCrible:ResultCrible=new ResultCrible();
  ListResultCribles:ResultCrible[]=[];
  selectedLaverie:Laverie=new Laverie();
  selectedSbnl:Sbnl= {};
  laveries:Laverie[]=[];
  sbnls:Sbnl[]=[];

  public dateStartResultCrible!: Date;
  public dateEndResultCrible!: Date;
  public totalResultCribleFiltree: number=0;
  deleteResultCribleDialog:boolean=false;
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  constructor( private messageService: MessageService,
               private cribleService :CribleService,
               private cribleLiwellService:CribleLiwellService,
               private resultCribleService:ResultCribleService,
               private laverieService:LaverieService,
               private sbnlService:SbnlService) {}

  ngOnInit() {
    this.getAllCribles() ;
    this.getAllLaveries();
    this.getAllSbnl();
  }

  openNew() {
    this.crible=new Crible();
    this.submitted = false;
    this.cribleDialog = true;
   this.getAllCribleLiwells()
  }

  deleteSelectedSbls() {

    this.deleteCliblesDialog = true;

  }

  editCrible(crible: Crible) {
    this.isUpdateCrible=true;
    this.crible= crible ;
    this.cribleDialog = true;
    this.getAllCribleLiwells()

  }

  deleteCrible(crible: Crible) {
    this.deleteClibleDialog = true;
    this.crible= crible ;
  }

  confirmDeleteSelected() {
    this.deleteCliblesDialog = false;
    this.selectedCribles.forEach(selectedCrible => {
      this.cribleService.deleteCrible(selectedCrible.id).subscribe(
        () => {
          this.cribles = this.cribles.filter(crible =>crible.id !== selectedCrible.id);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Crible Deleted', life: 3000 });

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
    this.deleteClibleDialog = false;
    if (this.crible.id!= null) {
      this.cribleService.deleteCrible(this.crible.id).subscribe(() => {
        this.cribles = this.cribles.filter(val => val.id !== this.crible.id);

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Crible Deleted', life: 3000 });

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
    this.cribleDialog = false;
    this.submitted = false;
  }

  saveCrible() {
    this.submitted = false;
    this.cribleDialog=false
    if(this.isUpdateCrible==true) {
      this.cribleService.updateCrible(this.crible).subscribe(() =>{
       this.getAllCribles();
      });
      console.log('crible updated');

      this.isUpdateCrible=false;
    }
    else
    {
      this.cribleService.addCrible(this.crible).subscribe(value => {
        // console.log(value);
        this.getAllCribles();

      })


    }
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAllCribles() {
    this.loading=true ;

    this.cribleService.getAllCriblesDto().subscribe((value:  Crible[]) => {
      this.cribles=value;
      this.loading=false ;

    },error => {
      console.log(error)})


  }

  loading: boolean=false;

  protected readonly getToken = getToken;


  public openDialog(crible: Crible) {
    this.detailsDialog=true;
    this.crible=crible;
  }
  public openDialogSbnl(crible: Crible) {
    this.detailsDialogSbnl=true;
    this.crible=crible;
  }
  public openDialogLaverie(crible: Crible) {
    this.detailsDialogLaverie=true;
    this.crible=crible;
  }

  public AddResultCrible(crible: Crible) {
    this.resultCribleDialog=true;
    this.crible=crible;
    this.getListResultCribles();
  }

  public saveResultCrible() {
    if ( this.crible.id!==undefined)
      this.resultCribleService.addResultCrible(this.resultCrible,this.crible.id).subscribe(value => {
        this.getListResultCribles();
        this.resultCrible=new ResultCrible();
      })
  }
  getListResultCribles(){
    if(this.crible.id!=undefined)
      this.cribleService.getCribleById(this.crible.id).subscribe(value => {
        if(value.resultCribles!=undefined){
          this.totalResultCribleFiltree=0;
          this.ListResultCribles= value.resultCribles;
        }
      } )
  }


  public updateResultCrible(resultCrible: ResultCrible) {
    this.resultCrible=resultCrible;

  }

  public saveUpdateResultCrible() {
    this.resultCribleService.updateResultCrible(this.resultCrible).subscribe(value => {
      this. getListResultCribles();

    })
  }


  public deleteResultCrible(resultCrible: ResultCrible){
    this.resultCrible=resultCrible;
    this.deleteResultCribleDialog=true;
  }
  public confirmDeleteResultCrible() {
      this.resultCribleService.deleteResultCrible(this.resultCrible.id).subscribe(value => {
        this.ListResultCribles = this.ListResultCribles.filter(res => res.id !== this.resultCrible.id);
        this.deleteResultCribleDialog=false;
      })

  }



  public getTotalQuantityCrible(crible: Crible) {
    let totalRefus:number=0;
    let totalUnwashed:number=0;
    let totalLaverie:number=0;

    let totalResultCrible:number=0;

    if(crible.resultCribles!=undefined){
      totalResultCrible= crible.resultCribles.reduce((sum, resultCrible) => sum+resultCrible.bigSalt+resultCrible.refus,0)
    }
    if(crible.cribleLiwellList!=undefined){
      crible.cribleLiwellList?.forEach(cribleLiwell => {
        if(cribleLiwell.traitementStocks!=undefined)
          totalRefus +=cribleLiwell.traitementStocks.reduce((sum, traitementStock) => sum + traitementStock.refus, 0)
      } )}
    if(crible.sbnlList!=undefined){
      crible.sbnlList?.forEach(sbnl => {
        if(sbnl.transferToCribleVertList!=undefined)
          totalRefus +=sbnl.transferToCribleVertList.reduce((sum, Transfer) => sum + Transfer.quantityTransfer, 0)
      } )}
    if(crible.laverieList!=undefined){
      crible.laverieList?.forEach(laverie => {
        if(laverie.transferLaverieToCriblesVert!=undefined)
          totalRefus +=laverie.transferLaverieToCriblesVert.reduce((sum, Transfer) => sum + Transfer.quantityTransfer, 0)
      } )}
    return (totalRefus+totalUnwashed+totalLaverie)-totalResultCrible;
  }

  public hideDialogResult() {
  this.getAllCribles();
  this.resultCribleDialog=false;
  }
  getAllCribleLiwells(){
    this.cribleLiwellService.getAllCribleLiwellsDTO().subscribe(value => this.cribleLiwells=value)
  }
  getAllLaveries(){
    this.laverieService.getAllLaveriesDto().subscribe(value => {
      this.laveries=value
    },error => {
      console.log('Error fetching Laveris:', error);

    })
  }
  getAllSbnl(){
    this.sbnlService.getAllSbnlsDTO()
      .subscribe((sbnls: Sbnl[]) => {
        this.sbnls = sbnls;
        this.loading=false ;

      }, error => {
        console.log('Error fetching sbnls:', error);
      });
  }

  public filtreListResultCribleWithDate(dateStartResultCrible: Date, dateEndResultCrible: Date) {
    this. totalResultCribleFiltree=0
    if (!this.ListResultCribles) return;

    this.ListResultCribles = this.ListResultCribles.filter(resultCrible => {

      return new Date(dateStartResultCrible)  <= new Date(resultCrible.dateCreation) && new Date(dateEndResultCrible)  >= new Date(resultCrible.dateCreation);
    });
    this.ListResultCribles.forEach(resultCrible => this.totalResultCribleFiltree+=(resultCrible.bigSalt+resultCrible.refus))

  }
}
