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
import {SharedModule} from "primeng/api";
import {TabViewModule} from "primeng/tabview";
import {Table, TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {TooltipModule} from "primeng/tooltip";
import {Bassin} from "../../Models/bassin";
import {Sbnl} from "../../Models/sbnl";
import {Bande} from "../../Models/bande";
import {Sbl} from "../../Models/sbl";
import {Sblf} from "../../Models/sblf";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import {Tamis} from "../../Models/tamis";
import {ActivatedRoute, Router} from "@angular/router";
import {BassinService} from "../../Services/bassin.service";
import {SbnlService} from "../../Services/sbnl.service";
import {SblService} from "../../Services/sbl.service";
import {SblfService} from "../../Services/sblf.service";
import {AnalysePhysiqueService} from "../../Services/analysePhysique.service";
import {TamisService} from "../../Services/tamis.service";
import {BandeService} from "../../Services/bande.service";
import Swal from "sweetalert2";
import {Commande} from "../../Models/commande";
import {MultiSelectModule} from "primeng/multiselect";
import {RippleModule} from "primeng/ripple";
import {CommandeService} from "../../Services/commande.service";
import {LineCommande} from "../../Models/lineCommande";

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
    RippleModule
  ],
  templateUrl: './ajouter-commande.component.html',
  styleUrl: './ajouter-commande.component.css'
})
export class AjouterCommandeComponent implements OnInit{
  bassins: Bassin[] = [];
  selectedBassin: Bassin = {};
  sbnls: Sbnl[] = [];
  selectedSbnl:Sbnl={};
  bandes: Bande[] = [];
  selectedBande:Bande={};
  sbls: Sbl[] = [];
  selectedSbl:Sbl={};
  sblfs: Sblf[] = [];
  selectedSblf:Sblf={};
  analysesPhysique: AnalysesPhysique={} ;
  commande: Commande={} ;

  private analysePhysiqueId: any;
  public isUpdateAnalysePhysique=false;
  visibleDetails: boolean=false;

  // ======================
  visibale:boolean=false;
  listeTamis:Tamis[]=[];
  tamis: Tamis = {
    refusCumulated: 0,

  };
  isUpdateTamis:boolean=false ;

  // =====================
  // cols: any;
  selectedIntervention: any;

  cols!: Column[];

  selectedColumns!: Column[];
  listeLignesCommandes:LineCommande[]=[];
  constructor(private router: Router,
              private bassinService :BassinService,
              private sbnlService :SbnlService,
              private sblService :SblService,
              private sblfService :SblfService,
              private analysePhysiqueService:AnalysePhysiqueService ,
              private tamisService:TamisService ,
              private route: ActivatedRoute,
              private bandeService:BandeService ,
               private commandeService:CommandeService
  )
  {}



  ngOnInit(): void {
    // =============================================

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
      {id:23, field: 'masse', header: 'weight'},
      {id:24, field: 'refus', header: 'Refusal '},
      {id:25, field: 'refusCumulated', header: 'Refusal Cumulateds '},
      {id:26, field: 'passCumulated', header: 'Cumulated Pass'},

    ];

    this.selectedColumns = this.cols;
    // =============================================

    this.isUpdateTamis=false ;
    this.analysePhysiqueId = this.route.snapshot.paramMap.get('id');
    this.isUpdateAnalysePhysique=this.analysePhysiqueId!==null
    this.analysesPhysique.reference="Gr-"+new Date().getFullYear()+"_"+new Date().getMonth()+"_"+new Date().getDay()



    if(this.analysePhysiqueId){
      this.analysePhysiqueService.getElementByAnalysesPhysiquesId(this.analysePhysiqueId).subscribe((value: any) => {

        this.selectedBassin = value.bassin;
        this.selectedSbl = value.sbl;
        this.selectedSbnl = value.sbnl;
        this.selectedSblf = value.sblf;
        this.selectedBande = value.bande;

      }, error => {

      });

      this.analysePhysiqueService.getAnalysesPhysiquesById(this.analysePhysiqueId).subscribe(value => {this.analysesPhysique=value;
        this.listeTamis=this.analysesPhysique.tamisList==undefined?[]:this.analysesPhysique.tamisList ;

      },error => error)
    }

