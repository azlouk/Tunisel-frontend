import {Component, OnInit} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {Product} from "../../Models/product";
import {ProductService} from "../../Services/product.service";
import {MessageService, SharedModule} from "primeng/api";
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
import {forkJoin, map, Observable} from "rxjs";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";


@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [



    RatingModule,
    CurrencyPipe,

    FileUploadModule,



    PasswordModule,
    TableModule,
    ButtonModule,
    PaginatorModule,

    RadioButtonModule,
    SharedModule,

    ToastModule,
    ToolbarModule,
    DialogModule,
    NgClass,
    FormsModule,
    NgIf,
    InputTextModule,
    InputTextareaModule
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
    this.userService.getAllUsers()
      .subscribe((users: User[]) => {
      this.users = users;

  }, error => {
  console.log('Error fetching users:', error);
});
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
  alert(new JsonPipe().transform(this.user))
    console.log("test user type ", this.user.type)
    console.log("save user ", this.user.id)
    if(this.isUpdateUser==true && this.user ) {
      this.userService.saveUser(this.user).subscribe(
        () => console.log('User Updated'),
        (error) => console.error('Error updating user:', error)
      );

          this.isUpdateUser=false;
    }
    else
    {
      if (this.user.type && this.user.type === UserType.ADMIN){
        this.userService.addAdmin(this.user).subscribe(() => console.log("Admin Added"));
      }
      if (this.user.type && this.user.type === UserType.EMPLOYEE){
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
