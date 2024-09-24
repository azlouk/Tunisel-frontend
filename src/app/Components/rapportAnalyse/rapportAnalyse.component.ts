import { Component } from '@angular/core';
import {AjouterPrelevmentChimiqueComponent} from "../ajouter-prelevment-chimique/ajouter-prelevment-chimique.component";
import {AjouterPrelevmentPhysiqueComponent} from "../ajouter-prelevment-physique/ajouter-prelevment-physique.component";
import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {ToolbarModule} from "primeng/toolbar";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {CalendarModule} from "primeng/calendar";
import {DatePipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {RadioButtonModule} from "primeng/radiobutton";
import {TooltipModule} from "primeng/tooltip";
import {TabViewModule} from "primeng/tabview";
import {ListboxModule} from "primeng/listbox";
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {Puit} from "../../Models/puit";
import {Bassin} from "../../Models/bassin";
import {Sbnl} from "../../Models/sbnl";
import {Bande} from "../../Models/bande";
import {Sbl} from "../../Models/sbl";
import {Sblf} from "../../Models/sblf";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {ActivatedRoute, Router} from "@angular/router";
import {PuitService} from "../../Services/puit.service";
import {BassinService} from "../../Services/bassin.service";
import {SbnlService} from "../../Services/sbnl.service";
import {SblService} from "../../Services/sbl.service";
import {SblfService} from "../../Services/sblf.service";
import {AnalyseChimiqueService} from "../../Services/analyse-chimique.service";
import {BandeService} from "../../Services/bande.service";
import Swal from "sweetalert2";
import {AnalysePhysiqueService} from "../../Services/analysePhysique.service";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {Tamis} from "../../Models/tamis";
import {TamisService} from "../../Services/tamis.service";
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputTextareaModule} from "primeng/inputtextarea";
import {getToken} from "../../../main";
import {RapportAnalyseService} from "../../Services/rapport-analyse.service";
import {RippleModule} from "primeng/ripple";

@Component({
  selector: 'app-analyse',
  standalone: true,
  imports: [
    AjouterPrelevmentChimiqueComponent,
    AjouterPrelevmentPhysiqueComponent,
    ButtonModule,
    SharedModule,
    ToolbarModule,
    InputNumberModule,
    FormsModule,
    FloatLabelModule,
    CalendarModule,
    NgIf,
    InputTextModule,
    RadioButtonModule,
    TooltipModule,
    TabViewModule,
    ListboxModule,
    CheckboxModule,
    NgForOf,
    DatePipe,
    DialogModule,
    DropdownModule,
    NgClass,
    TableModule,
    ToastModule,
    AutoCompleteModule,
    InputTextareaModule,
    RippleModule
  ],
  templateUrl: './rapportAnalyse.component.html',
  styleUrl: './rapportAnalyse.component.css'
})
export class RapportAnalyseComponent {
  puits: Puit[] = [];
  selectedPuit: Puit = {};
  bassins: Bassin[] = [];
  selectedBassin: Bassin = {};
  sbnls: Sbnl[] = [];
  selectedSbnl: Sbnl = {};
  bandes: Bande[] = [];
  selectedBande: Bande = {};
  sbls: Sbl[] = [];
  selectedSbl: Sbl = {};
  sblfs: Sblf[] = [];
  selectedSblf: Sblf = {};
  checked: boolean = false;
  analysesChimique: AnalysesChimique = {};
  attributs: any[] = [];


  private analyseChimiqueId: any;
  public isUpdateAnalyseChimique = false;
  visibleDetails: boolean = false;
  SelectAll: boolean = false;
  checkedChimique: boolean = true;
  checkedPhysique: boolean = true;
  cols: any[] = [];
  // ================Physique===============

  analysesPhysique: AnalysesPhysique = {};

  private analysePhysiqueId: any;
  public isUpdateAnalysePhysique = false;

  // ======================
  visibale: boolean = false;
  listeTamis: Tamis[] = [];
  tamis: Tamis = {};
  isUpdateTamis: boolean = false;

