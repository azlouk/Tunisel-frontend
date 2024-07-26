import {Component, OnInit} from '@angular/core';
import {Bassin} from "../../Models/bassin";
import {Sbnl} from "../../Models/sbnl";
import {Bande} from "../../Models/bande";
import {Sbl} from "../../Models/sbl";
import {Sblf} from "../../Models/sblf";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import {Tamis} from "../../Models/tamis";
import {ActivatedRoute, Router} from "@angular/router";
import {BassinService} from "../../Services/bassin.service";
import {DatePipe, JsonPipe, NgIf} from "@angular/common";
import {Table, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {ToolbarModule} from "primeng/toolbar";
import {getToken} from "../../../main";
import {LigneJournalier} from "../../Models/ligne-journalier";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {Puit} from "../../Models/puit";
import {PuitService} from "../../Services/puit.service";
import {JournalierPompe} from "../../Models/journalier-pompe";
import {Pompe} from "../../Models/pompe";
import {PompeService} from "../../Services/pompe.service";
import {RippleModule} from "primeng/ripple";
import {JournalierService} from "../../Services/journalier.service";
import {Journalier} from "../../Models/journalier";
import {JournalierPompeService} from "../../Services/journalier-pompe.service";
import {LigneJournalierService} from "../../Services/ligne-journalier.service";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-ajouter-ligne-journalier',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    FloatLabelModule,
    InputNumberModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
    ToolbarModule,
    FormsModule,
    DropdownModule,
    MultiSelectModule,
    DatePipe,
    RippleModule,
    TooltipModule
  ],
  templateUrl: './ajouter-ligne-journalier.component.html',
  styleUrl: './ajouter-ligne-journalier.component.css'
})
export class AjouterLigneJournalierComponent implements OnInit{
  bassins: Bassin[] = [];
  puits: Puit[] = [];
  pompes:Pompe[]=[];
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
  cols: any;
  selectedIntervention: any;
  id:number=0 ;
  ref:string="" ;

  // @ts-ignore
  ligneJournalier:LigneJournalier=new LigneJournalier();
  // @ts-ignore
  journalierPompe:JournalierPompe=new JournalierPompe();
  selectedLigneJournalier:LigneJournalier[]=[];
  journalierId: any;
  journalier:Journalier=new Journalier();
  AddjournalierPompe:boolean=false;


  selectedJournalierPompes:JournalierPompe[]=[];
  constructor(private router: Router,
              private bassinService :BassinService,
              private route: ActivatedRoute,
              private puitService:PuitService,
              private pompeService :PompeService,
              private journalierService :JournalierService,
              private jounalierPompeService:JournalierPompeService,
              private ligneJournalierService:LigneJournalierService

  )
  {}



  ngOnInit(): void {


this.getAllBassin();
this.getAllPuits();
this.getAllPompes()
    this.journalierId = this.route.snapshot.paramMap.get('id');
if(this.journalierId!=null)
  this.getJournalierById();
  }

getAllBassin(){
    this.bassinService.getAllBassinsDTO().subscribe(value => {
      this.bassins = value
      console.log(new JsonPipe().transform(this.bassins))
    })
}
  getAllPuits(){
    this.puitService.getAllPuits().subscribe(value => this.puits=value)
  }

  getAllPompes(){
this.pompeService.getAllPompes().subscribe(value => this.pompes=value)
  }
  getJournalierById(){
    this.journalierService.getJournalierById(this.journalierId).subscribe(value => this.journalier=value)
  }
  retour() {
    this.router.navigate(['/daily']);
  }


  onGlobalFilter(dt: Table, $event: Event) {
  }



  ajouterJournalierPompe() {
    this.journalier.ligneJournalierList.push(new LigneJournalier())
  }


  protected readonly getToken = getToken;

  public saveUpdateLigneJournalier(ligneJournalier: LigneJournalier) {
this.journalierService.updateJournalier(this.journalier).subscribe( value => console.log(value))
  }

  public updateLigneJournalier() {
  }

  public deleteLigneJournalier(ligneJournalier: LigneJournalier) {
this.ligneJournalierService.deleteLigneJournalier(ligneJournalier.id).subscribe(value => this.getJournalierById()
)
  }


  public async AddjournalierPompeList(ligneJournalier: LigneJournalier): Promise<void> {
    this.ligneJournalier = ligneJournalier;
    await this.getAllpompesUtilisee();
    this.AddjournalierPompe = true;
  }
  // =======================JournalierPompe=======================

  public updateJournalierPompe(jounalierPompe: JournalierPompe) {
this.journalierPompe=jounalierPompe;
  }

  public saveUpdateJounalierPompe() {
    this.journalierPompe.volumePompage=this.journalierPompe.debit*this.journalierPompe.dureePompage;
this.jounalierPompeService.updateJournalierPompe(this.journalierPompe).subscribe(value =>
  // @ts-ignore
  this.journalierPompe=new JournalierPompe()
)


  }

  public deleteJounalierPompe(jounalierPompe: JournalierPompe) {
    if(jounalierPompe.id!==0){
    this.jounalierPompeService.deleteJournalierPompe(jounalierPompe.id).subscribe(value =>       this.ligneJournalier.journalierPompeList=  this.ligneJournalier.journalierPompeList.filter(value => value.id!==jounalierPompe.id ))
    }
    else{
      this.ligneJournalier.journalierPompeList=  this.ligneJournalier.journalierPompeList.filter(value => value.id!==jounalierPompe.id )
    }
  }

  public hideDialogAddJournalierPompe() {
    this.AddjournalierPompe=false ;
  }

  public saveJournalierPompe() {
    this.journalierPompe.id=-1*(new  Date().getTime());

    this.journalierPompe.volumePompage=this.journalierPompe.debit*this.journalierPompe.dureePompage;

    this.ligneJournalier.journalierPompeList.push(this.journalierPompe)
    // @ts-ignore
    this.journalierPompe=new JournalierPompe();

  }

listPompes:Pompe[]=[]
  async getAllpompesUtilisee(): Promise<void> {
    this.listPompes = [];
    this.ligneJournalier.puitUtilises.forEach(puit => {
      puit.pompeList?.forEach(value => this.listPompes.unshift(value))
    });
  }

  protected readonly JournalierPompe = JournalierPompe;

}
