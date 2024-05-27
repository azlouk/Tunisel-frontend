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
 import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
 import {getToken} from "../../../main";
import * as XLSX from 'xlsx';
import {utils, WorkBook, WorkSheet, writeFile} from "xlsx";
import {FieldsetModule} from "primeng/fieldset";
import {AutoFocusModule} from "primeng/autofocus";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ProgressBarModule} from "primeng/progressbar";




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
    FieldsetModule,
    AutoFocusModule,
    AutoCompleteModule,
    OverlayPanelModule,
    ProgressBarModule,

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

  private datasel: string[]=[];
  filtereddatasel: any[]=[];
  matter: any;
  constructor(private router: Router,
              private bassinService :BassinService,
              private tamisService:TamisService ,
              private route: ActivatedRoute,
               private commandeService:CommandeService,
              private messageService: MessageService,
              private lineCommandeService: LineCommandeService,
              private datePipe: DatePipe
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

      {id:0, field: 'dateAnalyse', header: 'Prelevelment date Analyse' },
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
      {id:27, field: 'dateCreation', header: 'Date Creation'},
      {id:28, field: 'quantityRecolte', header: 'Harvest'},
      {id:29, field: 'quantityProduction', header: 'Production'},
      {id:30, field: 'quantityPluieBengarden', header: 'Ben Gardane Rain'},
      {id:31, field: 'quantityPluieZarzis', header: 'Zarzis Rain'},
      {id:32, field: 'quantiteTransfert', header: 'Transfer Quantity'},
      {id:33, field: 'decisionTransfert', header: 'Transfer Decision'},
      {id:34, field: 'numeroLot', header: 'Number Lot'},
      {id:35, field: 'poidsLot', header: 'Lot Weight'},
      {id:36, field: 'emplassementLot', header: 'Lot Location'},
      {id:37, field: 'lieuxPrelevement', header: 'Places Prelevement'},
      {id:38, field: 'matCamion', header: 'Truck Mat'},
      {id:39, field: 'conformite', header: 'Conformite'},

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

      this.listeLignesCommandes = value.ligneCommandes??[];
      this.CalculeTotalInput();

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
        const datestr=this.commande.dateCommande?.toString()
       const dates: string | null =this.datePipe.transform(datestr,'yyyy-MM-dd')
    if (dates)
     this.commande.dateCommande =new Date(dates);


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
this.listeLignesCommandes=[];
    if(this.commande.bassins){

      // const id :number =this.selectedBassin.id!==undefined?this.selectedBassin.id:-1;
      // const id :number =this.commande.bassin&&this.commande.bassin.id!==undefined?this.commande.bassin.id:-1;
this.commande.bassins.forEach(basin => {
  if(basin.id){
    this.commandeService.getLignesCommandes(basin.id).subscribe(value => {
      const data=value.filter(value1 => this.listeLignesCommandes.find(value2 => value2==value1)==undefined)

      this.listeLignesCommandes.push(...data);

      console.log('size  : ' + this.listeLignesCommandes.length);
      this.getCalibre();
    },error =>{
      console.log(error);
      console.log('error size  : ' + this.listeLignesCommandes.length);});
  }

  })


        // if(id!==-1){
        //   this.commandeService.getLignesCommandes(id).subscribe(value => {
        //     const data=value.filter(value1 => this.listeLignesCommandes.find(value2 => value2==value1)==undefined)
        //     this.listeLignesCommandes = data;
        //     console.log('size  : ' + this.listeLignesCommandes.length);
        //       this.getCalibre();
        //   },error =>{
        //     console.log(error);
        //     console.log('error size  : ' + this.listeLignesCommandes.length);});
        // }
    }
 }


  getValueOfligneCommande(col: any, ligneCommande: any): any {

    if (col.id < 20) {
            if(col.id==0) {

              return ligneCommande.analyseChimique !== null ? this.pipedate(ligneCommande.analyseChimique[col.field]) : '-'
            }

             return ligneCommande.analyseChimique!==null ? ligneCommande.analyseChimique[col.field] : '-';
    }
    else
      if (col.id > 19 && col.id < 22)
    {
          return ligneCommande.analysePhysique!==null  ? ligneCommande.analysePhysique[col.field] : '-';
    } else
      if (col.id > 21 && col.id < 27 && this.selectedColumnsCalibre && this.selectedColumnsCalibre.header) {
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


    else {
      // ligneCommande.dateCreation=new Date();

      return ligneCommande!==null  ? ligneCommande[col.field] : '-';
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
    const data=this.listeLignesCommandes.filter(l => this.searchAnalyse(l)==true || this.chechMatter(l)==true );

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
    return  l.analysePhysique.qualite==this.matter;

  return  false ;
  }
  filterMatter() {


    const data = this.listeLignesCommandes.filter(l => this.chechMatter(l)==true);
   this.listeLignesCommandes=data;
  }

  protected readonly getToken = getToken;

  AddLineCommand() {
  const lineCommande:LineCommande={analysePhysique:null,analyseChimique:null}
    // lineCommande.analyseChimique?.dateAnalyse!==undefined? lineCommande.analyseChimique.dateAnalyse.toString():new Date();

    this.listeLignesCommandes.push(lineCommande);
    console.log('===========>>>>>>: '+new JsonPipe().transform(this.listeLignesCommandes))
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
    // ====================================================================
    const headings = [['Command Date', 'Name', 'State']];
    const headingsBassin = [['Reference', '', 'Description', '', 'Name', '', 'Location', '', 'State', '', 'Creation Date']];

    const wb: WorkBook = utils.book_new();
    const ws: WorkSheet = utils.json_to_sheet([]);

    // Ajouter les en-têtes de colonne pour les commandes
    utils.sheet_add_aoa(ws, headings, { origin: 'A2' });

    // Préparer les données des commandes
    const commandData = [
      [this.commande.dateCommande, this.commande.nom, this.commande.etat]
    ];

    // Ajouter les données de commandes à la feuille
    utils.sheet_add_json(ws, commandData, { origin: 'A3', skipHeader: true });

    // Ajouter les en-têtes de colonne pour les bassins
    utils.sheet_add_aoa(ws, headingsBassin, { origin: 'A5' });

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
      const tableData: any[][] = utils.sheet_to_json(wst, { header: 1 }) as any[][];

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
      utils.sheet_add_json(ws, formattedTableData, { origin: 'A8', skipHeader: true });
    }

    // Enregistrer la feuille de calcul
    utils.book_append_sheet(wb, ws, 'Fiche de Vie');
    writeFile(wb, 'FicheVie_Report.xlsx');
  }

  @ViewChild("pdfcommande",{ static: false }) htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  SearchDate: any;
  visibleCommande: boolean=false;






  public SavePDF(): void {
this.visibleCommande=true
    setTimeout(()=>{
    let header:string[]=[] ;
    let data:any[]=[] ;

 let sizeimageA4=1;
this.selectedColumns.forEach(value => {
  header.push(value.header)
})
    this.listeLignesCommandes.forEach(l => {
      let ligne:any[]=[];
      this.selectedColumns.forEach(col => {
        ligne.push(this.getValueOfligneCommande(col,l))
      })
     data.push(ligne)
    })
    let oriantation:string="p" ;
     let format="a4"
    if(this.selectedColumns.length>11){
      oriantation="l";
      if(this.selectedColumns.length<10) {
        format = "a4"
        sizeimageA4=1;
      }      else if(this.selectedColumns.length>10 && this.selectedColumns.length<16) {
        format="a2"
        sizeimageA4=3
      }  else if(this.selectedColumns.length>16 ) {
        format="a1";
        sizeimageA4=4
      }
    }

     const doc = new jsPDF("l","mm",format)
     let headerPage=document.getElementById("headerpages");
    if(headerPage)
           headerPage.innerHTML=' <div class=" flex flex-column">   ' +
             '<div class="flex   border-1 w-full justify-content-between">' +
             '      <div class="flex-initial flex align-items-center justify-content-center   font-bold m-2 px-5 py-3 border-round">' +

             '      </div>' +
             '      <div class="flex-initial flex align-items-center justify-content-center  text-6xl font-bold m-2 px-5 py-3 border-round">' +
             '        Daily monitoring of analyses for the order\n' +

             '      </div>' +
             '      <div class="flex-initial border-1 flex     w-25  font-bold m-2 px-5 py-3  ">' +
             '        <div class="col   ">' +
             '          <div class="row  mb-2    w-full  ">BEN GUERDANE, TUNISIA  </div>' +
             '          <div class="row mb-2   w-full text-center    text-1xl font-bold  pi pi-calendar ">'+this.pipedate(new Date())+'</div>' +
             '        </div>' +
             '      </div>   ' +
             '</div> ' +
             '</div>' +
             '</div>' +

             '    </div>  ' +
             '<!--      infoPropreTableCommande--> ' +
             '      <div class=" flex  me-3 mt-5  p-2 gap-1 text-3xl flex    justify-content-evenly">' +
             '        <br><br>' +
             '        <label class="text-2xl font-bold">Command Date :</label><span class="ml-2 text-2xl">'+this.commande.dateCommande+'</span>' +
             '        <label class="text-2xl font-bold">Name :</label><span class=" ml-2 text-2xl">'+this.commande.nom+'</span>' +
             '        <label class="text-2xl font-bold">Status :</label><span class=" ml-2 text-2xl">'+this.commande.etat+' </span>' +
             '      </div>' +
             '      <div class="flex     p-2 gap-1 text-3xl flex   justify-content-evenly">' +
             '        <label class="text-2xl font-bold">Creation Date Pond : </label><span class=" ml-2 text-2xl">'+this.commande.bassin?.dateCreation+'</span>' +
             '        <label class="text-2xl font-bold">Reference :</label><span class="ml-2 text-2xl">'+this.commande.bassin?.reference+'</span>' +
             '        <label class="text-2xl font-bold">Description :</label><span class=" ml-2 text-2xl">'+this.commande.bassin?.description+'</span>' +
             '        <label class="text-2xl font-bold">Name :</label><span class=" ml-2 text-2xl">'+this.commande.bassin?.nom+'</span>' +
             '        <label class="text-2xl font-bold">Location :</label><span class=" ml-2 text-2xl">'+this.commande.bassin?.emplacement+' </span>' +
             '        <label class="text-2xl font-bold">Status :</label><span class=" ml-2 text-2xl">'+this.commande.bassin?.etat+' </span>' +
             '      </div>  ' +
             '<div class=" flex justify-content-start  ">' +
             '  <div class="flex flex-column gap-3 border-1 border-round border-gray-400 p-3">' +
             '    <div class="flex align-items-start gap-3 justify-content-between">' +
             '      <label   class="font-bold">Total Harvset in(T) :    </label>' +
             '      <label   class="font-bold text-center    ">'+this.TotalHarv+'</label>' +
             '     </div>' +

             '    <div class="flex align-items-center gap-3 justify-content-between ">' +
             '      <label   class="font-bold">Total Production in(T) :</label>' +
             '      <label   class="font-bold text-center    ">'+this.TotalProd+'</label>' +

             '     </div>' +
             '    <div class="flex align-items-center gap-3 justify-content-between ">' +
             '      <label   class="font-bold">Total Transfer Quantity :</label>' +
             '      <label   class="font-bold text-center    ">'+this.TotalHarv+'</label>' +

             '     </div>' +
             '  </div>' +
             '</div>' ;

    if(headerPage)
      html2canvas(headerPage, {scale: 1}).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
         const imgWidth = 210; // PDF width
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
        doc.addImage(imgData, 'png', 2, 2, imgWidth*sizeimageA4, imgHeight*sizeimageA4);
        autoTable(doc,{startY:imgHeight+180})
// Or use javascript directly:
        autoTable(doc, {
          head: [header],
          body: data,
        });
        doc.save('Print_'+Math.random()+'.pdf')
      });
  this.visibleCommande=false

    },this.commande.ligneCommandes!.length*100)

     }







}
