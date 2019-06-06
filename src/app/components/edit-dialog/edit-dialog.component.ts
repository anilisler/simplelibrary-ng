import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  form: FormGroup;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';
  public useGlobalDomain: boolean = false;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EditDialogComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public book: Book) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      bookTitle: this.book.title,
      bookAuthor: this.book.author,
      recaptcha: ['', Validators.required]
    })
  }

  getSiteKey(){
    return "6LfGOqcUAAAAANWyQKo4wrGmjBkH-m4zMYOi2W4I";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(form) {
    var editedBook: Book = {
      _id: this.book._id,
      title: `${form.value.bookTitle}`,
      author: `${form.value.bookAuthor}`
    };

    if(this.captchaSuccess){
      //console.log(editedBook);
      console.log("success captcha");
      this.dialogRef.close(editedBook);
    }
    else{
      //console.log(editedBook);
      console.log("fail captcha");
    }
  }

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
    this.cdr.detectChanges();
  }

}
