import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ListboxModule} from "primeng/listbox";
import {DatePipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {MessageService, SharedModule, SortEvent} from "primeng/api";
import {TabViewModule} from "primeng/tabview";
import {SortableColumn, Table, TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {TooltipModule} from "primeng/tooltip";
import {Bassin} from "../../Models/bassin";
import {ActivatedRoute, Router} from "@angular/router";
import {BassinService} from "../../Services/bassin.service";
import {TamisService} from "../../Services/tamis.service";
import {Commande} from "../../Models/commande";
import {MultiSelectModule, MultiSelectRemoveEvent} from "primeng/multiselect";
import {RippleModule} from "primeng/ripple";
import {CommandeService} from "../../Services/commande.service";
import {LineCommande} from "../../Models/lineCommande";
import {DropdownModule} from "primeng/dropdown";
import {LineCommandeService} from "../../Services/line-commande.service";
 import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
 import {getToken} from "../../../main";
import * as XLSX from 'xlsx';
import {utils, WorkBook, WorkSheet, writeFile} from "xlsx";
import {FieldsetModule} from "primeng/fieldset";
import {AutoFocusModule} from "primeng/autofocus";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {Sbnl} from "../../Models/sbnl";
import {Bande} from "../../Models/bande";
import {Sbl} from "../../Models/sbl";
import {Sblf} from "../../Models/sblf";
import {SbnlService} from "../../Services/sbnl.service";
import {SblService} from "../../Services/sbl.service";
import {SblfService} from "../../Services/sblf.service";
import {BandeService} from "../../Services/bande.service";
import autoTable from "jspdf-autotable";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ProgressBarModule} from "primeng/progressbar";
import Swal from "sweetalert2";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {BadgeModule} from "primeng/badge";




export interface Column {
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
    FieldsetModule,
    AutoFocusModule,
    AutoCompleteModule,
    OverlayPanelModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    BadgeModule,

  ],
  templateUrl: './ajouter-commande.component.html',
  styleUrl: './ajouter-commande.component.css'
})
export class AjouterCommandeComponent implements OnInit{
  bassins: Bassin[] = [];
  sbnls: Sbnl[] = [];
  bandes: Bande[] = [];
  sbls: Sbl[] = [];
  sblfs: Sblf[] = [];


  commande: Commande={} ;

  private commandeId: any;
  public isUpdateCommande=false;
  visibleDetails: boolean=false;

  // ======================
  visibale:boolean=false;

  isUpdateTamis:boolean=false ;

  // =====================

  cols!: Column[];

  selectedColumns: Column[]=[];
  listeLignesCommandes:LineCommande[]=[];
  listeLignesCommandesCopy:LineCommande[]=[];

  listcalibre:Column[]=[];
  selectedColumnsCalibre!: any;
  lineCommande!:LineCommande;
  deleteLineCommandeDialog:boolean=false ;

  TotalHarv: number=0;
  TotalProd: number=0;
  TotalTrQu: number=0;

  moyennes: { humidite: number, magnesium: number, sulfate: number, chlorureDeSodium: number, matiereInsoluble: number, ferrocyanure: number } | undefined;




  private datasel: string[]=[];
  filtereddatasel: any[]=[];
  matter: any="Unwashed salt";
  first = 0;

  rows = 10;
  constructor(private router: Router,
              private bassinService :BassinService,
              private tamisService:TamisService ,
              private route: ActivatedRoute,
               private commandeService:CommandeService,
              private messageService: MessageService,
              private lineCommandeService: LineCommandeService,
              private datePipe: DatePipe,
              private sbnlService :SbnlService,
              private sblService :SblService,
              private sblfService :SblfService,
              private bandeService:BandeService,
  )
  {}



