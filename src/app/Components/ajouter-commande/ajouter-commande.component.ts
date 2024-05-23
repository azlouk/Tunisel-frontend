import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ListboxModule} from "primeng/listbox";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {MessageService, SharedModule} from "primeng/api";
import {TabViewModule} from "primeng/tabview";
import {Table, TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {TooltipModule} from "primeng/tooltip";
import {Bassin} from "../../Models/bassin";
import {ActivatedRoute, Router} from "@angular/router";
import {BassinService} from "../../Services/bassin.service";
import {TamisService} from "../../Services/tamis.service";
import {Commande} from "../../Models/commande";
import {MultiSelectModule} from "primeng/multiselect";
import {RippleModule} from "primeng/ripple";
import {CommandeService} from "../../Services/commande.service";
import {LineCommande} from "../../Models/lineCommande";
import {DropdownModule} from "primeng/dropdown";
import {LineCommandeService} from "../../Services/line-commande.service";
import {KeyFilterModule} from "primeng/keyfilter";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
import {Analyse} from "../../Models/analyse";
import {getToken} from "../../../main";

interface Column {
  id:number;
  field: string;
  header: string;
}



@Component({
  selector: 'app-ajouter-commande',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    DialogModule,
    FloatLabelModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ListboxModule,
    NgIf,
    PaginatorModule,
    SharedModule,
    TabViewModule,
    TableModule,
    ToolbarModule,
    TooltipModule,
    NgForOf,
    MultiSelectModule,
    RippleModule,
    DropdownModule,
    AutoCompleteModule,

  ],
  templateUrl: './ajouter-commande.component.html',
  styleUrl: './ajouter-commande.component.css'
})
export class AjouterCommandeComponent implements OnInit{
  bassins: Bassin[] = [];
  selectedBassin: Bassin = {};

  commande: Commande={} ;

  private commandeId: any;
  public isUpdateCommande=false;
  visibleDetails: boolean=false;

  // ======================
  visibale:boolean=false;

  isUpdateTamis:boolean=false ;

  // =====================

  cols!: Column[];

  selectedColumns!: Column[];
  listeLignesCommandes:LineCommande[]=[];

  listcalibre:Column[]=[];
  selectedColumnsCalibre!: Column;
  lineCommande!:LineCommande;
  deleteLineCommandeDialog:boolean=false ;

  TotalHarv: number=0;
  TotalProd: number=0;
  TotalTrQu: number=0;
  DatefiltrageStart: any;
  DatefiltrageEnd: any;
  private datasel: string[]=[];
  filtereddatasel: any[]=[];
  matter: any;
  constructor(private router: Router,
              private bassinService :BassinService,
              private tamisService:TamisService ,
              private route: ActivatedRoute,
               private commandeService:CommandeService,
              private messageService: MessageService,
              private lineCommandeService: LineCommandeService
  )
  {}



