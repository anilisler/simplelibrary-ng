import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTableComplete } from './table-complete';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { EditDialogComponent } from "../components/edit-dialog/edit-dialog.component";
import { CreateDialogComponent } from "../components/create-dialog/create-dialog.component";
import { MatButtonModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [NgbdTableComplete, ConfirmationDialogComponent,EditDialogComponent,CreateDialogComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NgxCaptchaModule,
    NgxSpinnerModule
  ],
  entryComponents: [ConfirmationDialogComponent,EditDialogComponent,CreateDialogComponent],
  exports: [NgbdTableComplete],
  bootstrap: [NgbdTableComplete]
})
export class NgbdTableCompleteModule { }
