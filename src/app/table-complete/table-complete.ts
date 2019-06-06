import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from '../models/book';
import { ApiService } from "../api/api.service";
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { EditDialogComponent } from "../components/edit-dialog/edit-dialog.component";
import { CreateDialogComponent } from '../components/create-dialog/create-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component(
  {
    selector: 'ngbd-table-complete',
    templateUrl: './table-complete.html',
    styleUrls: ["table-complete.css"],
    providers: [DecimalPipe, ApiService]
  })

export class NgbdTableComplete {

  bookList: Book[] = [];
  countries$: Observable<Book[]>;
  total$: Observable<number>;
  editDialogRef: MatDialogRef<EditDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmationDialogComponent>;
  createDialogRef: MatDialogRef<CreateDialogComponent>;

  constructor(private apiService: ApiService, public dialog: MatDialog, private spinner:NgxSpinnerService) {
  }

  ngOnInit() {
    this.getAllBooks();
  }



  refreshBookList() {
    this.bookList = [];
    this.getAllBooks();
  }

  getAllBooks() {
    this.spinner.show();

    this.apiService.getAllBooks().subscribe(apiRes => {
      this.bookList = this.bookList.concat(apiRes);
      console.log(this.bookList);
      this.spinner.hide();
    });
  }



  deleteBookbyId(_id) {
    this.spinner.show();
    this.apiService.deleteBookbyId(_id).subscribe(apiRes => {
      if (apiRes == 1) {
        this.spinner.hide();
        console.log("delete success");
        this.bookList = [];
        this.getAllBooks();
      }
      else {
        this.spinner.hide();
        console.log("delete failed");
      }
    });
  }

  updateBookbyId(book) {
    this.spinner.show();
    this.apiService.updateBookbyId(book).subscribe(apiRes => {
      if (apiRes) {
        this.spinner.hide();
        console.log("update success");
        this.bookList = [];
        this.getAllBooks();
      }
      else {
        this.spinner.hide();
        console.log("update failed");
      }
    })
  }

  createBook(book){
    this.spinner.show();
    this.apiService.createBook(book).subscribe(apiRes=>{
      if(apiRes){
        this.spinner.hide();
        console.log("create success");
        this.bookList=[];
        this.getAllBooks();
      }
      else{
        this.spinner.hide();
        console.log("create failed");
      }
    })
  }

  openDialogCreate() {
    this.createDialogRef = this.dialog.open(CreateDialogComponent, {
      hasBackdrop: false
    });
    this.createDialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        this.createBook(result);
      }
    })
  }

  openDialogEdit(book) {
    this.editDialogRef = this.dialog.open(EditDialogComponent, {
      hasBackdrop: false,
      data: book
    });
    this.editDialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked: ' + result);
        this.updateBookbyId(result);
      }
    });
  }

  openDialogDelete(_id): void {
    this.confirmDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      hasBackdrop: false,
      //width: '350px',
      data: "Do you confirm the deletion of this data?"
    });
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked: ' + _id);
        this.deleteBookbyId(_id);
      }
    });
  }


}