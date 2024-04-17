import {Component, OnInit} from '@angular/core';
import {Product} from "../../Models/product";
import {User} from "../../Models/user";
import {ProductService} from "../../Services/product.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../Services/user.service";
import {JsonPipe} from "@angular/common";
import {UserType} from "../../Enum/user-type";
import {Table, TableModule} from "primeng/table";
import {Puit} from "../../Models/puit";
import {BassinService} from "../../Services/bassin.service";
import {Bassin} from "../../Models/bassin";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'app-bassin',
  standalone: true,
  imports: [
    TableModule,
    ToastModule,
    ToolbarModule,
    DialogModule
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

  private isUpdateBassin=false;


  constructor(private productService: ProductService, private messageService: MessageService,private bassinService :BassinService) { }

  ngOnInit() {
    // // this.productService.getProducts().then(data => this.products = data);
    // let adminList$: Observable<User[]> = this.userService.getAdmins();
    // let employerList$: Observable<User[]> = this.userService.getEmployers();
    //
    // forkJoin([adminList$, employerList$]).pipe(
    //   map(([admins, employers]) => {
    //     admins.forEach(user => user.type = UserType.ADMIN);
    //     employers.forEach(user => user.type = UserType.EMPLOYEE);
    //     return admins.concat(employers);
    //   })
    // )
    this.bassinService.getAllBassins()
      .subscribe((bassins: Bassin[]) => {
        this.bassins = bassins;

      }, error => {
        console.log('Error fetching users:', error);
      });
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
  saveUser() {
    this.submitted = false;
    this.productDialog=false
    alert(new JsonPipe().transform(this.bassin))

    if(this.isUpdateBassin==true) {

      if (this.bassin) {

        this.bassinService.updateBassin(this.bassin).subscribe(
          () => console.log('Bassin Updated'),
          (error) => console.error('Error updating user:', error)
        );
      }
      this.isUpdateBassin=false;
    }
    else
    {

      if (this.bassin ){
        this.bassinService.addBassin(this.bassin).subscribe(() => console.log("Bassin Added"));
      }

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
