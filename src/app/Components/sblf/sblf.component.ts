import { Component } from '@angular/core';
import {Product} from "../../Models/product";
import {Sbl} from "../../Models/sbl";
import {ProductService} from "../../Services/product.service";
import {MessageService} from "primeng/api";
import {SblService} from "../../Services/sbl.service";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {Table, TableModule} from "primeng/table";
import {Sblf} from "../../Models/sblf";
import {SblfService} from "../../Services/sblf.service";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-sblf',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    NgClass,
    FormsModule,
    NgIf,
    CalendarModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
  ],
  templateUrl: './sblf.component.html',
  styleUrl: './sblf.component.css'
})
export class SblfComponent {
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
  sblfs: Sblf[] = [];

  sblf:Sblf={};

  selectedSblfs: Sblf[] = [];

  private isUpdateSblf=false;

  constructor(private productService: ProductService, private messageService: MessageService,private sblfService :SblfService) {}

  ngOnInit() {
    this.sblfService.getAllSblfs().subscribe((v:  Sblf[]) => {
      this.sblfs=v;
      console.log(new JsonPipe().transform("====================>>>>>>"+this.sblfs))

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
      { field: 'dateStock', header: 'dateStock' },
    ];


  }

  openNew() {
    this.sblf ;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedSblfs() {

    this.deleteProductsDialog = true;

  }

  editSblf(sblf: Sblf) {
    this.isUpdateSblf=true;
    this.sblf= {...sblf} ;
    this.productDialog = true;
  }

  deleteSblf(sblf: Sblf) {
    this.deleteProductDialog = true;
    this.sblf= {...sblf} ;
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedSblfs.length)
    this.selectedSblfs.forEach(selectedSblf => {
      this.sblfService.deleteSblf(selectedSblf.id).subscribe(
        () => {
          this.sblfs = this.sblfs.filter(sblf =>sblf.id !== selectedSblf.id);
        },
        (error) => {
          console.error('Error deleting Sbl:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sbl Deleted', life: 3000 });
    this.selectedSblfs = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.sblf.id", this.sblf.id);
    this.sblfs = this.sblfs.filter(val => val.id !== this.sblf.id);
    if (this.sblf.id!= null) {
      this.sblfService.deleteSblf(this.sblf.id).subscribe(() => console.log("Sblf deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sblf Deleted', life: 3000 });
    this.sblf ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveSblf() {
    this.submitted = false;
    this.productDialog=false
    alert(new JsonPipe().transform(this.sblf))
    if(this.isUpdateSblf==true) {
      this.sblfService.updateSblf(this.sblf).subscribe(() =>{
        this.sblfService.getAllSblfs().subscribe((sblfs: Sblf[]) => {
          this.sblfs = sblfs;
        });
      });
      console.log('Sbl updated');
      this.isUpdateSblf=false;
    }
    else
    {
      this.sblfService.addSblf(this.sblf).subscribe(() => {
        this.sblfService.getAllSblfs().subscribe((sblfs: Sblf[]) => {
          this.sblfs = sblfs;
        });
      });
      console.log('Sblf added');
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
