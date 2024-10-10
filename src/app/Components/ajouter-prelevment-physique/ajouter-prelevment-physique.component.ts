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
import {Band} from "../../Models/band";
import {BandService} from "../../Services/band.service";
import {InputTextareaModule} from "primeng/inputtextarea";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
import {getToken} from "../../../main";
import {RippleModule} from "primeng/ripple";

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
    TableModule,
    InputTextareaModule,
    AutoCompleteModule,
    RippleModule
  ],
  templateUrl: './ajouter-prelevment-physique.component.html',
  styleUrl: './ajouter-prelevment-physique.component.css'
})
export class AjouterPrelevmentPhysiqueComponent implements OnInit{
  bassins: Bassin[] = [];
  selectedBassin: Bassin = {};
  sbnls: Sbnl[] = [];
  selectedSbnl:Sbnl={};
  bands: Band[] = [];
  selectedBand:Band=new Band();
  sbls: Sbl[] = [];
  selectedSbl:Sbl={};
  sblfs: Sblf[] = [];
  selectedSblf:Sblf={};
  analysesPhysique: AnalysesPhysique={} ;
  datasel: any []= [];

  filtereddatasel: any[] = [];
  private analysePhysiqueId: any;
  public isUpdateAnalysePhysique=false;
  visibleDetails: boolean=false;

  // ======================
  visibale:boolean=false;
  listeTamis:Tamis[]=[];
  tamis: Tamis = {
    id: new Date().getTime(),

  };
  isUpdateTamis:boolean=false ;

  // =====================
  cols: any;
  selectedIntervention: any;
  id:number=0 ;
  ref:string="" ;
  constructor(private router: Router,
              private bassinService :BassinService,
              private sbnlService :SbnlService,
              private sblService :SblService,
              private sblfService :SblfService,
              private analysePhysiqueService:AnalysePhysiqueService ,
              private tamisService:TamisService ,
              private route: ActivatedRoute,
              private bandService:BandService
              )
  {}



