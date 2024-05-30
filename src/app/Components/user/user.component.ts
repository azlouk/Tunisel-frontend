import {Component, OnInit} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {Product} from "../../Models/product";
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
import {InputTextModule} from "primeng/inputtext";
import {Employer} from "../../Models/employer";
import {getToken} from "../../../main";


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
    PasswordModule,
    InputTextModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
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

   isUpdateUser = false;

  constructor(  private messageService: MessageService, private userService: UserService) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.cols = [
      {field: 'product', header: 'Product'},
      {field: 'price', header: 'Price'},
      {field: 'category', header: 'Category'},
      {field: 'rating', header: 'Reviews'},
      {field: 'inventoryStatus', header: 'Status'}
    ];

    this.statuses = [
      {label: 'INSTOCK', value: 'instock'},
      {label: 'LOWSTOCK', value: 'lowstock'},
      {label: 'OUTOFSTOCK', value: 'outofstock'}
    ];
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((v: User[]) => {
      this.users = v;
    }, error => {
      console.log(error)
    })
  }

  openNew() {


    this.user = {userType: "ADMIN"};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedUsers() {

    this.deleteProductsDialog = true;

  }

  editProduct(user: User) {
    this.isUpdateUser = true;
    this.user = {...user};
    this.productDialog = true;
  }

  deleteProduct(user: User) {
    this.deleteProductDialog = true;
    this.user = {...user};
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
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

    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
    this.selectedUsers = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.users = this.users.filter(val => val.id !== this.user.id);
    if (this.user.id != null) {
      this.userService.deleteUser(this.user.id).subscribe(() => console.log("user deleted"));
    }
    this.messageService.add({severity: 'success', summary: 'réussi', detail: 'Utilisateur supprimé', life: 3000});
    this.user = {};
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.isUpdateUser=false ;
  }


  saveUser() {

    this.submitted = true;

    if (this.user.pseudo?.trim() && this.user.mp?.trim()) {
      if (this.isUpdateUser == true) {
        this.userService.saveUser(this.user).subscribe(() => {
        });
        this.isUpdateUser = false;
      } else {
        if (this.user.userType === "ADMIN") {
          this.userService.addAdmin(this.user).subscribe(() => {
            this.getAllUsers();
          })
        }
        if (this.user.userType == "EMPLOYER") {
          this.userService.AddEmployer(this.user).subscribe(() => {
            this.getAllUsers();
          });
        }
        this.productDialog = false
      }
    }
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  protected readonly getToken = getToken;
}
