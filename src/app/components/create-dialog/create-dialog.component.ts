import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<CreateDialogComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public book: Book) { }
  
    ngOnInit() {

    this.form = this.formBuilder.group({
      bookTitle:"",
      bookAuthor: "",
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
    var createdBook: Book = {
      _id: null,
      title: `${form.value.bookTitle}`,
      author: `${form.value.bookAuthor}`
    };

    if(this.captchaSuccess){
      //console.log(createdBook);
      console.log("success captcha");
      this.dialogRef.close(createdBook);
    }
    else{
      //console.log(createdBook);
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
