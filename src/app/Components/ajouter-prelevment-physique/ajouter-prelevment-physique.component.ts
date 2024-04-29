import {Component, OnInit} from '@angular/core';
import {Bassin} from "../../Models/bassin";
import {Sbnl} from "../../Models/sbnl";
import {Sbl} from "../../Models/sbl";
import {Sblf} from "../../Models/sblf";
import {ActivatedRoute, Router} from "@angular/router";
import {BassinService} from "../../Services/bassin.service";
import {SbnlService} from "../../Services/sbnl.service";
import {SblService} from "../../Services/sbl.service";
import {SblfService} from "../../Services/sblf.service";
import {DatePipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {SharedModule} from "primeng/api";
import {TabViewModule} from "primeng/tabview";
import {ToolbarModule} from "primeng/toolbar";
import {TooltipModule} from "primeng/tooltip";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import {Table, TableModule} from "primeng/table";
import {Tamis} from "../../Models/tamis";
import {AnalysePhysiqueService} from "../../Services/analysePhysique.service";
import {TamisService} from "../../Services/tamis.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-ajouter-prelevment-physique',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    FloatLabelModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    ListboxModule,
    NgForOf,
    NgIf,
    SharedModule,
    TabViewModule,
    ToolbarModule,
    TooltipModule,
    DatePipe,
    TableModule
  ],
  templateUrl: './ajouter-prelevment-physique.component.html',
  styleUrl: './ajouter-prelevment-physique.component.css'
})
export class AjouterPrelevmentPhysiqueComponent implements OnInit{
  bassins: Bassin[] = [];
  selectedBassin: Bassin = {};
  sbnls: Sbnl[] = [];
  selectedSbnl:Sbnl={};
  sbls: Sbl[] = [];
  selectedSbl:Sbl={};
  sblfs: Sblf[] = [];
  selectedSblf:Sblf={};
  analysesPhysique: AnalysesPhysique={} ;

  private analysePhysiqueId: any;
  public isUpdateAnalysePhysique=false;
  visibleDetails: boolean=false;

  // ======================
  visibale:boolean=false;
  listeTamis:Tamis[]=[];
  tamis:Tamis={};
  isUpdateTamis:boolean=false ;

  // =====================
  cols: any;
  selectedIntervention: any;
  constructor(private router: Router,
              private bassinService :BassinService,
              private sbnlService :SbnlService,
              private sblService :SblService,
              private sblfService :SblfService,
              private analysePhysiqueService:AnalysePhysiqueService ,
              private tamisService:TamisService ,
              private route: ActivatedRoute,
              )
  {}



  ngOnInit(): void {
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
    this.router.navigate(['/analysePhysique']);
  }



  saveAnalysePhysique() {

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
    }}



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
    this.tamis={}
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
        this.visibale=false
      }
    }



  }

  editTamis(tamis: Tamis) {
    this.visibale=true;
     this.tamis={...tamis}
    this.isUpdateTamis=true ;
  }
}