  ngOnInit(): void {
    // =============================================
    this.datasel = [
      "Unwashed salt",
      "Washed salt",
      "Washed salt sieved 0-4 "
      , "Washed salt sieved "
      , "Big salt (Refus)"
      , "salt 0-8"
      , "salt 0-4 Stock"
      , "salt 0-6 Stock"
      , "salt 0-8 Stock"
      , "Big salt Stock"
      , "crushed salt"
      , "salt 0-6 Cribble "
      , "salt 0-8 Cribble "
      , "salt 0-4 Stock Zarzis"
      , "salt 0-6 Stock Zarzis"
      , "salt 0-8 Stock Zarzis"
      , " Sel Navire"

    ]
    this.cols = [

      {id:0, field: 'dateAnalyse', header: 'Prelevelment date' },
      {id:1, field: 'reference', header: 'Reference' },
      {id:2,field: 'matiere', header: 'Matter' },
      {id:3, field: 'description', header: 'Description' },
      {id:4, field: 'temperature', header: 'Temperature' },
      {id:5, field: 'vent', header: 'wind' },
      {id:6, field: 'densite', header: 'Densite' },
      {id:7, field: 'matiereEnSuspension', header: 'Suspended matter'},
      {id:8, field: 'salinite', header: 'Salinite'},
      {id:9, field: 'calcium', header: 'Calcium'},
      {id:10, field: 'magnesium', header: 'Magnesium'},
      {id:11, field: 'sulfate', header: 'sulfate'},
      {id:12, field: 'humidite', header: 'Humidite'},
      {id:13, field: 'matiereInsoluble', header: 'Insoluble matter'},
      {id:14, field: 'potassium', header: 'Potassium'},
      {id:15, field: 'sodium', header: 'Sodium'},
      {id:16, field: 'chlorure', header: 'Chorure'},
      {id:17, field: 'ph', header: 'Ph'},
      {id:18, field: 'chlorureDeSodium', header: 'Chlorure de Sodium'},
      {id:19, field: 'ferrocyanure', header: 'Ferrocyanure'},
      {id:20, field: 'conformite', header: 'Conformite'},
      {id:21, field: 'qualite', header: 'Quality'},
      {id:22, field: 'calibre', header: 'Calibre'},
      {id:23, field: 'masse', header: 'Weight'},
      {id:24, field: 'refus', header: 'Refusal '},
      {id:25, field: 'refusCumulated', header: 'Refusal Cumulateds '},
      {id:26, field: 'passCumulated', header: 'Cumulated Pass'},
      {id:27, field: 'quantityRecolte', header: 'Harvest'},
      {id:28, field: 'quantityProduction', header: 'Production'},
      {id:29, field: 'quantityPluieBengarden', header: 'Ben Gardane Rain'},
      {id:30, field: 'quantityPluieZarzis', header: 'Zarzis Rain'},
      {id:31, field: 'quantiteTransfert', header: 'Transfer Quantity'},
      {id:32, field: 'decisionTransfert', header: 'Transfer Decision'},
      {id:33, field: 'numeroLot', header: 'Number Lot'},
      {id:34, field: 'poidsLot', header: 'Lot Weight'},
      {id:35, field: 'emplassementLot', header: 'Lot Location'},
      {id:36, field: 'lieuxPrelevement', header: 'Places Prelevement'},
      {id:37, field: 'matCamion', header: 'Truck Mat'},
      {id:38, field: 'conformite', header: 'Conformite'},

    ];

    this.selectedColumns = this.cols;
    // =============================================

    this.isUpdateTamis=false ;
    this.commandeId = this.route.snapshot.paramMap.get('id');
    this.isUpdateCommande=this.commandeId!==null


    if (this.commandeId) {
      this.getCommandeById();
    }


    this.bassinService.getAllBassins()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;
      }, error => {
        console.log('Error fetching Bassins:', error);
      });
  }

  retour() {
    this.router.navigate(['/commande']);
  }