  // =====================
  selectedIntervention: any;
  // ================Physique===============
  datasel: any = [];

  filtereddatasel: any[] = [];
  dataMatiere: any = [];
  filtereddataMatire: any[]=[]

  constructor(private router: Router,
              private puitService: PuitService,
              private bassinService: BassinService,
              private sbnlService: SbnlService,
              private sblService: SblService,
              private sblfService: SblfService,
              private analyseChimiqueService: AnalyseChimiqueService,
              private route: ActivatedRoute,
              private bandeService: BandeService,
              private analysePhysiqueService: AnalysePhysiqueService,
              private tamisService: TamisService,
              private rapportAnalyseService: RapportAnalyseService,
  ) {
  }


  ngOnInit(): void {

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
     this.dataMatiere=["Salt","Brine"];
//Init de attributs

    this.attributs= [
      {name:'d',checked:false,label:'density', value:this.analysesChimique.densite},
      {name:'MS',checked:false,label:'Suspended matter', value:this.analysesChimique.matiereEnSuspension },
      {name:'S',checked:false,label:'salinity', value:this.analysesChimique.salinite},
      {name:'Ca',checked:false,label:'calcium', value:this.analysesChimique.calcium},
      {name:'Mg',checked:false,label:'magnesium', value:this.analysesChimique.magnesium},
      {name:'SO₄',checked:false,label:'sulfate', value:this.analysesChimique.sulfate},
      {name:'H₂O',checked:false,label:'moisture', value:this.analysesChimique.humidite},
      {name:'MI',checked:false,label:'Matter insoluble', value:this.analysesChimique.matiereInsoluble},
      {name:'K',checked:false,label:'Potassium', value:this.analysesChimique.potassium},
      {name:'Na',checked:false,label:'Sodium', value:this.analysesChimique.sodium},
      {name:'Cl',checked:false,label:'chloride', value:this.analysesChimique.chlorure},
      {name:'pH',checked:false,label:'pH', value:this.analysesChimique.ph},
      {name:'NaCl',checked:false,label:'sodium chloride', value:this.analysesChimique.chlorureDeSodium},
      {name:'Fe(CN)₆',checked:false,label:'ferrocyanide ', value:this.analysesChimique.ferrocyanure},

    ]
    this.selectedPuit = {};
    this.selectedBassin = {};
    this.selectedSbnl = {};
    this.selectedSbl = {};
    this.selectedSblf = {}


    this.analyseChimiqueId = this.route.snapshot.paramMap.get('id');
    this.isUpdateAnalyseChimique = this.analyseChimiqueId !== null
    this.analysesChimique.reference = "R-" + new Date().getMonth() + new Date().getFullYear()

    if (!this.isUpdateAnalyseChimique) {
      // @ts-ignore
      this.analysesChimique.dateAnalyse = new Date().toISOString().split('T')[0]
    }

    if (this.isUpdateAnalyseChimique == true) {
      this.analyseChimiqueService.getElementByAnalyseChimiqueId(this.analyseChimiqueId).subscribe((value: any) => {
        this.selectedPuit = value.puit
        this.selectedBassin = value.bassin;
        this.selectedSbl = value.sbl;
        this.selectedSbnl = value.sbnl;
        this.selectedSblf = value.sblf;
        this.selectedBande = value.bande;

      }, error => {

      });
      this.analyseChimiqueService.getAnalyseChimiqueById(this.analyseChimiqueId).subscribe(value => {
        this.analysesChimique = value;
        this.attributs[0].value = this.analysesChimique.densite;
        this.attributs[1].value = this.analysesChimique.matiereEnSuspension;
        this.attributs[2].value = this.analysesChimique.salinite;
        this.attributs[3].value = this.analysesChimique.calcium;
        this.attributs[4].value = this.analysesChimique.magnesium;
        this.attributs[5].value = this.analysesChimique.sulfate;
        this.attributs[6].value = this.analysesChimique.humidite;
        this.attributs[7].value = this.analysesChimique.matiereInsoluble;
        this.attributs[8].value = this.analysesChimique.potassium;
        this.attributs[9].value = this.analysesChimique.sodium;
        this.attributs[10].value = this.analysesChimique.chlorure;
        this.attributs[11].value = this.analysesChimique.ph;
        this.attributs[12].value = this.analysesChimique.chlorureDeSodium;
        this.attributs[13].value = this.analysesChimique.ferrocyanure;
        for (const attribut of this.attributs) {
          attribut.checked = attribut.value != null;
        }

      }, error => error)
    }

    this.puitService.getAllPuits().subscribe((v: Puit[]) => {
      this.puits = v;


    }, error => {
      console.log(error)
    })

    this.bassinService.getAllBassinsDTO()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;
      }, error => {
        console.log('Error fetching users:', error);
      });

    this.sbnlService.getAllSbnlsDTO().subscribe((v: Sbnl[]) => {
      this.sbnls = v;

    }, error => {
      console.log(error)
    });
    this.bandeService.getAllBandesDTO().subscribe((v: Bande[]) => {
      this.bandes = v;

    }, error => {
      console.log(error)
    })

    this.sblService.getAllSblDTO().subscribe((v: Sbl[]) => {
      this.sbls = v;

    }, error => {
      console.log(error)
    })

    this.sblfService.getAllSblfsDTO().subscribe((v: Sblf[]) => {
      this.sblfs = v;


    }, error => {
      console.log(error)
    })

    // ==================Physique================
    this.isUpdateTamis = false;
    this.analysePhysiqueId = this.route.snapshot.paramMap.get('id');
    this.isUpdateAnalysePhysique = this.analysePhysiqueId !== null
    this.analysesPhysique.reference = "Gr-" + new Date().getFullYear() + "_" + new Date().getMonth() + "_" + new Date().getDay()


    if (this.analysePhysiqueId) {
      this.analysePhysiqueService.getElementByAnalysesPhysiquesId(this.analysePhysiqueId).subscribe((value: any) => {

        this.selectedBassin = value.bassin;
        this.selectedSbl = value.sbl;
        this.selectedSbnl = value.sbnl;
        this.selectedSblf = value.sblf;
        this.selectedBande = value.bande;

      }, error => {

      });

      this.analysePhysiqueService.getAnalysesPhysiquesById(this.analysePhysiqueId).subscribe(value => {
        this.analysesPhysique = value;
        this.listeTamis = this.analysesPhysique.tamisList == undefined ? [] : this.analysesPhysique.tamisList;

      }, error => error)
    }

    this.bassinService.getAllBassinsDTO()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;
      }, error => {
        console.log('Error fetching users:', error);
      });

    this.sbnlService.getAllSbnlsDTO().subscribe((v: Sbnl[]) => {
      this.sbnls = v;

    }, error => {
      console.log(error)
    });

    this.bandeService.getAllBandesDTO().subscribe((v: Bande[]) => {
      this.bandes = v;

    }, error => {
      console.log(error)
    })

    this.sblService.getAllSblDTO().subscribe((v: Sbl[]) => {
      this.sbls = v;
    }, error => {
      console.log(error)
    })

    this.sblfService.getAllSblfsDTO().subscribe((v: Sblf[]) => {
      this.sblfs = v;

    }, error => {
      console.log(error)
    })

    // ==================Physique================
  }


  retourph() {
    this.router.navigate(['/dash']);
  }


  saveAnalyseChimique() {


    this.analysesChimique.densite = this.attributs[0].value;
    this.analysesChimique.matiereEnSuspension = this.attributs[1].value;
    this.analysesChimique.salinite = this.attributs[2].value;
    this.analysesChimique.calcium = this.attributs[3].value;
    this.analysesChimique.magnesium = this.attributs[4].value;
    this.analysesChimique.sulfate = this.attributs[5].value;
    this.analysesChimique.humidite = this.attributs[6].value;
    this.analysesChimique.matiereInsoluble = this.attributs[7].value;
    this.analysesChimique.potassium = this.attributs[8].value;
    this.analysesChimique.sodium = this.attributs[9].value;
    this.analysesChimique.chlorure = this.attributs[10].value;
    this.analysesChimique.ph = this.attributs[11].value;
    this.analysesChimique.chlorureDeSodium = this.attributs[12].value;
    this.analysesChimique.ferrocyanure = this.attributs[13].value;
    //Test Select Of Stock
    try {
      if (this.selectedPuit.hasOwnProperty('id') || this.selectedSbnl.hasOwnProperty("id") || this.selectedBassin.hasOwnProperty("id") || this.selectedSbl.hasOwnProperty("id") || this.selectedSblf.hasOwnProperty("id") || this.selectedBande.hasOwnProperty("id")) {
        if (this.isUpdateAnalyseChimique) {
          this.analyseChimiqueService.updateAnalyseChimique(this.analysesChimique,2,"bassin").subscribe(value => this.router.navigate(['/analyseChimique']))
        } else {

          this.analysesChimique.id = 0;



          if (this.selectedPuit.hasOwnProperty('id')) {
            this.selectedPuit.analysesChimiques = [];
            this.selectedPuit.analysesChimiques.push(this.analysesChimique);
            // alert(new JsonPipe().transform(this.selectedPuit))
            this.analyseChimiqueService.addAnalyseChimique(this.selectedPuit).subscribe(value => this.router.navigate(['/analyseChimique']))
          } else if (this.selectedBassin.hasOwnProperty('id')) {
            this.selectedBassin.analysesChimiques = [];
            this.selectedBassin.analysesChimiques.push(this.analysesChimique);
            this.analyseChimiqueService.addAnalyseChimiqueToBassin(this.selectedBassin).subscribe(value => this.router.navigate(['/analyseChimique']))
          } else if (this.selectedSbnl.hasOwnProperty('id')) {
            this.selectedSbnl.analysesChimiques = [];
            this.selectedSbnl.analysesChimiques.push(this.analysesChimique);
            this.analyseChimiqueService.addAnalyseChimiqueToSbnl(this.selectedSbnl).subscribe(value => this.router.navigate(['/analyseChimique']))
          } else if (this.selectedBande.hasOwnProperty('id') == true) {
            // alert(new JsonPipe().transform(this.selectedBande))
            this.selectedBande.analysesChimiques = [];
            this.selectedBande.analysesChimiques.push(this.analysesChimique);
            this.analyseChimiqueService.addAnalyseChimiqueToBande(this.selectedBande).subscribe(value => this.router.navigate(['/analyseChimique']))
          } else if (this.selectedSbl.hasOwnProperty('id')) {
            this.selectedSbl.analysesChimiques = [];
            this.selectedSbl.analysesChimiques.push(this.analysesChimique);
            this.analyseChimiqueService.addAnalyseChimiqueToSbl(this.selectedSbl).subscribe(value => this.router.navigate(['/analyseChimique']))
          } else if (this.selectedSblf.hasOwnProperty('id')) {
            this.selectedSblf.analysesChimiques = [];
            this.selectedSblf.analysesChimiques.push(this.analysesChimique);
            this.analyseChimiqueService.addAnalyseChimiqueToSblf(this.selectedSblf).subscribe(value => this.router.navigate(['/analyseChimique']))
          }
        }

      }

    } catch (e) {
      Swal.fire({
        title: "Erreur de séléction",
        icon: "error",
        text: "Sélectionner puit, bassin ,bande ,sbnl ,sbln ou sblf"
      })
    }
  }

  getattributs(): any {
    return this.attributs.filter(value => value.checked == true);
  }

  openNew() {
    this.visibleDetails = true;
  }

  SelectAllCheck() {
    this.attributs.forEach(value => {
      value.checked = this.SelectAll;
    })
  }


  protected readonly Date = Date;


  selectPuit() {
    // alert(new JsonPipe().transform(this.selectedPuit))
    this.selectedBassin = {};
    this.selectedSbnl = {};
    this.selectedBande = {};
    this.selectedSbl = {};
    this.selectedSblf = {};

  }

  selectBassin() {
    //alert(new JsonPipe().transform(this.selectedBassin))

    this.selectedPuit = {};
    this.selectedSbnl = {};
    this.selectedBande = {};
    this.selectedSbl = {};
    this.selectedSblf = {};

  }

  selectSBNL() {
    //alert(new JsonPipe().transform(this.selectedSbnl))

    this.selectedBassin = {};
    this.selectedPuit = {};
    this.selectedBande = {};
    this.selectedSbl = {};
    this.selectedSblf = {};

  }

  selectBande() {
    //alert(new JsonPipe().transform(this.selectedBande))

    this.selectedBassin = {};
    this.selectedSbnl = {};
    this.selectedPuit = {};
    this.selectedSbl = {};
    this.selectedSblf = {};

  }

  selectSBL() {
    // alert(new JsonPipe().transform(this.selectedSbl))

    this.selectedBassin = {};
    this.selectedSbnl = {};
    this.selectedBande = {};
    this.selectedPuit = {};
    this.selectedSblf = {};

  }

  selectSBLF() {
    // alert(new JsonPipe().transform(this.selectedSblf))

    this.selectedBassin = {};
    this.selectedSbnl = {};
    this.selectedBande = {};
    this.selectedSbl = {};
    this.selectedPuit = {};

  }

