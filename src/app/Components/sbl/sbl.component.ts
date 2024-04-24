import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../../Models/product";
import {ProductService} from "../../Services/product.service";
import {Sbl} from "../../Models/sbl";
import {SblService} from "../../Services/sbl.service";

@Component({
  selector: 'app-sbl',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    DialogModule,
    InputTextModule,
    NgIf,
    PaginatorModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    NgClass
  ],
  templateUrl: './sbl.component.html',
  styleUrl: './sbl.component.css'
})
export class SblComponent implements OnInit{
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuS: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============
  sbls: Sbl[] = [];

  sbl:Sbl={};

  selectedSbls: Sbl[] = [];

  private isUpdateSbl=false;

  constructor(private productService: ProductService, private messageService: MessageService,private sblService :SblService) {}

  ngOnInit() {
    this.sblService.getAllSbl().subscribe((v:  Sbl[]) => {
      this.sbls=v;
      console.log(new JsonPipe().transform("====================>>>>>>"+this.sbls))

    },error => {
      console.log(error)})

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
    this.sbl ;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedSbls() {

    this.deleteProductsDialog = true;

  }

  editSbl(sbl: Sbl) {
    this.isUpdateSbl=true;
    this.sbl= {...sbl} ;
    this.productDialog = true;
  }

  deleteSbl(sbl: Sbl) {
    this.deleteProductDialog = true;
    this.sbl= {...sbl} ;
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedSbls.length)
    this.selectedSbls.forEach(selectedSbl => {
      this.sblService.deleteSbl(selectedSbl.id).subscribe(
        () => {
          this.sbls = this.sbls.filter(sbl =>sbl.id !== selectedSbl.id);
        },
        (error) => {
          console.error('Error deleting Sbl:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sbl Deleted', life: 3000 });
    this.selectedSbls = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.sbl.id", this.sbl.id);
    this.sbls = this.sbls.filter(val => val.id !== this.sbl.id);
    if (this.sbl.id!= null) {
      this.sblService.deleteSbl(this.sbl.id).subscribe(() => console.log("Sbl deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sbl Deleted', life: 3000 });
    this.sbl ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveSbl() {
    this.submitted = false;
    this.productDialog=false
    if(this.isUpdateSbl==true) {
      this.sblService.updateSbl(this.sbl).subscribe(() =>{
        this.sblService.getAllSbl().subscribe((sbls: Sbl[]) => {
          this.sbls = sbls;     alert(new JsonPipe().transform(this.sbl))

        });
      });
      console.log('Sbl updated');
      this.isUpdateSbl=false;
    }
    else
    {
      this.sblService.addSbl(this.sbl).subscribe(() => {
        this.sblService.getAllSbl().subscribe((sbls: Sbl[]) => {
          this.sbls = sbls;
        });
      });
      console.log('Sbl added');
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

}