getCommandeById(){
  this.commandeService.getCommandeById(this.commandeId).subscribe(value => {
    this.commande = value;
    this.listeLignesCommandes = value.ligneCommandes ?? [];
    // console.log(new JsonPipe().transform(this.commande))
  });
}
  saveCommande() {
    this.commande.ligneCommandes=[];
    this.commande.ligneCommandes=this.listeLignesCommandes;
    if(this.isUpdateCommande){

      this.commandeService.updateCommande(this.commande).subscribe(value => this.router.navigate(['/commande']))
    }
    else{

        this.commandeService.addCommande(this.commande).subscribe(value => {
          this.router.navigate(['/commande']);
        },error => console.log(error));
      }

  }

  openNew() {
    this.visibleDetails=true;
  }

  hideDialog() {
    this.visibale=false;
  }

  onGlobalFilter(dt: Table, $event: Event) {

  }


  getCalibre() {

    this.tamisService.getDistinctCalibres().subscribe(value => {
      value.forEach((value1: number) => {
        if(this.listcalibre.length<value.length){
        this.listcalibre.push({ id: value1, field: '', header: value1.toString() });}

      });
    });
  }

  getLine() {

    if(this.commande.bassin!==null){

      // const id :number =this.selectedBassin.id!==undefined?this.selectedBassin.id:-1;
      const id :number =this.commande.bassin&&this.commande.bassin.id!==undefined?this.commande.bassin.id:-1;

        if(id!==-1){
          this.commandeService.getLignesCommandes(id).subscribe(value => {
            this.listeLignesCommandes = value;
            console.log('size  : ' + this.listeLignesCommandes.length);
              this.getCalibre();
          },error =>{
            console.log(error);
            console.log('error size  : ' + this.listeLignesCommandes.length);});
        }
  }}


  getValueOfligneCommande(col: any, ligneCommande: any): any {
    if (col.id < 20) {
      if(col.id==0)
        return ligneCommande.analyseChimique!==null ? this.pipedate(ligneCommande.analyseChimique[col.field]) : '-'
      return ligneCommande.analyseChimique!==null ? ligneCommande.analyseChimique[col.field] : '-';
    } else if (col.id > 19 && col.id < 22) {
      return ligneCommande.analysePhysique!==null  ? ligneCommande.analysePhysique[col.field] : '-';
    }

    //************************************
    else if (col.id > 21 && col.id < 27 && this.selectedColumnsCalibre && this.selectedColumnsCalibre.header) {
      if (ligneCommande.analysePhysique !== null && ligneCommande.analysePhysique.tamisList) {
        // Use filter to find matching items in tamisList and add checks for undefined items
        const filteredTamis:any = ligneCommande.analysePhysique.tamisList.find((tamis: any) =>
           tamis && tamis.calibre == this.selectedColumnsCalibre.header
        );
        // Check if filteredTamisList is not empty and return it, otherwise return '-'
        return filteredTamis!==undefined? filteredTamis[col.field]  : '-';
      } else {
        return '-';
      }
    }
    //************************************

    else {
      return ligneCommande!==null  ? ligneCommande[col.field] : '-';
    }


  }

  changeCalibre() {
    if (this.selectedColumnsCalibre) {
      alert(`Selected Calibre: ${this.selectedColumnsCalibre.header}`);
    } else {
      alert('No Calibre selected');
    }
  }

  deleteLineCommande(lineCommande: LineCommande) {
    this.deleteLineCommandeDialog = true;
    this.lineCommande = {...lineCommande};
  }
  confirmDelete() {
    this.deleteLineCommandeDialog = false;


      if(this.lineCommande.analysePhysique!==null){
        this.listeLignesCommandes = this.listeLignesCommandes.filter(val => val.analysePhysique?.reference !== this.lineCommande.analysePhysique?.reference);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Line Commande Deleted', life: 3000});

      }
      else if(this.lineCommande.analyseChimique!==null){
        this.listeLignesCommandes = this.listeLignesCommandes.filter(val => val.analyseChimique?.reference !== this.lineCommande.analyseChimique?.reference);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Line Commande Deleted', life: 3000});



    }
    this.CalculeTotal()
  }

  onRowEditInit(lineCommande: any) {

  }

  onRowEditSave(lineCommande: any) {

  }

  getAllLinesCommandes() {

  }

  CalculeTotal() {
    this.TotalHarv=0;
    this.TotalTrQu=0;
    this.TotalProd=0;
    this.listeLignesCommandes.forEach(value => {
      if(value.quantityRecolte)
      this.TotalHarv+=parseFloat(value.quantityRecolte+'');
      if(value.quantityProduction)
        this.TotalProd+=parseFloat(value.quantityProduction+'')
      if(value.quantiteTransfert)
        this.TotalTrQu+=parseFloat(value.quantiteTransfert+'');

    })
  }
  searchAnalyse(l: LineCommande):boolean {

    if(l.analyseChimique){
      return this.AfterTodate(new Date(this.DatefiltrageStart+""),new Date(l.analyseChimique.dateAnalyse+"")) &&  this.AfterTodate(new Date(l.analyseChimique.dateAnalyse+""),new Date(this.DatefiltrageEnd+""))
    } else if(l.analysePhysique){
      return this.AfterTodate(new Date(this.DatefiltrageStart+""),new Date(l.analysePhysique.dateAnalyse+"")) &&  this.AfterTodate(new Date(l.analysePhysique.dateAnalyse+""),new Date(this.DatefiltrageEnd+""))
    }
    return false;
  }
  filtredate() {


    //this.Viderfiltredate()
    const data=this.listeLignesCommandes.filter(l => this.searchAnalyse(l)==true );

    this.listeLignesCommandes=[...data]


  }

  Viderfiltredate() {
this.getLine()
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.datasel as any[]).length; i++) {
      let country = (this.datasel as any[])[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filtereddatasel = filtered;
  }

  AfterTodate(date1:Date , date2:Date):boolean{
    console.log(date1+"<"+date2)
    return date1.getTime()<=date2.getTime()
  }
    pipedate(analyseChimiqueElement: any) {
     const date:Date=new Date(analyseChimiqueElement+"");
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;

  }
    chechMatter(l: LineCommande):boolean {
   if(l.analysePhysique)
    return  l.analysePhysique.qualite?.indexOf(this.matter)!==-1;

  return  false ;
  }
  filterMatter() {


    const data = this.listeLignesCommandes.filter(l => this.chechMatter(l)==true);
   this.listeLignesCommandes=[...data];
  }

  protected readonly getToken = getToken;
}
