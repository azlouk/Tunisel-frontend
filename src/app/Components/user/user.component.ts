import {Component, OnInit} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {Product} from "../../Models/product";
import {ProductService} from "../../Services/product.service";
import {MessageService} from "primeng/api";
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {RadioButtonModule} from "primeng/radiobutton";
import {RatingModule} from "primeng/rating";
import {CurrencyPipe, JsonPipe, NgClass, NgIf} from "@angular/common";
import {FileUploadModule} from "primeng/fileupload";
import {ToolbarModule} from "primeng/toolbar";
import {ToastModule} from "primeng/toast";
import {UserService} from "../../Services/user.service";
import {User} from "../../Models/user";
import {PasswordModule} from "primeng/password";
import {UserType} from "../../Enum/user-type";


@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    DialogModule,
    PaginatorModule,
    RadioButtonModule,
    RatingModule,
    CurrencyPipe,
    TableModule,
    FileUploadModule,
    ToolbarModule,
    ToastModule,
    NgClass,
    NgIf,
    PasswordModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
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
  users: User[] = [];

  user: User = {};

  selectedUsers: User[] = [];

  private isUpdateUser=false;

  constructor(private productService: ProductService, private messageService: MessageService,private userService :UserService) { }

  ngOnInit() {
    // this.productService.getProducts().then(data => this.products = data);
    this.userService.getAllUsers().subscribe((v:  User[]) => {
      this.users=v;
      console.log(new JsonPipe().transform("====================>>>>>>"+this.users))

    },error => {
      console.log(error)})

    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Reviews' },
      { field: 'inventoryStatus', header: 'Status' }
    ];

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.user = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedUsers() {

    this.deleteProductsDialog = true;

  }

  editProduct(user: User) {
    this.isUpdateUser=true;
    this.user = { ...user };
    this.productDialog = true;
  }

  deleteProduct(user: User) {
    this.deleteProductDialog = true;
    this.user = { ...user };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
console.log(this.selectedUsers.length)
    this.selectedUsers.forEach(selectedUser => {
      this.userService.deleteUser(selectedUser.id).subscribe(
        () => {
          this.users = this.users.filter(user => user.id !== selectedUser.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    this.selectedUsers = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.user.id", this.user.id);
    this.users = this.users.filter(val => val.id !== this.user.id);
    if (this.user.id!= null) {
      this.userService.deleteUser(this.user.id).subscribe(() => console.log("user deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.user = {};
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }


  saveUser() {
    this.submitted = false;
    this.productDialog=false
  alert(new JsonPipe().transform(this.user))
    console.log(this.user.type)
    if(this.isUpdateUser==true) {
      this.userService.saveUser(this.user).subscribe(() => console.log("user Updated"));
      this.isUpdateUser=false;
    }
    else
    {
      if (this.user.type && this.user.type === UserType.ADMIN){
        this.userService.addAdmin(this.user).subscribe(() => console.log("Admin Added"));
      }
      if(this.user.type=="Employer") {
        this.userService.AddEmployer(this.user).subscribe(() => console.log("Employer Added"));
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