  ngOnInit(): void {
    this.analysesPhysique.dateAnalyse = new Date();
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
        this.selectedBand = value.band;

          if(this.selectedBassin){
            this.id=this.selectedBassin.id!
            this.ref="bassin"
          }else if (this.selectedSbnl){
            this.id=this.selectedSbnl.id!
            this.ref="sbnl"
          }else if (this.selectedBand){
            this.id=this.selectedBand.id!
            this.ref="band"
          }else if (this.selectedSbl){
            this.id=this.selectedSbl.id!
            this.ref="sbl"
          }else if (this.selectedSblf){
            this.id=this.selectedSblf.id!
            this.ref="sblf"
          }
         // console.error((value))

      }, error => {

      });

    this.analysePhysiqueService.getAnalysesPhysiquesById(this.analysePhysiqueId).subscribe(value => {this.analysesPhysique=value;
     // alert(value.dateAnalyse)
      this.listeTamis=this.analysesPhysique.tamisList==undefined?[]:this.analysesPhysique.tamisList ;

    },error => error)
    }

    this.bassinService.getAllBassinsDTO()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;
      }, error => {
        console.log('Error fetching users:', error);
      });

    this.sbnlService.getAllSbnlsDTO().subscribe((v:  Sbnl[]) => {
      this.sbnls=v;

    },error => {
      console.log(error)});

    this.bandService.getAllBands().subscribe((v:  Band[]) => {
      this.bands=v;

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
    this.router.navigate(['/analysePhysique']);
  }

  selectBassin() {
    // alert(new JsonPipe().transform(this.selectedBassin))

     this.selectedSbnl = {};
    this.selectedBand = new Band();
    this.selectedSbl = {};
    this.selectedSblf = {};

    this.id=this.selectedBassin && this.selectedBassin.id?this.selectedBassin.id:0;
    this.ref="bassin"
  }

  selectSBNL() {
    //   alert(new JsonPipe().transform(this.selectedSbnl))

    this.selectedBassin = {};
    this.selectedBand = new Band();
    this.selectedSbl = {};
    this.selectedSblf = {};
    this.id=this.selectedSbnl && this.selectedSbnl.id?this.selectedSbnl.id:0;
    this.ref="sbnl"
  }

  selectBand() {
    // alert(new JsonPipe().transform(this.selectedBand))

    this.selectedBassin = {};
    this.selectedSbnl = {};
     this.selectedSbl = {};
    this.selectedSblf = {};
    this.id=this.selectedBand && this.selectedBand.id?this.selectedBand.id:0;
    this.ref="band"
  }

  selectSBL() {
    // alert(new JsonPipe().transform(this.selectedSbl))

    this.selectedBassin = {};
    this.selectedSbnl = {};
    this.selectedBand = new Band();
     this.selectedSblf = {};
    this.id=this.selectedSbl && this.selectedSbl.id?this.selectedSbl.id:0;
    this.ref="sbl"
  }

  selectSBLF() {
    // alert(new JsonPipe().transform(this.selectedSblf))

    this.selectedBassin = {};
    this.selectedSbnl = {};
    this.selectedBand = new Band();
    this.selectedSbl = {};
     this.id=this.selectedSblf && this.selectedSblf.id?this.selectedSblf.id:0;
    this.ref="sblf"
  }

  saveAnalysePhysique() {
    if(this.isUpdateAnalysePhysique) {
      if (
        this.selectedBassin !== undefined && this.selectedBassin !== null && this.selectedBassin.hasOwnProperty('id') ||
        this.selectedSbnl !== undefined && this.selectedSbnl !== null && this.selectedSbnl.hasOwnProperty('id') ||
        this.selectedSbl !== undefined && this.selectedSbl !== null && this.selectedSbl.hasOwnProperty('id') ||
        this.selectedBand !== undefined && this.selectedBand !== null && this.selectedBand.hasOwnProperty('id') ||
        this.selectedSblf !== undefined && this.selectedSblf.hasOwnProperty('id')
      ) {
       // alert(this.id+" ref"+this.ref+"  id an"+this.analysesPhysique.id)

        this.analysePhysiqueService.updateAnalysesPhysiques(this.analysesPhysique, this.id, this.ref).subscribe(value => this.router.navigate(['/analysePhysique']), error => {
          Swal.fire({
            title: "Error of Modification",
            text: "Please remove this analyse from order first to change assignment ",
            icon: "error"
          })


        })
      } else {
        Swal.fire({
          title: "Error of selection",
          text: "Please select one of Well ,Pond ,Unwashed ,band ,washed or washed ship  ..etc",
          icon: "error"
        })

      }
    }
    else{
      if(this.selectedBassin.hasOwnProperty('id')){
        this.selectedBassin.analysesPhysiques=[];
        this.analysesPhysique.tamisList=this.listeTamis;
        this.selectedBassin.analysesPhysiques.push(this.analysesPhysique) ;
        // console.log('======**********>>>>>>   '+new JsonPipe().transform(this.selectedBassin));
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
      else if(this.selectedBand.hasOwnProperty('id')){
        this.selectedBand.analysesPhysiques=[];
        this.analysesPhysique.tamisList=this.listeTamis;
        this.selectedBand.analysesPhysiques.push(this.analysesPhysique) ;
        this.analysePhysiqueService.addAnalysesPhysiquesToBand(this.selectedBand).subscribe(value => this.router.navigate(['/analysePhysique']))
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
        Swal.fire({title:"Error of selection", text:"Please select one of Well ,Pond ,Unwashed ,band ,washed or washed ship  ..etc",icon:"error"})
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
      id:new Date().getTime()
    };

    // this.visibale=true;
    this.isUpdateTamis=false ;
    this.listeTamis.push(this.tamis);


  }

  saveTamis() {
    this.listeTamis.sort((a, b) => {
      // Compare the 'refusCumulated' property of each object
      // @ts-ignore
      return b.calibre - a.calibre;
    });

  }
  calculateTotalMass(): number {
    return this.listeTamis.reduce((previousValue, currentValue) =>previousValue+ (currentValue!==undefined && currentValue.masse!=undefined?parseFloat(currentValue.masse.toString()):0) ,0);
  }
  calculateRefus(total:number) {

for (let tamis of this.listeTamis){
  tamis.refus=0;
  if(tamis.masse!==undefined){

    tamis.refus = parseFloat((tamis.masse * 100 / total).toFixed(2));  }else {

  }

}

  }

  calculateRefusCumulated() {
for (let i=0;i<this.listeTamis.length;i++){
  this.listeTamis[i].refusCumulated=0;
  let cumulativeRejection = this.listeTamis[i].refus;
  if(i==0&&cumulativeRejection){
    this.listeTamis[i].refusCumulated=cumulativeRejection
  }
  else if(cumulativeRejection&&this.listeTamis[i].refusCumulated!==undefined&&i>0){

    // @ts-ignore
    this.listeTamis[i].refusCumulated=parseFloat((this.listeTamis[i-1].refusCumulated+cumulativeRejection).toFixed(2));
  }
}
  }

  calculatePassCumulated() {
for(let tamis of this.listeTamis){
  if(tamis.refus){
 // @ts-ignore
    tamis.passCumulated=parseFloat((100-tamis.refusCumulated).toFixed(2));
}}
  }
calculateTamis(){
let total:number=this.calculateTotalMass();
this.calculateRefus(total);
this.calculateRefusCumulated();
  this.calculatePassCumulated();
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

  protected readonly getToken = getToken;

  public updateTamis() {

  }
  calculTotalRefus() {
    return this.listeTamis.reduce((previousValue, currentValue) => previousValue+ (currentValue!==undefined && currentValue.refus!=undefined?parseFloat(currentValue.refus.toString()):0),0)
  }

}
