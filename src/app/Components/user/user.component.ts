import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
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
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {getToken} from "../../../main";
import {RegisterRequest} from "../../Models/register-request";
import {ChangePasswordRequest} from "../../Models/change-password-request";
import {RippleModule} from "primeng/ripple";


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
    InputTextModule,
    RippleModule
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
  users: RegisterRequest[] = [];

  registerRequest:RegisterRequest=new RegisterRequest();
  changePassword:ChangePasswordRequest=new ChangePasswordRequest();
  selectedUsers: RegisterRequest[] = [];

   isUpdateUser = false;
 userConnect!: RegisterRequest;

  constructor(  private messageService: MessageService, private userService: UserService) {

  }

  ngOnInit() {

    this.getUserConnected();

    this.cols = [
      {field: 'id', header: 'id'},
      {field: 'nom', header: 'nom'},
      {field: 'pseudo', header: 'pseudo'},
      {field: 'poste', header: 'poste'},
      {field: 'telephone', header: 'telephone'},
      {field: 'telephone', header: 'role'}
    ];

    this.statuses = [
      {label: 'INSTOCK', value: 'instock'},
      {label: 'LOWSTOCK', value: 'lowstock'},
      {label: 'OUTOFSTOCK', value: 'outofstock'}
    ];
  }

  getAllUsers() {
    this.loadingUsers=true ;
    this.userService.getAllUsers().subscribe((v: RegisterRequest[]) => {
      if(this.userConnect.role=='EMPLOYER'){
        this.users=v;
      this.users =this.users.filter(value => value.id==this.userConnect.id)

      }else {
        this.users=v;
      }
      this.loadingUsers=false ;
    }, error => {
      console.log(error)
    })
  }

  openNew() {

this.isUpdateUser=false
    this.submitted = false;
    this.productDialog = true;
    this.registerRequest=new RegisterRequest();
  }

  deleteSelectedUsers() {

    this.deleteProductsDialog = true;

  }

  editProduct(user: RegisterRequest) {
    this.isUpdateUser = true;
    this.registerRequest = user
    this.productDialog = true;
    this.changePassword=new ChangePasswordRequest()
  }

  deleteProduct(user: RegisterRequest) {
    this.deleteProductDialog = true;
    this.registerRequest = user;
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

      this.userService.deleteUser(this.registerRequest.id).subscribe(() => {
        this.users = this.users.filter(val => val.id !== this.registerRequest.id);
        console.log("user deleted")
        this.messageService.add({severity: 'success', summary: 'réussi', detail: 'Utilisateur supprimé', life: 3000});

      });

  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.isUpdateUser=false ;
  }


  saveUser() {
    this.submitted = true;
    if(this.isUpdateUser==false){
      if (this.registerRequest.email?.trim() && this.registerRequest.password?.trim()) {
        this.userService.register(this.registerRequest).subscribe(value => {
          // console.log(value)
          this.getAllUsers();
        })
      this.productDialog = false
    }
    }
    else {
      if (this.registerRequest.email?.trim() && this.registerRequest.password?.trim()) {
        if (this.changePassword.currentPassword?.trim() && this.changePassword.newPassword?.trim() && this.changePassword.confirmationPassword?.trim()) {
          this.userService.register(this.registerRequest).subscribe(value => {
            // console.log(value)
            // this.getAllUsers()
            this.userService.changePassword(this.changePassword, this.registerRequest.id).subscribe(value => {
              this.getAllUsers();
              this.changePassword=new ChangePasswordRequest()
            })
            this.productDialog = false
          })

        } else {
          this.userService.register(this.registerRequest).subscribe(value => {
            // console.log(value)
            this.getAllUsers()
          })
          this.productDialog = false

        }
      }
    }
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  protected readonly getToken = getToken;
  loadingUsers: boolean=false;

  alertOnhide() {
    this.isUpdateUser=false

  }



  public getUserConnected(){
    this.userService.getUserConnect().subscribe(value => {
      this.userConnect = value
      this.getAllUsers();
    })
  }

}
