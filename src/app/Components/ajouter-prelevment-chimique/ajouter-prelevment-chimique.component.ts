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


  private analyseChimiqueId: any;
  public isUpdateAnalyseChimique = false;
  visibleDetails: boolean = false;
  SelectAll: boolean = false;

  cols: any[] = [];


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

    this.attributs = [
      {name: 'd', checked: false, label: 'Densité', value: this.analysesChimique.densite, unite: 'g/cm 3'},
      {
        name: 'MS',
        checked: false,
        label: 'Matiére en suspension',
        value: this.analysesChimique.matiereEnSuspension,
        unite: 'mg/L'
      },
      {name: 'S', checked: false, label: 'Salinité', value: this.analysesChimique.salimite, unite: 'g/L'},
      {name: 'Ca', checked: false, label: 'Calcium', value: this.analysesChimique.calcium, unite: 'ppm'},
      {name: 'Mg', checked: false, label: 'Magnésium', value: this.analysesChimique.magnesium, unite: 'ppm'},
      {name: 'SO4', checked: false, label: 'Sulfate', value: this.analysesChimique.sulfate, unite: 'ppm'},
      {name: 'H2o', checked: false, label: 'Humidité', value: this.analysesChimique.humidite, unite: '% '},
      {
        name: 'Mi',
        checked: false,
        label: 'Matiére insoluble',
        value: this.analysesChimique.matiereInsoluble,
        unite: 'ppm'
      },
      {name: 'K', checked: false, label: 'Potassium', value: this.analysesChimique.potassium, unite: 'mmol/L'},
      {name: 'Na', checked: false, label: 'Sodium', value: this.analysesChimique.sodium, unite: 'mmol'},
      {name: 'Cl', checked: false, label: 'Chlorure', value: this.analysesChimique.chlorure, unite: 'meq · L–1'},
      {name: 'PH', checked: false, label: 'PH', value: this.analysesChimique.ph, unite: 'pH'},
      {
        name: 'Nacl',
        checked: false,
        label: 'Chlorure de sodium',
        value: this.analysesChimique.chlorureDeSodium,
        unite: '%'
      },
      {name: 'Fe(cn)6', checked: false, label: 'Frrocyanure', value: this.analysesChimique.ferrocyanure, unite: 'ppm'},

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
        this.attributs[2].value = this.analysesChimique.salimite;
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
    this.analysesChimique.salimite = this.attributs[2].value;
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

    if (this.selectedPuit.hasOwnProperty('id') || this.selectedSbnl.hasOwnProperty("id") || this.selectedBassin.hasOwnProperty("id") || this.selectedSbl.hasOwnProperty("id") || this.selectedSblf.hasOwnProperty("id") || this.selectedBande.hasOwnProperty("id")) {
      if (this.isUpdateAnalyseChimique) {
        this.analyseChimiqueService.updateAnalyseChimique(this.analysesChimique).subscribe(value => this.router.navigate(['/analyseChimique']))
      } else {

        this.analysesChimique.id = 0;
        //console.error("Data analyse Chimique:" + new JsonPipe().transform(this.analysesChimique))


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
          alert(new JsonPipe().transform(this.selectedBande))
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
    alert(new JsonPipe().transform(this.selectedPuit))
    this.selectedBassin = {};
    this.selectedSbnl = {};
    this.selectedBande = {};
    this.selectedSbl = {};
    this.selectedSblf = {};

  }

  selectBassin() {
    alert(new JsonPipe().transform(this.selectedBassin))

    this.selectedPuit = {};
    this.selectedSbnl = {};
    this.selectedBande = {};
    this.selectedSbl = {};
    this.selectedSblf = {};

  }

  selectSBNL() {
    alert(new JsonPipe().transform(this.selectedSbnl))

    this.selectedBassin = {};
    this.selectedPuit = {};
    this.selectedBande = {};
    this.selectedSbl = {};
    this.selectedSblf = {};

  }

  selectBande() {
    alert(new JsonPipe().transform(this.selectedBande))

    this.selectedBassin = {};
    this.selectedSbnl = {};
    this.selectedPuit = {};
    this.selectedSbl = {};
    this.selectedSblf = {};

  }

  selectSBL() {
    alert(new JsonPipe().transform(this.selectedSbl))

    this.selectedBassin = {};
    this.selectedSbnl = {};
    this.selectedBande = {};
    this.selectedPuit = {};
    this.selectedSblf = {};

  }

  selectSBLF() {
    alert(new JsonPipe().transform(this.selectedSblf))

    this.selectedBassin = {};
    this.selectedSbnl = {};
    this.selectedBande = {};
    this.selectedSbl = {};
    this.selectedPuit = {};

  }
}
