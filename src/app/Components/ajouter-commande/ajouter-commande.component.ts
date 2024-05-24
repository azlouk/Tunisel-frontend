import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
 import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
 import {getToken} from "../../../main";
import * as XLSX from 'xlsx';
import {utils, WorkBook, WorkSheet, writeFile} from "xlsx";
import {FieldsetModule} from "primeng/fieldset";
import {AutoFocusModule} from "primeng/autofocus";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";




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

      this.listeLignesCommandes = value.ligneCommandes??[];
      this.CalculeTotalInput();

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
            const data=value.filter(value1 => this.listeLignesCommandes.find(value2 => value2==value1)==undefined)
            this.listeLignesCommandes = data;
            console.log('size  : ' + this.listeLignesCommandes.length);
              this.getCalibre();
          },error =>{
            console.log(error);
            console.log('error size  : ' + this.listeLignesCommandes.length);});
        }
  }}


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
    if (this.commande.bassin) {
      const bassinData = [
        [this.commande.bassin.reference, '', this.commande.bassin.description, '', this.commande.bassin.nom, '', this.commande.bassin.emplacement, '', this.commande.bassin.etat, '', this.commande.bassin.dateCreation]
      ];

      // Ajouter les données de bassins à la feuille
      utils.sheet_add_json(ws, bassinData, { origin: 'A6', skipHeader: true });
    }

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

  @ViewChild("pdfcommande") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  SearchDate: any;





  public SavePDF(): void {

    if (this.htmlContent) {
      html2canvas(this.htmlContent.nativeElement, {scale: 1}).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // PDF width
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
        pdf.addImage(imgData, 'png', 2, 2, imgWidth, imgHeight);
        pdf.save('Print_' + Math.random() + '.pdf');
      });


    }


  }



}