  ngOnInit(): void {
    // =============================================
    this.datasel = [
      "GC RS DK",
      "GC RS NO",

    ]
    this.cols = [

      {id:0, field: 'dateAnalyse', header: 'Prelevelment date Analyse' },
      {id:1, field: 'reference', header: 'Reference' },
      {id:2,field: 'matiere', header: 'Matter' },
      {id:3, field: 'description', header: 'Description' },
      {id:4, field: 'temperature', header: 'Temperature' },
      {id:5, field: 'vent', header: 'wind' },
      {id:6, field: 'densite', header: 'density' },
      {id:7, field: 'matiereEnSuspension', header: 'Suspended matter'},
      {id:8, field: 'salinite', header: 'salinity'},
      {id:9, field: 'calcium', header: 'Calcium'},
      {id:10, field: 'magnesium', header: 'Magnesium'},
      {id:11, field: 'sulfate', header: 'sulphate'},
      {id:12, field: 'humidite', header: 'humidity'},
      {id:13, field: 'matiereInsoluble', header: 'Insoluble matter'},
      {id:14, field: 'potassium', header: 'Potassium'},
      {id:15, field: 'sodium', header: 'Sodium'},
      {id:16, field: 'chlorure', header: 'Chloride '},
      {id:17, field: 'ph', header: 'Ph'},
      {id:18, field: 'chlorureDeSodium', header: 'sodium chloride'},
      {id:19, field: 'ferrocyanure', header: 'ferrocyanide'},
      {id:20, field: 'pluie', header: 'Chemical Rain '},
      {id:21, field: 'conformite', header: 'Conformite'},
      {id:22, field: 'qualite', header: 'Quality'},
      {id:23, field: 'pluie', header: 'Physical Rain '},
      {id:24, field: 'calibre', header: 'Calibre'},
      {id:25, field: 'masse', header: 'Weight'},
      {id:26, field: 'refus', header: 'Refusal '},
      {id:27, field: 'refusCumulated', header: 'Refusal Cumulateds '},
      {id:28, field: 'passCumulated', header: 'Cumulated Pass'},
      {id:29, field: 'dateCreation', header: 'Date Creation'},
      {id:30, field: 'quantityRecolte', header: 'Harvest'},
      {id:31, field: 'quantityProduction', header: 'Production'},
      {id:32, field: 'quantityPluieBengarden', header: 'Ben Gardane Rain'},
      {id:33, field: 'quantityPluieZarzis', header: 'Zarzis Rain'},
      {id:34, field: 'quantiteTransfert', header: 'Transfer Quantity'},
      {id:35, field: 'decisionTransfert', header: 'Transfer Decision'},
      {id:36, field: 'numeroLot', header: 'Number Lot'},
      {id:37, field: 'poidsLot', header: 'Lot Weight'},
      {id:38, field: 'emplassementLot', header: 'Lot Location'},
      {id:39, field: 'lieuxPrelevement', header: 'Places Prelevement'},
      {id:40, field: 'matCamion', header: 'Truck Mat'},
      {id:41, field: 'conformite', header: 'Compliance'},
      {id:42, field: 'related', header: 'Related'},

    ];



    // =============================================

    this.isUpdateTamis=false ;
    this.commandeId = this.route.snapshot.paramMap.get('id');
    this.isUpdateCommande=this.commandeId!==null


    if (this.commandeId) {
      this.getCommandeById();
    }


    this.bassinService.getAllBassinsDTO()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;
      }, error => {
        console.log('Error fetching Bassins:', error);
      });
    this.sbnlService.getAllSbnlsDTO().subscribe((v:  Sbnl[]) => {
      this.sbnls=v;

    },error => {
      console.log(error)});

    this.bandeService.getAllBandesDTO().subscribe((v:  Bande[]) => {
      this.bandes=v;

    },error => {
      console.log(error)})

    this.sblService.getAllSblDTO().subscribe((v:  Sbl[]) => {
      this.sbls=v;
    },error => {
      console.log(error)})

    this.sblfService.getAllSblfsDTO().subscribe((v:  Sblf[]) => {
      this.sblfs=v;

    },error => {
      console.log(error)})
  }

  retour() {
    this.router.navigate(['/commande']);
  }