    this.bassinService.getAllBassins()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;
      }, error => {
        console.log('Error fetching users:', error);
      });

    this.sbnlService.getAllSbnls().subscribe((v:  Sbnl[]) => {
      this.sbnls=v;

    },error => {
      console.log(error)});

    this.bandeService.getAllBandes().subscribe((v:  Bande[]) => {
      this.bandes=v;

    },error => {
      console.log(error)})

    this.sblService.getAllSbl().subscribe((v:  Sbl[]) => {
      this.sbls=v;
    },error => {
      console.log(error)})

    this.sblfService.getAllSblfs().subscribe((v:  Sblf[]) => {
      this.sblfs=v;

    },error => {
      console.log(error)})


  }


  retour() {
    this.router.navigate(['/commande']);
  }



  saveCommande() {

    if(this.isUpdateAnalysePhysique){
      this.analysePhysiqueService.updateAnalysesPhysiques(this.analysesPhysique).subscribe(value => this.router.navigate(['/analysePhysique']))
    }
    else{
      if(this.selectedBassin.hasOwnProperty('id')){
        this.selectedBassin.analysesPhysiques=[];
        this.analysesPhysique.tamisList=this.listeTamis;
        this.selectedBassin.analysesPhysiques.push(this.analysesPhysique) ;
        console.log('======**********>>>>>>   '+new JsonPipe().transform(this.selectedBassin));
        this.analysePhysiqueService.addAnalysesPhysiquesToBassin(this.selectedBassin).subscribe(value => {
          this.router.navigate(['/analysePhysique']);
        },error => console.log(error));
      }
      else if(this.selectedSbnl.hasOwnProperty('id')){
        this.selectedSbnl.analysesPhysiques=[];
        this.analysesPhysique.tamisList=this.listeTamis;
        this.selectedSbnl.analysesPhysiques.push(this.analysesPhysique) ;
        this.analysePhysiqueService.addAnalysesPhysiquesToSbnl(this.selectedSbnl).subscribe(value => this.router.navigate(['/analysePhysique']))
      }
      else if(this.selectedBande.hasOwnProperty('id')){
        this.selectedBande.analysesPhysiques=[];
        this.analysesPhysique.tamisList=this.listeTamis;
        this.selectedBande.analysesPhysiques.push(this.analysesPhysique) ;
        this.analysePhysiqueService.addAnalysesPhysiquesToBande(this.selectedBande).subscribe(value => this.router.navigate(['/analysePhysique']))
      }
      else if(this.selectedSbl.hasOwnProperty('id')){
        this.selectedSbl.analysesPhysiques=[];
        this.analysesPhysique.tamisList=this.listeTamis;
        this.selectedSbl.analysesPhysiques.push(this.analysesPhysique) ;
        this.analysePhysiqueService.addAnalysesPhysiquesToSbl(this.selectedSbl).subscribe(value => this.router.navigate(['/analysePhysique']))
      }
      else if(this.selectedSblf.hasOwnProperty('id')){
        this.selectedSblf.analysesPhysiques=[];
        this.analysesPhysique.tamisList=this.listeTamis;
        this.selectedSblf.analysesPhysiques.push(this.analysesPhysique) ;
        this.analysePhysiqueService.addAnalysesPhysiquesToSblf(this.selectedSblf).subscribe(value => this.router.navigate(['/analysePhysique']))
      }
      else {

      }
    }

  }



  openNew() {
    this.visibleDetails=true;
  }

  deleteTamis(tamis: any) {
    if (this.isUpdateAnalysePhysique==true){
      this.tamisService.deleteTamis(tamis.id).subscribe(value => { this.analysePhysiqueService.getAnalysesPhysiquesById(this.analysePhysiqueId).subscribe(value =>{this.analysesPhysique=value;
        this.listeTamis=this.analysesPhysique.tamisList==undefined?[]:this.analysesPhysique.tamisList ;
      } )

      })
      this.listeTamis = this.listeTamis.filter(item => item !== tamis)
    }else {
      this.listeTamis = this.listeTamis.filter(item => item !== tamis);
    }

  }



  hideDialog() {
    this.visibale=false;
  }

  onGlobalFilter(dt: Table, $event: Event) {

  }



  ajouterTamis() {

    this.tamis = {
      refusCumulated: 0,
    };
    this.visibale=true;
    this.isUpdateTamis=false ;


  }

  saveTamis() {
    if(this.isUpdateTamis){

      const tamis=this.listeTamis.findIndex((tt:Tamis)=>tt.id==this.tamis.id)
      if(tamis!==-1){
        this.listeTamis[tamis]= {...this.tamis} ;
        this.visibale=false
      }
    }else {
      const tamis=this.listeTamis.findIndex((t:Tamis)=>t.calibre===this.tamis.calibre)
      if(tamis!==-1){
        this.visibale=false
        Swal.fire({
          title: "Duplication?",
          text: "Calibre déja exist les valeur sera modifié!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oui, modifié!",
          cancelButtonText:"Annuler"
        }).then((result) => {
          if (result.isConfirmed) {
            this.listeTamis[tamis].calibre=this.tamis.calibre ;
            this.listeTamis[tamis].masse=this.tamis.masse ;
            this.listeTamis[tamis].refus=this.tamis.refus ;
            this.listeTamis[tamis].refusCumulated=this.tamis.refusCumulated ;
            this.listeTamis[tamis].passCumulated=this.tamis.passCumulated ;
            this.visibale=false

          }
        });


      }
      else {

        this.listeTamis.push({...this.tamis});
        this.listeTamis.sort((a, b) => {
          // Compare the 'refusCumulated' property of each object
          // @ts-ignore
          return b.calibre - a.calibre;
        });
        this.visibale=false

      }
    }



  }

  editTamis(tamis: Tamis) {
    this.visibale=true;
    this.tamis={...tamis}
    this.isUpdateTamis=true ;
  }


  getLine() {
  //   if (this.selectedBassin!==null) {
  //
  //   const id :number =this.selectedBassin.id!==undefined?this.selectedBassin.id:-1;
  //   alert(id)
  //   if(id!==-1){
  //     this.commandeService.getLignesCommandes(id).subscribe(value => {
  //       this.listeLignesCommandes = value;
  //       console.log('size  : ' + this.listeLignesCommandes.length);
  //     },error =>{
  //       console.log(error);
  //       console.log('error size  : ' + this.listeLignesCommandes.length);});
  //   }
  //   }
    if(this.selectedBassin!==null){

      const id :number =this.selectedBassin.id!==undefined?this.selectedBassin.id:-1;

        if(id!==-1){
          this.commandeService.getLignesCommandes(id).subscribe(value => {
            this.listeLignesCommandes = value;
            console.log('size  : ' + this.listeLignesCommandes.length);
          },error =>{
            console.log(error);
            console.log('error size  : ' + this.listeLignesCommandes.length);});
        }
  }}

}