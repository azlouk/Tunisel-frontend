import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {MessageService, SharedModule} from "primeng/api";
import {ToolbarModule} from "primeng/toolbar";
import {Router} from "@angular/router";
import {ProductService} from "../../Services/product.service";
import {PuitService} from "../../Services/puit.service";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {CalendarModule} from "primeng/calendar";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
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

  ],
  templateUrl: './ajouter-prelevment-chimique.component.html',
  styleUrl: './ajouter-prelevment-chimique.component.css'
})
export class AjouterPrelevmentChimiqueComponent implements OnInit{
  puits: Puit[] = [];
  selectedPuit:Puit={};
  bassins: Bassin[] = [];
  selectedBassin: Bassin = {};
  sbnls: Sbnl[] = [];
  selectedSbnl:Sbnl={};
  sbls: Sbl[] = [];
  selectedSbl:Sbl={};
  sblfs: Sblf[] = [];
  selectedSblf:Sblf={};
  checked: boolean = false;
  analysesChimique: AnalysesChimique={} ;
  attributs: any[] = [
    {name:'D',checked:false,label:'Densité', value:this.analysesChimique.densite},
    {name:'Ms',checked:false,label:'Matiére en suspension', value:this.analysesChimique.matiereEnSuspension},
    {name:'S',checked:false,label:'Salimité', value:this.analysesChimique.salimite},
    {name:'Ca',checked:false,label:'Calcium', value:this.analysesChimique.calcium},
    {name:'Mg',checked:false,label:'Magnésium', value:this.analysesChimique.magnesium},
    {name:'So4',checked:false,label:'Sulfate', value:this.analysesChimique.sulfate},
    {name:'H2o',checked:false,label:'Humidité', value:this.analysesChimique.humidite},
    {name:'Mi',checked:false,label:'Matiére insoluble', value:this.analysesChimique.matiereInsoluble},
    {name:'K',checked:false,label:'Potassium', value:this.analysesChimique.potassium},
    {name:'Na',checked:false,label:'Sodium', value:this.analysesChimique.sodium},
    {name:'Cl',checked:false,label:'Chlorure', value:this.analysesChimique.chlorure},
    {name:'PH',checked:false,label:'PH', value:this.analysesChimique.ph},
    {name:'Nacl',checked:false,label:'Chlorure de sodium', value:this.analysesChimique.chlorureDeSodium},
    {name:'Fe',checked:false,label:'Frrocyanure', value:this.analysesChimique.ferrocyanure},

  ];
  constructor(private router: Router,
              private puitService :PuitService,
              private bassinService :BassinService,
              private sbnlService :SbnlService,
              private sblService :SblService,
              private sblfService :SblfService)
  {}



  ngOnInit(): void {
    this.puitService.getAllPuits().subscribe((v:  Puit[]) => {
      this.puits=v;
      console.log(new JsonPipe().transform("====================>>>>>>"+this.puits))

    },error => {
      console.log(error)})

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
    this.router.navigate(['/analyseChimique']);
  }



  saveAnalyseChimique() {
    console.log(new JsonPipe().transform(this.attributs))
  }

  getattributs():any {
    return   this.attributs.filter(value => value.checked==true);
  }
}