getCommandeById(){
  this.loadingcommande=true;
  this.commandeService.getCommandeById(this.commandeId).subscribe(value => {
    this.commande = value;

        this.selectedColumns=this.commande.dataHeaders || []
        this.listeLignesCommandes = value.ligneCommandes??[];
        this.DatefiltrageStart=this.commande.datestart!==undefined?this.commande.datestart+'' :new Date().toDateString() ;
        this.DatefiltrageEnd=this.commande.dateend!==undefined?this.commande.dateend+'' :new Date().toDateString() ;
         this.matter=this.commande.quality!==undefined?this.commande.quality :"no quality selected" ;
        this.CalculeTotalInput();
      this.getCalibre() ;
      this.calculerMoyennes();
    this.loadingcommande=false ;
    // console.log(new JsonPipe().transform(this.commande))
  });
}
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  saveCommande() {
    this.loadinSave=true;
    //Fix date Save -1 day primeng
        const datestr=this.commande.dateCommande?.toString()
       const dates: string | null =this.datePipe.transform(datestr,'yyyy-MM-dd')
   //Date creation  of command
    if (dates) {
      this.commande.dateCommande = new Date(dates);
    }
    //date Start of command
    const dateStart=this.DatefiltrageStart?.toString()
    const dateStarts: string | null =this.datePipe.transform(dateStart,'yyyy-MM-dd')
    if(dateStarts){
      this.commande.datestart = new Date(dateStarts);
    }

    //date end of command
    const dateEnd=this.DatefiltrageEnd?.toString()
    const dateEnds: string | null =this.datePipe.transform(dateEnd,'yyyy-MM-dd')
    if(dateEnds){
      this.commande.dateend = new Date(dateEnds);
    }

    this.commande.quality=this.matter;
  this.commande.calibre=this.selectedColumnsCalibre!==undefined?this.selectedColumnsCalibre.header:'no calibre selected'
    this.commande.ligneCommandes=[];
    this.commande.ligneCommandes=this.listeLignesCommandes;
    this.commande.dataHeaders= this.selectedColumns

    this.commande.ligneCommandes.forEach(value => {
      if(value.id && value.id<=0){
        value.id=undefined ;
      }
    })

   // console.log(new JsonPipe().transform( this.commande))

    if(this.isUpdateCommande){

      this.commandeService.updateCommande(this.commande).subscribe(value => {
       this.loadinSave=false;
        this.router.navigate(['/commande'])
      })
    }
    else{

        this.commandeService.addCommande(this.commande).subscribe(value => {
          this.loadinSave=false;

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

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  getCalibre() {

    this.tamisService.getDistinctCalibres().subscribe(value => {
      value.forEach((value1: number) => {
        if(this.listcalibre.length<value.length){
        this.listcalibre.push({ id: value1, field: '', header: value1.toString() });}
           if(this.isUpdateCommande){
             if(value1.toString()==this.commande.calibre){
               this.selectedColumnsCalibre={ id: value1, field: '', header: value1.toString() }

             }
           }
      });

     });
  }
    getRef(value: LineCommande) {
    return value.analysePhysique!==null?value.analysePhysique.reference:value.analyseChimique!==null?value.analyseChimique.reference:value.id+"";
  }
  getLine() {


      this.listeLignesCommandes=[...this.commande.ligneCommandes!==undefined?this.commande.ligneCommandes:[]]

    this.listeLignesCommandesCopy=[...this.listeLignesCommandes]
    this.listeLignesCommandes=[]
this.getLineBassin();
this.getLinesbln();
this.getLineBande();
this.getLinesbl() ;
this.getLinesblf() ;


 }



 getLineBassin(){
   if(this.commande.bassins) {
     this.commande.bassins.forEach(basin => {
       console.log("Nom bassin = " + basin.nom)
       if (basin.id) {
         this.loadingcommande = true;
         console.log('data Lignes  ==> ' + new JsonPipe().transform(this.listeLignesCommandes))

         this.commandeService.getLignesCommandesBassin(basin.id).subscribe(LinesCommandes => {

           LinesCommandes.forEach(value => {
             const data= this.listeLignesCommandesCopy.find(value1 => this.getRef(value)==this.getRef(value1))
             console.error(data)
             if(data){
               this.listeLignesCommandes.push({...data})
             }else {
               this.listeLignesCommandes.push({...value})

             }
           })


           this.loadingcommande = false;
           this.getCalibre();
           this.calculerMoyennes();
         }, error => {
           console.log(error);
           ;
         });
       }
     })

   }
 }
 getLinesbln(){

    if(this.commande.sbnls){
     this.commande.sbnls.forEach(sbnl => {
       if(sbnl.id){
         this.loadingcommande=true;
         this.commandeService.getLignesCommandesSbnl(sbnl.id).subscribe(LinesCommandes => {
           LinesCommandes.forEach(value => {
             const data= this.listeLignesCommandesCopy.find(value1 => this.getRef(value)==this.getRef(value1))
             console.error(data)
             if(data){
               this.listeLignesCommandes.push({...data})
             }else {
               this.listeLignesCommandes.push({...value})

             }
           })
           // console.log('size  : ' + this.listeLignesCommandes.length);
           this.getCalibre();
           this.calculerMoyennes();
           this.loadingcommande=false;
         },error =>{
           console.log(error);
           //   console.log('error size  : ' + this.listeLignesCommandes.length);
         });
       }

     })

   }
 }

 getLineBande(){

    if(this.commande.bandes){
     this.commande.bandes.forEach(bande => {
       if(bande.id){
         this.loadingcommande=true;
         this.commandeService.getLignesCommandesBande(bande.id).subscribe(LinesCommandes => {
           LinesCommandes.forEach(value => {
             const data= this.listeLignesCommandesCopy.find(value1 => this.getRef(value)==this.getRef(value1))
             console.error(data)
             if(data){
               this.listeLignesCommandes.push({...data})
             }else {
               this.listeLignesCommandes.push({...value})

             }
           })
           this.getCalibre();
           this.calculerMoyennes();
           this.loadingcommande=false;
         },error =>{
           console.log(error);
           // console.log('error size  : ' + this.listeLignesCommandes.length);
         });
       }

     })


   }
 }

 getLinesbl(){

    if(this.commande.sbls){
     this.commande.sbls.forEach(sbl => {
       if(sbl.id){
         this.loadingcommande=true;
         this.commandeService.getLignesCommandesSbl(sbl.id).subscribe(LinesCommandes => {
           LinesCommandes.forEach(value => {
             const data= this.listeLignesCommandesCopy.find(value1 => this.getRef(value)==this.getRef(value1))
             console.error(data)
             if(data){
               this.listeLignesCommandes.push({...data})
             }else {
               this.listeLignesCommandes.push({...value})

             }
           })

           this.getCalibre();
           this.calculerMoyennes();
           this.loadingcommande=false;

         },error =>{
           console.log(error);});
       }

     })

   }
 }
 getLinesblf(){

    if(this.commande.sblfs){
     this.commande.sblfs.forEach(sblf => {
       if(sblf.id){
         this.loadingcommande=true;
         this.commandeService.getLignesCommandesSblf(sblf.id).subscribe(LinesCommandes => {
           LinesCommandes.forEach(value => {
             const data= this.listeLignesCommandesCopy.find(value1 => this.getRef(value)==this.getRef(value1))
              if(data){
               this.listeLignesCommandes.push({...data})
             }else {
               this.listeLignesCommandes.push({...value})

             }
           })

           //  console.log('size  : ' + this.listeLignesCommandes.length);
           this.getCalibre();
           this.calculerMoyennes();
           this.loadingcommande=false;
         },error =>{
           console.log(error);
           // console.log('error size  : ' + this.listeLignesCommandes.length);
         });
       }

     })

   }
 }

  getValueOfligneCommande(col: any, ligneCommande: any): any {

    if (col.id < 21) {
            if(col.id==0) {
              return ligneCommande?.analyseChimique !== null ? this.pipedate(ligneCommande?.analyseChimique[col.field]) :
                ligneCommande?.analysePhysique !== null && ligneCommande?.analysePhysique !== undefined ? this.pipedate(ligneCommande?.analysePhysique[col.field]) : '-';

            }
              if(ligneCommande.analyseChimique==null && ligneCommande.analysePhysique!==null && col.field=="reference"){
                return  ligneCommande.analysePhysique[col.field]
              }
             return ligneCommande.analyseChimique!==null ? ligneCommande.analyseChimique[col.field] :"-" ;
    }
    else
      if (col.id > 20 && col.id < 24)
    {
         if(col.id==22){
           return ligneCommande?.analysePhysique?.qualite !== null ? ligneCommande?.analysePhysique?.qualite :
             ligneCommande?.analyseChimique?.qualite !== null ? ligneCommande?.analyseChimique?.qualite : '-';


         }
          return ligneCommande.analysePhysique!==null  ? ligneCommande.analysePhysique[col.field] : '-';
    } else
      if (col.id > 23 && col.id < 29 && this.selectedColumnsCalibre && this.selectedColumnsCalibre.header) {
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

        else if(col.id==42){
        // return ligneCommande.analysePhysique!==null  ? ligneCommande.analysePhysique[col.field] : '-';
        return ligneCommande.related!==null  ? this.getRelatedAnalyse(ligneCommande) : '-';

      }
    else {
      // ligneCommande.dateCreation=new Date();

      return ligneCommande!==null  ? ligneCommande[col.field] : '-';
    }


  }



  deleteLineCommande(lineCommande: LineCommande) {
    this.deleteLineCommandeDialog = true;
    this.lineCommande = {...lineCommande};
  }
  confirmDelete(lineCommande: LineCommande) {
    this.deleteLineCommandeDialog = false;

   this.listeLignesCommandes = this.listeLignesCommandes.filter(val => val.id !==lineCommande.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Line Commande Deleted', life: 3000});

    this.CalculeTotalInput()
  }

  onRowEditInit(lineCommande: any) {

  }

  onRowEditSave(lineCommande: any) {

  }

  getAllLinesCommandes() {

  }

  CalculeTotal(l:LineCommande) {


      if(l.quantityRecolte)
      this.TotalHarv+=parseFloat(l.quantityRecolte+'');
      if(l.quantityProduction)
        this.TotalProd+=parseFloat(l.quantityProduction+'')
      if(l.quantiteTransfert)
        this.TotalTrQu+=parseFloat(l.quantiteTransfert+'');


  }
  CalculeTotalDelet(l:LineCommande) {


      if(l.quantityRecolte)
      this.TotalHarv-=parseFloat(l.quantityRecolte+'');
      if(l.quantityProduction)
        this.TotalProd-=parseFloat(l.quantityProduction+'')
      if(l.quantiteTransfert)
        this.TotalTrQu-=parseFloat(l.quantiteTransfert+'');


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
    const data=this.listeLignesCommandes.filter(l => this.searchAnalyse(l)==true && (this.chechMatterChemical(l)==true || this.chechMatterPhysical(l)==true) );

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
    // console.log(date1+"<"+date2)
    return date1.getTime()<=date2.getTime()
  }
    pipedate(analyseChimiqueElement: any) {
     const date:Date=new Date(analyseChimiqueElement+"");
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;

  }
  chechMatterPhysical(l: LineCommande):boolean {
   if(l.analysePhysique)
    // return  l.analysePhysique.qualite!.includes(this.matter).valueOf();
    return  l.analysePhysique.qualite?.trim().toLowerCase()==this.matter.trim().toLowerCase();

  return  false ;
  }
  chechMatterChemical(l: LineCommande):boolean {
   if(l.analyseChimique)
    // return  l.analysePhysique.qualite!.includes(this.matter).valueOf();
    return  l.analyseChimique.qualite?.trim().toLowerCase()==this.matter.trim().toLowerCase();

  return  false ;
  }
  filterMatter() {


    const data = this.listeLignesCommandes.filter(l => (this.chechMatterPhysical(l)==true || this.chechMatterChemical(l)==true) );
   this.listeLignesCommandes=data;
  }

  protected readonly getToken = getToken;

  AddLineCommand() {
  const lineCommande:LineCommande={analysePhysique:null,analyseChimique:null}
    lineCommande.id=-1*(new  Date().getTime());
    // lineCommande.analyseChimique?.dateAnalyse!==undefined? lineCommande.analyseChimique.dateAnalyse.toString():new Date();

    this.listeLignesCommandes.unshift(lineCommande);
    // console.log('===========>>>>>>: '+new JsonPipe().transform(this.listeLignesCommandes))
  }

  CalculeTotalInput() {
    this.TotalHarv=0;
    this.TotalTrQu=0;
    this.TotalProd=0 ;
    this.listeLignesCommandes.forEach(l =>{

      if(l.quantityRecolte)
        this.TotalHarv+=parseFloat(l.quantityRecolte+'');
      if(l.quantityProduction)
        this.TotalProd+=parseFloat(l.quantityProduction+'')
      if(l.quantiteTransfert)
        this.TotalTrQu+=parseFloat(l.quantiteTransfert+'');

    } )
  }



  ExportExcel() {
    if(this.commande.ligneCommandes) { // ====================================================================
      const headings = [['Command Date', 'Name', 'State']];
      const headingsBassin = [['Reference', '', 'Description', '', 'Name', '', 'Location', '', 'State', '', 'Creation Date']];

      const wb: WorkBook = utils.book_new();
      const ws: WorkSheet = utils.json_to_sheet([]);

      // Ajouter les en-têtes de colonne pour les commandes
      utils.sheet_add_aoa(ws, headings, {origin: 'A2'});

      // Préparer les données des commandes
      const commandData = [
        [this.commande.dateCommande, this.commande.nom, this.commande.etat]
      ];

      // Ajouter les données de commandes à la feuille
      utils.sheet_add_json(ws, commandData, {origin: 'A3', skipHeader: true});

      // Ajouter les en-têtes de colonne pour les bassins
      utils.sheet_add_aoa(ws, headingsBassin, {origin: 'A5'});

    // Préparer les données des bassins
    // if (this.commande.bassin) {
    //   const bassinData = [
    //     [this.commande.bassin.reference, '', this.commande.bassin.description, '', this.commande.bassin.nom, '', this.commande.bassin.emplacement, '', this.commande.bassin.etat, '', this.commande.bassin.dateCreation]
    //   ];
    //
    //   // Ajouter les données de bassins à la feuille
    //   utils.sheet_add_json(ws, bassinData, { origin: 'A6', skipHeader: true });
    // }

      // ====================================================================
      // Ajouter les données du tableau HTML
      const element = document.getElementById('EXCEL');
      if (element) {
        const wst: WorkSheet = utils.table_to_sheet(element);
        const tableData: any[][] = utils.sheet_to_json(wst, {header: 1}) as any[][];

        // Déterminer l'index de la colonne contenant 'Prelevelment date'
        let dateColumnIndex = -1;
        tableData[0].forEach((header: any, index: number) => {
          if (header === 'Prelevelment date') {
            dateColumnIndex = index;
          }
        });

        // Formater les dates dans les données du tableau HTML uniquement pour la colonne date identifiée
        const formattedTableData = tableData.map((row: any[], rowIndex: number) => row.map((cell: any, colIndex: number) => {
          if (colIndex === dateColumnIndex && typeof cell === 'number' && cell > 20000) {
            return new Date((cell - 25569) * 86400 * 1000).toLocaleDateString();
          }
          return cell;
        }));

        // Ajouter les données formatées du tableau HTML à la feuille principale
        utils.sheet_add_json(ws, formattedTableData, {origin: 'A8', skipHeader: true});
      }

      // Enregistrer la feuille de calcul
      utils.book_append_sheet(wb, ws, 'Fiche de Vie');
      writeFile(wb, 'FicheVie_Report.xlsx');
    }else {
      Swal.fire({title:"Error" ,text:"No data found to printed" ,icon:"error"})

    }
  }

  @ViewChild("pdfcommande",{ static: false }) htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: string = new Date().toISOString().split('T')[0];
  DatefiltrageEnd: string = new Date().toISOString().split('T')[0];
  SearchDate: any;
  visibleCommande: boolean=false;






  public SavePDF(): void {

    if (this.commande.ligneCommandes) {
      this.visibleCommande=true
      setTimeout(() => {
        let header: string[] = [];
        let data: any[] = [];

        let sizeimageA4 = 1;
        this.selectedColumns.forEach(value => {
          header.push(value.header)
        })
        this.listeLignesCommandes.forEach(l => {
          let ligne: any[] = [];
          this.selectedColumns.forEach(col => {
            ligne.push(this.getValueOfligneCommande(col, l))
          })
          data.push(ligne)
        })
        let oriantation: string = "p";
        let format = "a4"
        if (this.selectedColumns.length > 11) {
          oriantation = "l";
          if (this.selectedColumns.length < 10) {
            format = "a4"
            sizeimageA4 = 1;
          } else if (this.selectedColumns.length > 10 && this.selectedColumns.length < 16) {
            format = "a2"
            sizeimageA4 = 3
          } else if (this.selectedColumns.length > 16) {
            format = "a1";
            sizeimageA4 = 4
          }
        }

        const doc = new jsPDF("l", "mm", format)
        let headerPage = document.getElementById("headerpages");
        if (headerPage)
          headerPage.innerHTML = ' <div class=" flex flex-column">   ' +
            '<div class="flex   border-1 w-full justify-content-between">' +
            '      <div class="flex-initial flex align-items-center justify-content-center   font-bold m-2 px-5 py-3 border-round">' +
                        '<img src="/logo.png" >'+
            '      </div>' +
            '      <div class="flex-initial flex align-items-center justify-content-center  text-6xl font-bold m-2 px-5 py-3 border-round">' +
            '        Daily monitoring of analyses for the order\n' +

            '      </div>' +
            '      <div class="flex-initial border-1 flex     w-25  font-bold m-2 px-5 py-3  ">' +
            '        <div class="col   ">' +
            '          <div class="row  mb-2    w-full  ">BEN GUERDANE, TUNISIA  </div>' +
            '          <div class="row mb-2   w-full text-center    text-1xl font-bold  pi pi-calendar ">' + this.pipedate(new Date()) + '</div>' +
            '        </div>' +
            '      </div>   ' +
            '</div> ' +
            '</div>' +
            '</div>' +

            '    </div>  ' +
            '<!--      infoPropreTableCommande--> ' +
            '      <div class=" flex  me-3 mt-5  p-2 gap-1 text-3xl flex    justify-content-evenly">' +
            '        <br><br>' +
            '        <label class="text-2xl font-bold">Command Date :</label><span class="ml-2 text-2xl">' + this.commande.dateCommande + '</span>' +
            '        <label class="text-2xl font-bold">Name :</label><span class=" ml-2 text-2xl">' + this.commande.nom + '</span>' +
            '        <label class="text-2xl font-bold">Status :</label><span class=" ml-2 text-2xl">' + this.commande.etat + ' </span>' +
            '      </div>' +
            '      <div class="flex     p-2 gap-1 text-3xl flex   justify-content-evenly">' +
            // '        <label class="text-2xl font-bold">Creation Date Pond : </label><span class=" ml-2 text-2xl">' + this.commande.bassin?.dateCreation + '</span>' +
            // '        <label class="text-2xl font-bold">Reference :</label><span class="ml-2 text-2xl">' + this.commande.bassin?.reference + '</span>' +
            // '        <label class="text-2xl font-bold">Description :</label><span class=" ml-2 text-2xl">' + this.commande.bassin?.description + '</span>' +
            // '        <label class="text-2xl font-bold">Name :</label><span class=" ml-2 text-2xl">' + this.commande.bassin?.nom + '</span>' +
            // '        <label class="text-2xl font-bold">Location :</label><span class=" ml-2 text-2xl">' + this.commande.bassin?.emplacement + ' </span>' +
            // '        <label class="text-2xl font-bold">Status :</label><span class=" ml-2 text-2xl">' + this.commande.bassin?.etat + ' </span>' +
            '      </div>  ' +
            '<div class=" flex justify-content-start  ">' +
            '  <div class="flex flex-column gap-3 border-1 border-round border-gray-400 p-3">' +
            '    <div class="flex align-items-start gap-3 justify-content-between">' +
            '      <label   class="font-bold">Total Harvset in(T) :    </label>' +
            '      <label   class="font-bold text-center    ">' + this.TotalHarv.toFixed(3) + '</label>' +
            '     </div>' +

            '    <div class="flex align-items-center gap-3 justify-content-between ">' +
            '      <label   class="font-bold">Total Production in(T) :</label>' +
            '      <label   class="font-bold text-center    ">' + this.TotalProd.toFixed(3) + '</label>' +

            '     </div>' +
            '    <div class="flex align-items-center gap-3 justify-content-between ">' +
            '      <label   class="font-bold">Total Transfer Quantity :</label>' +
            '      <label   class="font-bold text-center    ">' + this.TotalHarv.toFixed(3) + '</label>' +

            '     </div>' +
            '  </div>' +
            '</div> <br> <br>' +
            '      <div class="flex justify-content-between">\n' +
            '        <div class=" flex justify-content-end  ">\n' +
            '          <div class="flex flex gap-5 border-1 border-round border-gray-400 p-3">\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold ">% Cum Pass: </label>\n' +
            '              <label class="font-bold text-center    ">'+this.calculerMoyennes().passCumulated.toFixed(3)+'</label>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold">%H₂O: </label>\n' +
            '              <label class="font-bold text-center">'+this.calculerMoyennes().humidite.toFixed(3)+'</label>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold">%Mg: </label>\n' +
            '              <label class="font-bold text-center">'+this.calculerMoyennes().magnesium.toFixed(3)+'</label>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold">%SO₄: </label>\n' +
            '              <label class="font-bold text-center">'+this.calculerMoyennes().sulfate.toFixed(3)+'</label>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold">%NaCL: </label>\n' +
            '              <label class="font-bold text-center">'+this.calculerMoyennes().chlorureDeSodium.toFixed(3)+'</label>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold">%MI: </label>\n' +
            '              <label class="font-bold text-center">'+this.calculerMoyennes().matiereInsoluble.toFixed(3)+'</label>\n' +
            '            </div>\n' +
            '            <div class="flex align-items-start gap-3 justify-content-between">\n' +
            '              <label class="font-bold">Fe(CN)₆: </label>\n' +
            '              <label class="font-bold text-center">'+this.calculerMoyennes().ferrocyanure.toFixed(3)+'</label>\n' +
            '            </div>\n' +
            '          </div>\n' ;

        if (headerPage)
          html2canvas(headerPage, {scale: 1}).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // PDF width
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
            doc.addImage(imgData, 'png', 2, 2, imgWidth * sizeimageA4, imgHeight * sizeimageA4);
            autoTable(doc, {startY: imgHeight + (50*sizeimageA4)})
// Or use javascript directly:
            autoTable(doc, {
              head: [header],
              body: data,
            });
            doc.save('Print_' + Math.random() + '.pdf')
          });
        this.visibleCommande = false

      }, this.commande.ligneCommandes!.length * 100)
    }else {
     // console.log("aucun ligne commande")
      Swal.fire({title:"Error" ,text:"No data found to printed" ,icon:"error"})
    }
     }


  protected readonly Swal = Swal;
  loadingcommande: boolean=false;
  loadinSave: boolean=false ;
  selectedProduct: any;


    extractDoublesFromString(input: string): number[] {
    const regex = /-?\d+(\.\d+)?/g;
    const matches = input.match(regex);
    if (matches) {
      return matches.map(match => parseFloat(match));
    } else {
      return [];
    }
  }


  calculerMoyennes():
    { passCumulated: number,humidite: number,magnesium: number,sulfate: number,chlorureDeSodium: number, matiereInsoluble: number, ferrocyanure: number } {

    let totalHumidite = 0;

    let totalMagnesium = 0;
    let totalSulfate = 0;
    let totalMatiereInsoluble = 0;

    let totalchlorureDeSodium = 0;

    let totalferrocyanure = 0;
    let totalPassCum:number = 0;




    let countPassCum = 0;
    let countHumidite = 0;
    let countMagnesium = 0;
    let countSulfate = 0;
    let countMatiereInsoluble = 0;
    let countchlorureDeSodium = 0;
    let countferrocyanure = 0;


    this.listeLignesCommandes.forEach((lineCommande) => {

      // if (lineCommande.analysePhysique) {
      //
      //   if (lineCommande.analysePhysique.tamisList !== undefined) {
      //     lineCommande.analysePhysique.tamisList.forEach(value => {
      //       if(value.passCumulated)
      //       { totalPassCum += Number(value.passCumulated);
      //         countPassCum++;}
      //
      //     })
      //   }
      //
      //   }

      if (lineCommande.analysePhysique) {
        if (lineCommande.analysePhysique.tamisList !== undefined ) {
          lineCommande.analysePhysique.tamisList.forEach(value => {

            if (this.selectedColumnsCalibre!==undefined && value.passCumulated !== undefined && value.passCumulated !== null && value.calibre==parseFloat(this.selectedColumnsCalibre.header)) {
              // Convertir la valeur en chaîne pour s'assurer que 'match' peut être utilisé
              let passCumulatedString = value.passCumulated;

              // Utiliser une expression régulière pour extraire la partie numérique de la chaîne
              let passCumulatedValue = passCumulatedString

              // Si une partie numérique est trouvée, elle est convertie en nombre
              if (passCumulatedValue) {
                // console.log('passCumulatedNumber: '+ passCumulatedValue)

                // let passCumulatedNumber = Number(passCumulatedValue[0]);

                // Vérifier si le nombre est supérieur à 0

                  totalPassCum += passCumulatedValue;
                  countPassCum++;
                  // console.log('countPassCum: '+countPassCum)
                  // console.log('totalPassCum: '+totalPassCum)

              }
            }
          });
        }
      }

      //console.log('liste de ligne commande'+new JsonPipe().transform(lineCommande))

      if (lineCommande.analyseChimique) {

        if (lineCommande.analyseChimique.humidite !== undefined &&  lineCommande.analyseChimique.humidite !== null) {

          if (lineCommande.analyseChimique.humidite !== undefined &&  lineCommande.analyseChimique.humidite !== null) {
            const humidite:number[]=this.extractDoublesFromString(lineCommande.analyseChimique.humidite);
            // Si une partie numérique est trouvée, elle est convertie en nombre
            if (humidite.length!=0) {
              totalHumidite += humidite[0];
              countHumidite++;

            }
          }

        }

        if (lineCommande.analyseChimique.magnesium !== undefined &&  lineCommande.analyseChimique.magnesium !== null) {
              const magnes:number[]=this.extractDoublesFromString(lineCommande.analyseChimique.magnesium);
          // Si une partie numérique est trouvée, elle est convertie en nombre
          if (magnes.length!=0) {
              totalMagnesium += magnes[0];
              countMagnesium++;

          }
        }

        if (lineCommande.analyseChimique.sulfate !== undefined &&    lineCommande.analyseChimique.sulfate !== null) {

          if (lineCommande.analyseChimique.sulfate !== undefined &&  lineCommande.analyseChimique.sulfate !== null) {
            const sulfate:number[]=this.extractDoublesFromString(lineCommande.analyseChimique.sulfate);
            // Si une partie numérique est trouvée, elle est convertie en nombre
            if (sulfate.length!=0) {
              totalSulfate += sulfate[0];
              countSulfate++;

            }
          }

        }

        if (lineCommande.analyseChimique.chlorureDeSodium !== undefined &&   lineCommande.analyseChimique.chlorureDeSodium !== null) {

          if (lineCommande.analyseChimique.chlorureDeSodium !== undefined &&  lineCommande.analyseChimique.chlorureDeSodium !== null) {
            const chlorureDeSodium:number[]=this.extractDoublesFromString(lineCommande.analyseChimique.chlorureDeSodium);
            // Si une partie numérique est trouvée, elle est convertie en nombre
            if (chlorureDeSodium.length!=0) {
              totalchlorureDeSodium += chlorureDeSodium[0];
              countchlorureDeSodium++;

            }
          }

        }

        if (lineCommande.analyseChimique.matiereInsoluble !== undefined &&  lineCommande.analyseChimique.matiereInsoluble !== null) {

          if (lineCommande.analyseChimique.matiereInsoluble !== undefined && lineCommande.analyseChimique.matiereInsoluble !== null) {
            const matiereInsoluble: number[] = this.extractDoublesFromString(lineCommande.analyseChimique.matiereInsoluble);
            // Si une partie numérique est trouvée, elle est convertie en nombre
            if (matiereInsoluble.length != 0) {
              totalMatiereInsoluble += matiereInsoluble[0];
              countMatiereInsoluble++;

            }
          }

        }

        if (lineCommande.analyseChimique.ferrocyanure !== undefined &&   lineCommande.analyseChimique.ferrocyanure !== null) {
          if (lineCommande.analyseChimique.ferrocyanure !== undefined &&  lineCommande.analyseChimique.ferrocyanure !== null) {
            const ferrocyanure:number[]=this.extractDoublesFromString(lineCommande.analyseChimique.ferrocyanure);
            // Si une partie numérique est trouvée, elle est convertie en nombre
            if (ferrocyanure.length!=0) {
              totalferrocyanure += ferrocyanure[0];
              countferrocyanure++;

            }

          }
        }

      }
    });

    return {


      passCumulated: countPassCum > 0 ? totalPassCum / countPassCum : 0,
      humidite: countHumidite > 0 ? totalHumidite / countHumidite : 0,
      magnesium: countMagnesium > 0 ? totalMagnesium / countMagnesium : 0,

      sulfate: countSulfate > 0 ? totalSulfate / countSulfate : 0,
      chlorureDeSodium: countchlorureDeSodium > 0 ? totalchlorureDeSodium / countchlorureDeSodium : 0,
      ferrocyanure: countferrocyanure > 0 ? totalferrocyanure / countferrocyanure : 0,
      matiereInsoluble: countMatiereInsoluble > 0 ? totalMatiereInsoluble / countMatiereInsoluble : 0,

    };
  }
    getRelatedAnalyse(lineCommande:LineCommande): string {
      let related: string = '';


      const sbnl = this.commande.sbnls?.find(sbnl => sbnl.analysesChimiques!.find(analyse => analyse.id == lineCommande.analyseChimique?.id) !== undefined || sbnl.analysesPhysiques!.find(analyseph => analyseph.id == lineCommande.analysePhysique?.id) !== undefined)
      if (sbnl !== undefined && sbnl.reference !== undefined) {
        related = sbnl.reference;
      }


      const bassin = this.commande.bassins?.find(bassin => bassin.analysesChimiques!.find(analyse => analyse.id == lineCommande.analyseChimique?.id) !== undefined || bassin.analysesPhysiques!.find(analyseph => analyseph.id == lineCommande.analysePhysique?.id) !== undefined)
      if (bassin !== undefined && bassin.nom !== undefined) {
        related = bassin.nom;
      }


      const sbl = this.commande.sbls?.find(sbl => sbl.analysesChimiques!.find(analyse => analyse.id == lineCommande.analyseChimique?.id) !== undefined || sbl.analysesPhysiques!.find(analyseph => analyseph.id == lineCommande.analysePhysique?.id) !== undefined)
      if (sbl !== undefined && sbl.reference !== undefined) {
        related = sbl.reference;
      }

      const sblf = this.commande.sblfs?.find(sblf => sblf.analysesChimiques!.find(analyse => analyse.id == lineCommande.analyseChimique?.id) !== undefined || sblf.analysesPhysiques!.find(analyseph => analyseph.id == lineCommande.analysePhysique?.id) !== undefined)
      if (sblf !== undefined && sblf.reference !== undefined) {
        related = sblf.reference;
      }

      const bande = this.commande.bandes?.find(bande => bande.analysesChimiques!.find(analyse => analyse.id == lineCommande.analyseChimique?.id) !== undefined || bande.analysesPhysiques!.find(analyseph => analyseph.id == lineCommande.analysePhysique?.id) !== undefined)
      if (bande !== undefined && bande.reference !== undefined) {
        related = bande.reference;
      }

      return related;

    }


  getheader():any[] {
    let headers:any[]=[]
    this.selectedColumns.forEach(value => {
      headers.push(value.header)
    })
    return headers;
  }

  caliber(selectedColumnsCalibre: any) {
    this.selectedColumnsCalibre=selectedColumnsCalibre ;
  }



 //  SortableTable() {
 //     this.listeLignesCommandes=this.listeLignesCommandes.sort((a, b) => {
 //      if(a.analyseChimique && b.analyseChimique)
 //       return this.AfterTodate(new Date(a.analyseChimique?.dateAnalyse+""),new Date(b.analyseChimique?.dateAnalyse+""))==true?0:-1;
 //  else if(a.analysePhysique)
 //    return -1
 //        else if(b.analyseChimique)
 //          return  0;
 // return  0;
 //     });
 //   }
isSorted:number=1;
  SortableTable() {


    this.listeLignesCommandes.sort((a:LineCommande, b:LineCommande) => {

  const dateA=this.dateAUtilise(a);
  const dateB=this.dateBUtilise(b);


      if(dateA && dateB)
      return this.AfterTodate(new Date(dateA+""),new Date(dateB+""))?this.isSorted:this.isSorted*-1;
      else if(dateA==undefined && dateB)
        return this.isSorted;
    else return this.isSorted


    });
    this.isSorted=this.isSorted>0?-1:1;
  }



dateAUtilise(a:LineCommande){
      if(a.analyseChimique!==null && a.analysePhysique!==null)
        return a.analyseChimique.dateAnalyse;
      else if (a.analyseChimique==null && a.analysePhysique!==null)
        return a.analysePhysique.dateAnalyse;
      else if (a.analyseChimique!==null && a.analysePhysique==null)
        return a.analyseChimique.dateAnalyse;
      else return 0

}

  dateBUtilise(b:LineCommande){
    if(b.analyseChimique!==null && b.analysePhysique!==null)
      return b.analyseChimique.dateAnalyse;
    else if (b.analyseChimique==null && b.analysePhysique!==null)
      return b.analysePhysique.dateAnalyse;
    else if (b.analyseChimique!==null && b.analysePhysique==null)
      return b.analyseChimique.dateAnalyse;
  else return 0

  }



}
