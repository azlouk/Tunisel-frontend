import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../Models/product";
import {User} from "../../Models/user";
import {ProductService} from "../../Services/product.service";
import {MessageService, SharedModule} from "primeng/api";
import {UserService} from "../../Services/user.service";
import {CommonModule, DatePipe, JsonPipe, NgClass, NgIf} from "@angular/common";
import {UserType} from "../../Enum/user-type";
import {Table, TableModule} from "primeng/table";
import {Puit} from "../../Models/puit";
import {BassinService} from "../../Services/bassin.service";
import {Bassin} from "../../Models/bassin";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {MultiSelectModule} from "primeng/multiselect";
import {PuitService} from "../../Services/puit.service";
import {AnalysesChimique} from "../../Models/analyses-chimique";
import {Sbl} from "../../Models/sbl";
import {AnalysesPhysique} from "../../Models/analyses-physique";
import {Tamis} from "../../Models/tamis";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {CheckboxModule} from "primeng/checkbox";
import {ListboxModule} from "primeng/listbox";
import {AutoFocusModule} from "primeng/autofocus";

@Component({
  selector: 'app-bassin',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    PaginatorModule,
    PasswordModule,
    RadioButtonModule,
    SharedModule,
    ToolbarModule,
    ToastModule,
    ToolbarModule,
    DialogModule,
    NgClass,
    FormsModule,
    NgIf,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    MultiSelectModule,
    DatePipe,
    CheckboxModule,
    ListboxModule, CommonModule, AutoFocusModule
  ],
  templateUrl: './bassin.component.html',
  styleUrl: './bassin.component.css'
})
export class BassinComponent implements OnInit {
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============
  bassins: Bassin[] = [];

  bassin: Bassin = {};

  selectedBassins: Bassin[] = [];
  SelectetBassin:Bassin={}
  puits: Puit[] = [];
  private isUpdateBassin=false;
  selectedPuit?: Puit;

loading:boolean=false ;
  @ViewChild("pdfpuit") htmlContent: ElementRef | undefined;
  visiblePrint: boolean = false;
  dateToday: Date = new Date();

  DatefiltrageStart: Date = new Date();
  DatefiltrageEnd: Date = new Date();
  public  _selectedColumns: any[]=[];
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  constructor(private productService: ProductService, private messageService: MessageService,private bassinService :BassinService,private puitService:PuitService) { }

  ngOnInit() {


    this.colsfiltre = [
      {id:0, field: 'reference', header: 'reference' ,hide:true},
      { id:1, field: 'dateAnalyse', header: 'Date Analyse' ,hide:false},
      {id:2,  field: 'temperature', header: 'Temperature °C' ,hide:false},
      { id:3, field: 'vent', header: 'wind (km/h)' ,hide:false},
      { id:4, field: 'humidite', header: 'humidity' ,hide:false},
      {id:5,  field: 'densite', header: 'Densite (g/cm 3)',hide:false },
      {id:6,  field: 'matiereEnSuspension', header: 'Suspended Matter (g)',hide:false },
      { id:7, field: 'salimite', header: 'Salimite (psu)' ,hide:false},
      {id:8,  field: 'calcium', header: 'Calcium (mmol/L)' ,hide:false},
      { id:9, field: 'magnesium', header: 'Magnesium (g)' ,hide:false},
      { id:10, field: 'sulfate', header: 'Sulfate (g)' ,hide:false},
      { id:11, field: 'matiereInsoluble', header: 'Insoluble matter (g)',hide:false },
      { id:12, field: 'potassium', header: 'Potassium (mmol/L)' ,hide:false},
      { id:13, field: 'sodium', header: 'Sodium (mmol)' ,hide:false},
      {id:14,  field: 'chlorure', header: 'Chlorure (meq · L–1)' ,hide:false},
      { id:15, field: 'ph', header: 'pH' ,hide:false},
      { id:16, field: 'chlorureDeSodium', header: 'sodium chloride (g)' ,hide:false},
      {id:17,  field: 'ferrocyanure', header: 'Ferrocyanure (g/mol)' ,hide:false},
    ];

    this._selectedColumns = this.colsfiltre;

     this.getAllBassin();
    this.puitService.getAllPuits().subscribe((v:  Puit[]) => {
      this.puits=v;
      console.log(new JsonPipe().transform("====================>>>>>>"+this.puits))

    },error => {
      console.log(error)})
  }

