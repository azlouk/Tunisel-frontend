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

    this.analysePhysiqueId = this.route.snapshot.paramMap.get('id');
    this.isUpdateAnalysePhysique=this.analysePhysiqueId!==null

    this.analysePhysiqueService.getElementByAnalysesPhysiquesId(this.analysePhysiqueId).subscribe((value :any) => {

      this.selectedBassin=value.bassin;
      this.selectedSbl=value.sbl;
      this.selectedSbnl=value.sbnl;
      this.selectedSblf=value.sblf ;
      console.log(new JsonPipe().transform(value));

    }, error => {

    });
    this.analysePhysiqueService.getAnalysesPhysiquesById(this.analysePhysiqueId).subscribe(value => {this.analysesPhysique=value;
      this.listeTamis=this.analysesPhysique.tamisList==undefined?[]:this.analysesPhysique.tamisList ;

    },error => error)


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
      console.log(new JsonPipe().transform("====================>>>>>>"+this.sbls))
    },error => {
      console.log(error)})

    this.sblfService.getAllSblfs().subscribe((v:  Sblf[]) => {
      this.sblfs=v;
      console.log(new JsonPipe().transform("====================>>>>>>"+this.sblfs))

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
      if(this.selectedBassin){
        this.selectedBassin.analysesPhysiques=[];
        this.analysesPhysique.tamisList=this.listeTamis;
        this.selectedBassin.analysesPhysiques.push(this.analysesPhysique) ;
        console.log('======**********>>>>>>   '+new JsonPipe().transform(this.selectedBassin));
        this.analysePhysiqueService.addAnalysesPhysiquesToBassin(this.selectedBassin).subscribe(value => {
          this.router.navigate(['/analysePhysique']);
        },error => console.log(error));
      }if(this.selectedSbnl){
        this.selectedSbnl.analysesPhysiques=[];
        this.analysesPhysique.tamisList=this.listeTamis;
        this.selectedSbnl.analysesPhysiques.push(this.analysesPhysique) ;
        this.analysePhysiqueService.addAnalysesPhysiquesToSbnl(this.selectedSbnl).subscribe(value => this.router.navigate(['/analysePhysique']))
      }if(this.selectedSbl){
        this.selectedSbl.analysesPhysiques=[];
        this.analysesPhysique.tamisList=this.listeTamis;
        this.selectedSbl.analysesPhysiques.push(this.analysesPhysique) ;
        this.analysePhysiqueService.addAnalysesPhysiquesToSbl(this.selectedSbl).subscribe(value => this.router.navigate(['/analysePhysique']))
      }if(this.selectedSblf){
        this.selectedSblf.analysesPhysiques=[];
        this.analysesPhysique.tamisList=this.listeTamis;
        this.selectedSblf.analysesPhysiques.push(this.analysesPhysique) ;
        this.analysePhysiqueService.addAnalysesPhysiquesToSblf(this.selectedSblf).subscribe(value => this.router.navigate(['/analysePhysique']))
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
    this.visibale=true;
  }

  saveTamis() {
    this.listeTamis.push(this.tamis);
    this.visibale=false

  }
}