//=======================Physique============


  retour() {
    this.router.navigate(['/analysePhysique']);
  }


  saveRapport() {

    this.analysesChimique.densite=this.attributs[0].value;
    this.analysesChimique.matiereEnSuspension=this.attributs[1].value;
    this.analysesChimique.salinite=this.attributs[2].value;
    this.analysesChimique.calcium=this.attributs[3].value;
    this.analysesChimique.magnesium=this.attributs[4].value;
    this.analysesChimique.sulfate=this.attributs[5].value;
    this.analysesChimique.humidite=this.attributs[6].value;
    this.analysesChimique.matiereInsoluble=this.attributs[7].value;
    this.analysesChimique.potassium=this.attributs[8].value;
    this.analysesChimique.sodium=this.attributs[9].value;
    this.analysesChimique.chlorure=this.attributs[10].value;
    this.analysesChimique.ph=this.attributs[11].value;
    this.analysesChimique.chlorureDeSodium=this.attributs[12].value;
    this.analysesChimique.ferrocyanure=this.attributs[13].value;

    this.analysesPhysique.reference = this.analysesChimique.reference;
    this.analysesPhysique.matiere=this.analysesChimique.matiere;
    this.analysesPhysique.dateAnalyse=this.analysesChimique.dateAnalyse;
    this.analysesChimique.qualite=this.analysesPhysique.qualite;
    this.analysesPhysique.pluie=this.analysesChimique.pluie;

    if (this.selectedBassin!==null && this.selectedBassin.hasOwnProperty('id')) {
      this.selectedBassin.analysesChimiques = [];
      if (this.checkedChimique == true) {
        this.selectedBassin.analysesChimiques.push(this.analysesChimique);
      }
      this.selectedBassin.analysesPhysiques = [];
      if (this.checkedPhysique == true) {
        this.analysesPhysique.tamisList = this.listeTamis;
        this.selectedBassin.analysesPhysiques.push(this.analysesPhysique);
      }
      this.rapportAnalyseService.addRapportToBassin(this.selectedBassin).subscribe(value => {
        this.router.navigate(['/analysePhysique']);
      }, error => console.log(error));
    }
    else if (this.selectedSbnl!==null && this.selectedSbnl.hasOwnProperty('id')) {
      this.selectedSbnl.analysesChimiques = [];
      if (this.checkedChimique == true) {
        this.selectedSbnl.analysesChimiques.push(this.analysesChimique);
      }
      this.selectedSbnl.analysesPhysiques = [];
      if (this.checkedPhysique == true) {
        this.analysesPhysique.tamisList = this.listeTamis;
        this.selectedSbnl.analysesPhysiques.push(this.analysesPhysique);
      }

      this.rapportAnalyseService.addRapportToSbnl(this.selectedSbnl).subscribe(value => {
        this.router.navigate(['/analysePhysique']);
      }, error => console.log(error));
    }


    else if (this.selectedSbl!==null && this.selectedSbl.hasOwnProperty('id')) {
      this.selectedSbl.analysesChimiques = [];
      if (this.checkedChimique == true) {
        this.selectedSbl.analysesChimiques.push(this.analysesChimique);
      }
      this.selectedSbl.analysesPhysiques = [];
      if (this.checkedPhysique == true) {
        this.analysesPhysique.tamisList = this.listeTamis;
        this.selectedSbl.analysesPhysiques.push(this.analysesPhysique);
      }

      this.rapportAnalyseService.addRapportToSbl(this.selectedSbl).subscribe(value => {
        this.router.navigate(['/analysePhysique']);
      }, error => console.log(error));
    }

    else if (this.selectedSblf!==null && this.selectedSblf.hasOwnProperty('id')) {
      this.selectedSblf.analysesChimiques = [];
      if (this.checkedChimique == true) {
        this.selectedSblf.analysesChimiques.push(this.analysesChimique);
      }
      this.selectedSblf.analysesPhysiques = [];
      if (this.checkedPhysique == true) {
        this.analysesPhysique.tamisList = this.listeTamis;
        this.selectedSblf.analysesPhysiques.push(this.analysesPhysique);
      }

      this.rapportAnalyseService.addRapportToSblf(this.selectedSblf).subscribe(value => {
        this.router.navigate(['/analysePhysique']);
      }, error => console.log(error));
    }
    else if (this.selectedBande!==null && this.selectedBande.hasOwnProperty('id')) {
      this.selectedBande.analysesChimiques = [];
      if (this.checkedChimique == true) {
        this.selectedBande.analysesChimiques.push(this.analysesChimique);
      }
      this.selectedBande.analysesPhysiques = [];
      if (this.checkedPhysique == true) {
        this.analysesPhysique.tamisList = this.listeTamis;
        this.selectedBande.analysesPhysiques.push(this.analysesPhysique);
      }

      this.rapportAnalyseService.addRapportToBande(this.selectedBande).subscribe(value => {
        this.router.navigate(['/analysePhysique']);
      }, error => console.log(error));
    }
    else {
      Swal.fire({
        title: "error?",
        text: "Please select Pond or Unwashed or Band or Washed or Washed Ship!",
        icon: "warning"
      });
    }
  }

  // }


  // openNew() {
  //   this.visibleDetails=true;
  // }

  deleteTamis(tamis: any) {
    if (this.isUpdateAnalysePhysique == true) {
      this.tamisService.deleteTamis(tamis.id).subscribe(value => {
        this.analysePhysiqueService.getAnalysesPhysiquesById(this.analysePhysiqueId).subscribe(value => {
          this.analysesPhysique = value;
          this.listeTamis = this.analysesPhysique.tamisList == undefined ? [] : this.analysesPhysique.tamisList;
        })

      })
      this.listeTamis = this.listeTamis.filter(item => item !== tamis)
    } else {
      this.listeTamis = this.listeTamis.filter(item => item !== tamis);
    }

  }


  hideDialog() {
    this.visibale = false;
  }

  onGlobalFilter(dt: Table, $event: Event) {

  }


  // ajouterTamis() {
  //   this.tamis = {}
  //   this.visibale = true;
  //   this.isUpdateTamis = false;
  // }
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



//=======================Physique============
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

  filterMatiere(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];

    let query = event.query;

    for (let i = 0; i < (this.dataMatiere as any[]).length; i++) {
      let country = (this.dataMatiere as any[])[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filtereddataMatire = filtered;
  }

  protected readonly getToken = getToken;

  updateTamis() {

  }

  calculTotalRefus() {
    return this.listeTamis.reduce((previousValue, currentValue) => previousValue+ (currentValue!==undefined && currentValue.refus!=undefined?parseFloat(currentValue.refus.toString()):0),0)
  }

}
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
