import {Component, Input, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {MessageService, SharedModule} from "primeng/api";
import {ToolbarModule} from "primeng/toolbar";
import {ActivatedRoute, Router} from "@angular/router";
import {PuitService} from "../../Services/puit.service";
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
import {Puit} from "../../Models/puit";
import {Bassin} from "../../Models/bassin";
import {BassinService} from "../../Services/bassin.service";
import {Sbnl} from "../../Models/sbnl";
import {SbnlService} from "../../Services/sbnl.service";
import {Sbl} from "../../Models/sbl";
import {SblService} from "../../Services/sbl.service";
import {Sblf} from "../../Models/sblf";
import {SblfService} from "../../Services/sblf.service";
import {CheckboxModule} from "primeng/checkbox";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {AnalyseChimiqueService} from "../../Services/analyse-chimique.service";
import {AnalyseChimiqueComponent} from "../analyse-chimique/analyse-chimique.component";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import Swal from "sweetalert2";
import {Bande} from "../../Models/bande";
import {BandeService} from "../../Services/bande.service";
import {InputTextareaModule} from "primeng/inputtextarea";
import {getToken} from "../../../main";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";

@Component({
  selector: 'app-ajouter-prelevment-chimique',
  standalone: true,
  imports: [
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
    InputTextareaModule,
    AutoCompleteModule

  ],
  templateUrl: './ajouter-prelevment-chimique.component.html',
  styleUrl: './ajouter-prelevment-chimique.component.css'
})
export class AjouterPrelevmentChimiqueComponent implements OnInit {
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

  filtereddatasel: any[] = [];
  private analyseChimiqueId: any;
  public isUpdateAnalyseChimique = false;
  visibleDetails: boolean = false;
  SelectAll: boolean = false;

  cols: any[] = [];
  datasel:string[]=[]
  constructor(private router: Router,
              private puitService: PuitService,
              private bassinService: BassinService,
              private sbnlService: SbnlService,
              private sblService: SblService,
              private sblfService: SblfService,
              private analyseChimiqueService: AnalyseChimiqueService,
              private route: ActivatedRoute,
              private bandeService: BandeService) {
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
      , " Sel Navire"];


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
      {name:'NaCL',checked:false,label:'chlorure de sodium', value:this.analysesChimique.chlorureDeSodium},
      {name:'Fe(CN)₆',checked:false,label:'ferrocyanure ', value:this.analysesChimique.ferrocyanure},

    ]
    this.selectedPuit = {};
    this.selectedBassin = {};
    this.selectedSbnl = {};
    this.selectedSbl = {};
    this.selectedSblf = {}


    this.analyseChimiqueId = this.route.snapshot.paramMap.get('id');
    this.isUpdateAnalyseChimique = this.analyseChimiqueId !== null
    this.analysesChimique.reference = "R-" + new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDay()

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
        console.log('ooooooooooooooooo  ', new JsonPipe().transform(value))
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
      //  console.log(new JsonPipe().transform("====================>>>>>>"+this.puits))

    }, error => {
      console.log(error)
    })

    this.bassinService.getAllBassins()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;
      }, error => {
        console.log('Error fetching users:', error);
      });

    this.sbnlService.getAllSbnls().subscribe((v: Sbnl[]) => {
      this.sbnls = v;

    }, error => {
      console.log(error)
    });
    this.bandeService.getAllBandes().subscribe((v: Bande[]) => {
      this.bandes = v;

    }, error => {
      console.log(error)
    })

    this.sblService.getAllSbl().subscribe((v: Sbl[]) => {
      this.sbls = v;
      console.log(new JsonPipe().transform("====================>>>>>>" + this.sbls))
    }, error => {
      console.log(error)
    })

    this.sblfService.getAllSblfs().subscribe((v: Sblf[]) => {
      this.sblfs = v;
      console.log(new JsonPipe().transform("====================>>>>>>" + this.sblfs))

    }, error => {
      console.log(error)
    })


  }


  retour() {
    this.router.navigate(['/analyseChimique']);
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


      if (this.isUpdateAnalyseChimique) {
        this.analyseChimiqueService.updateAnalyseChimique(this.analysesChimique).subscribe(value => this.router.navigate(['/analyseChimique']))
      }
      else {

        this.analysesChimique.id = 0;
        //console.error("Data analyse Chimique:" + new JsonPipe().transform(this.analysesChimique))


        if (this.selectedPuit!==null &&  this.selectedPuit.hasOwnProperty('id')) {
          this.selectedPuit.analysesChimiques = [];
          this.selectedPuit.analysesChimiques.push(this.analysesChimique);

          this.analyseChimiqueService.addAnalyseChimique(this.selectedPuit).subscribe(value => this.router.navigate(['/analyseChimique']))
        } else if (  this.selectedBassin!==null &&  this.selectedBassin.hasOwnProperty('id')) {
          this.selectedBassin.analysesChimiques = [];
          this.selectedBassin.analysesChimiques.push(this.analysesChimique);
          this.analyseChimiqueService.addAnalyseChimiqueToBassin(this.selectedBassin).subscribe(value => this.router.navigate(['/analyseChimique']))
        } else if (this.selectedSbnl!==null && this.selectedSbnl.hasOwnProperty('id')) {
          this.selectedSbnl.analysesChimiques = [];
          this.selectedSbnl.analysesChimiques.push(this.analysesChimique);
          this.analyseChimiqueService.addAnalyseChimiqueToSbnl(this.selectedSbnl).subscribe(value => this.router.navigate(['/analyseChimique']))
        } else if (this.selectedBande!==null && this.selectedBande.hasOwnProperty('id') == true) {
          // alert(new JsonPipe().transform(this.selectedBande))
          this.selectedBande.analysesChimiques = [];
          this.selectedBande.analysesChimiques.push(this.analysesChimique);
          this.analyseChimiqueService.addAnalyseChimiqueToBande(this.selectedBande).subscribe(value => this.router.navigate(['/analyseChimique']))
        } else if (this.selectedSbl!==null && this.selectedSbl.hasOwnProperty('id')) {
          this.selectedSbl.analysesChimiques = [];
          this.selectedSbl.analysesChimiques.push(this.analysesChimique);
          this.analyseChimiqueService.addAnalyseChimiqueToSbl(this.selectedSbl).subscribe(value => this.router.navigate(['/analyseChimique']))
        } else if (this.selectedSblf!==null && this.selectedSblf.hasOwnProperty('id')) {
          this.selectedSblf.analysesChimiques = [];
          this.selectedSblf.analysesChimiques.push(this.analysesChimique);
          this.analyseChimiqueService.addAnalyseChimiqueToSblf(this.selectedSblf).subscribe(value => this.router.navigate(['/analyseChimique']))

        }
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
    // alert(new JsonPipe().transform(this.selectedBassin))

    this.selectedPuit = {};
    this.selectedSbnl = {};
    this.selectedBande = {};
    this.selectedSbl = {};
    this.selectedSblf = {};

  }

  selectSBNL() {
   // alert(new JsonPipe().transform(this.selectedSbnl))

    this.selectedBassin = {};
    this.selectedPuit = {};
    this.selectedBande = {};
    this.selectedSbl = {};
    this.selectedSblf = {};

  }

  selectBande() {
    // alert(new JsonPipe().transform(this.selectedBande))

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
}