  openNew() {
    this.bassin = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedBassins() {

    this.deleteProductsDialog = true;

  }

  editBassin(bassin: Bassin) {
    // this.isUpdateUser=true;
    this.bassin = { ...bassin };
    this.productDialog = true;
  }

  deleteBassin(bassin: Bassin) {
    this.deleteProductDialog = true;
    this.bassin = { ...bassin };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedBassins.length)
    this.selectedBassins.forEach(selectedUser => {
      this.bassinService.deleteBassin(selectedUser.id).subscribe(
        () => {
          this.bassins = this.bassins.filter(bassin => bassin.id !== selectedUser.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    this.selectedBassins = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.bassin.id", this.bassin.id);
    this.bassins = this.bassins.filter(val => val.id !== this.bassin.id);
    if (this.bassin.id!= null) {
      this.bassinService.deleteBassin(this.bassin.id).subscribe(() => console.log("bassin deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bassin Deleted', life: 3000 });
    this.bassin = {};
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        // @ts-ignore
        this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.product.id = this.createId();
        this.product.code = this.createId();
        this.product.image = 'product-placeholder.svg';
        // @ts-ignore
        this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }
  saveBassin() {
    this.submitted = false;
    this.productDialog=false

    if(this.isUpdateBassin==true) {

      if (this.bassin) {

        this.bassinService.updateBassin(this.bassin).subscribe(() =>{ this.bassinService.getAllBassins()
          .subscribe((bassins: Bassin[]) => {
            this.bassins = bassins;
          } );});
        console.log('bassin updated')

      }
      this.isUpdateBassin=false;
    }
    else
    {


        this.bassinService.addBassin(this.bassin).subscribe(() =>{ this.bassinService.getAllBassins()
          .subscribe((bassins: Bassin[]) => {
            this.bassins = bassins;
          } );});
      console.log('bassin added');
      console.log(new JsonPipe().transform(this.bassin));

    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  getAllBassin() {
    this.loading=true ;
    this.bassinService.getAllBassins()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;
        this.loading=false ;
      }, error => {
        console.log('Error fetching users:', error);
      });
  }

  exportrapport(SelectetBassin: Bassin) {

    this.SelectetBassin = SelectetBassin;
    this.visiblePrint = true
    console.log("---->"+new JsonPipe().transform(this.SelectetBassin));
  }
  filtredate() {
    this.Viderfiltredate()
    const data=this.SelectetBassin.analysesChimiques !== undefined ? this.SelectetBassin.analysesChimiques : []
    const newAnalyse:AnalysesChimique[] =[]
    data.forEach(v => {

      if(v.dateAnalyse!==undefined){
        console.log(typeof v.dateAnalyse )
        const d=v.dateAnalyse+"";
        const dateana:Date=new Date(d)
        console.log("-D-->" + dateana)
        if (  this.AfterTodate(this.DatefiltrageStart,dateana) &&  this.AfterTodate(dateana,this.DatefiltrageEnd)) {
          newAnalyse.push(v);
        } else {
          console.log("no compare")
        }


      }

    })
    this.SelectetBassin.analysesChimiques=[...newAnalyse] ;
    // console.log(new JsonPipe().transform(data))



  }

  clear(dt1: Table) {
    dt1.clear() ;
  }

  Viderfiltredate() {

    this.bassinService.getAllBassins().subscribe((bassins: Bassin[]) => {
      this.selectedBassins = bassins;

      const bassinbassin: Bassin | undefined = this.selectedBassins.find(value => this.SelectetBassin.id == value.id)
      if (bassinbassin)
        this.SelectetBassin = bassinbassin;

    });
  }

  getAnalyse() {
    return this.SelectetBassin.analysesChimiques !== undefined ? this.SelectetBassin.analysesChimiques : []
  }
  getAnalyseGranoli() {
    const data=this.SelectetBassin.analysesPhysiques !== undefined ? this.SelectetBassin.analysesPhysiques : []
    const newAnalyse:AnalysesPhysique[] =[]
    data.forEach(v => {

      if(v.dateAnalyse!==undefined){
        console.log(typeof v.dateAnalyse )
        const d=v.dateAnalyse+"";
        const dateana:Date=new Date(d)
        console.log("-D-->" + dateana)
        if (  this.AfterTodate(this.DatefiltrageStart,dateana) &&  this.AfterTodate(dateana,this.DatefiltrageEnd)) {
          newAnalyse.push(v);
        } else {
          console.log("no compare")
        }

      }

    })
    this.SelectetBassin.analysesPhysiques=[...newAnalyse] ;

    return this.SelectetBassin.analysesPhysiques !== undefined ? this.SelectetBassin.analysesPhysiques : []
  }


  colsfiltre: any[] = [];
  // ListTamisSelected: Tamis={};
  SelectedsbnlPrintAnalyse: AnalysesPhysique={};
  getColsfiltr() {
    return this.colsfiltre.filter(value => value.hide==true)
  }



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


  getTamisFiltred() {
    return this.SelectedsbnlPrintAnalyse.tamisList==undefined?[]:this.SelectedsbnlPrintAnalyse.tamisList
  }
  AfterTodate(date1:Date , date2:Date):boolean{
    console.log(date1+"<"+date2)
    return date1.getDay()<=date2.getDay() && date1.getMonth()<=date2.getMonth() && date1.getFullYear()<=date2.getFullYear()
  }


}
