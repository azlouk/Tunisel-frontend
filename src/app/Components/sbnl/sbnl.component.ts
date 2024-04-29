import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
import {ProductService} from "../../Services/product.service";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {Sbnl} from "../../Models/sbnl";
import {Bassin} from "../../Models/bassin";
import {SbnlService} from "../../Services/sbnl.service";
import {BassinService} from "../../Services/bassin.service";
import {OverlayPanelModule} from "primeng/overlaypanel";

@Component({
  selector: 'app-sbnl',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    NgIf,
    PaginatorModule,
    PasswordModule,
    RadioButtonModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    CalendarModule,
    InputTextModule,
    NgClass,
    OverlayPanelModule
  ],
  templateUrl: './sbnl.component.html',
  styleUrl: './sbnl.component.css'
})
export class SbnlComponent implements OnInit{
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
  sbnls: Sbnl[] = [];

  sbnl:Sbnl={};

  selectedSbnls: Sbnl[] = [];

  private isUpdatesbnl=false;
  bassins: Bassin[] = [];
  visiblePrint: boolean=false;
  constructor(private productService: ProductService, private messageService: MessageService,private sbnlService :SbnlService,private serviceBassin:BassinService) {}

  ngOnInit() {
this.getsbnl()
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'reference', header: 'reference' },
      { field: 'description', header: 'description' },
      { field: 'dateCreation', header: 'dateCreation' },
      { field: 'nom', header: 'nom' },
      { field: 'emplacement', header: 'emplacement' },
      { field: 'etat', header: 'etat' },
      { field: 'dateFermeture', header: 'dateFermeture' },
    ];


  }

  openNew() {
    this.sbnl;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedSbnls() {

    this.deleteProductsDialog = true;

  }

  editSbnl(sbnl: Sbnl) {
    this.isUpdatesbnl=true;


    this.sbnl = { ...sbnl };
    this.productDialog = true;
  }

  deleteSbnl(sbnl: Sbnl) {
    this.deleteProductDialog = true;


    this.sbnl = { ...sbnl };

  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedSbnls.length)
    this.selectedSbnls.forEach(selectedSbnl => {
      this.sbnlService.deleteSbnl(selectedSbnl.id).subscribe(
        () => {
          this.sbnls = this.sbnls.filter(sbnl =>sbnl.id !== selectedSbnl.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    this.selectedSbnls = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.sbnl.id", this.sbnl.id);
    this.sbnls = this.sbnls.filter(val => val.id !== this.sbnl.id);
    if (this.sbnl.id!= null) {
      this.sbnlService.deleteSbnl(this.sbnl.id).subscribe(() => console.log("sbnl deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Puit Deleted', life: 3000 });
    this.sbnl ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveSbnl() {
    this.submitted = false;
    this.productDialog=false

    if(this.isUpdatesbnl==true) {
      this.sbnlService.updateSbnl(this.sbnl).subscribe(() =>{
        this.sbnlService.getAllSbnls().subscribe((sbnls: Sbnl[]) => {
          this.sbnls= sbnls;
        });
      });
      console.log('Sbnl updated');
      this.isUpdatesbnl=false;
    }
    else
    {
      this.sbnlService.addSbnl(this.sbnl).subscribe(() => {this.sbnlService.getAllSbnls()
        .subscribe((sbnls: Sbnl[]) => {
          this.sbnls = sbnls;
        } );});



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

  getsbnl() {
    this.sbnlService.getAllSbnls().subscribe((v:  Sbnl[]) => {
      this.sbnls=v;

    },error => {
      console.log(error)})
    this.serviceBassin.getAllBassins()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;
      }, error => {
        console.log('Error fetching users:', error);
      });
  }

  exportrapport(sbnl: Sbnl) {

  }

  Detailsbnl(sbnl: Sbnl) {

  }
}
