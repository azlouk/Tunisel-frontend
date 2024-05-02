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
import {Article} from "../../Models/article";
import {ArticleService} from "../../Services/article.service";
import {Unite} from "../../Enum/unite";
import {ListboxModule} from "primeng/listbox";

@Component({
  selector: 'app-article',
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
        NgClass,
        ListboxModule
    ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit{
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;




  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  // ======********============

  articles: Article[]=[];
  article:Article={};
  selectedArticles: Article[] = [];

  private isUpdateProduitDefectuation=false;




  constructor( private messageService: MessageService,private articleService :ArticleService) {}

  ngOnInit() {
this.article.unite=Unite.PIECE

    this.articleService.getAllArticles().subscribe(value => {this.articles=value},
      error => {console.log(error)})

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'nom', header: 'nom' },
      { field: 'description', header: 'description' },
      { field: 'unite', header: 'unite' },

    ];


  }

  openNew() {
    this.article;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedArticles() {

    this.deleteProductsDialog = true;

  }

  editArticle(article: Article) {
    this.isUpdateProduitDefectuation=true;


    this.article = { ...article };
    this.productDialog = true;
  }

  deleteArticle(article: Article) {
    this.deleteProductDialog = true;

    this.article = { ...article };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedArticles.length)
    this.selectedArticles.forEach(selectedArticle => {
      this.articleService.deleteArticle(selectedArticle.id).subscribe(
        () => {
          this.articles = this.articles.filter(article =>article.id !== selectedArticle.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Article Deleted', life: 3000 });
    this.selectedArticles = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    console.log("this.article.id", this.article.id);
    this.articles = this.articles.filter(val => val.id !== this.article.id);
    if (this.article.id!= null) {
      this.articleService.deleteArticle(this.article.id).subscribe(() => console.log("article deleted"));
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'article Deleted', life: 3000 });
    this.article ;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduitDefectuation() {
    this.submitted = false;
    this.productDialog=false
    // alert(new JsonPipe().transform(this.article))
    if(this.isUpdateProduitDefectuation==true) {
      this.articleService.updateArticle(this.article).subscribe(() =>{
        this.articleService.getAllArticles().subscribe((articles: Article[]) => {
          this.articles = articles;
        });
      });
      console.log('article updated');
      this.isUpdateProduitDefectuation=false;
    }
    else
    {
      this.articleService.addArticle(this.article).subscribe(() => {

        this.articleService.getAllArticles().subscribe((articles: Article[]) => {
          this.articles = articles;
        });
      });
      console.log('article added');
    }
    this.article={}
  }





  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getUnite() {
    return Object.values(Unite);
  }

  protected readonly Unite = Unite;
}
