import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeComponent } from './theme/theme.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {  CreditCardDialogComponent} from '../app/theme/credit-card-dialog/credit-card-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [	AppComponent,
      ThemeComponent,
      CreditCardDialogComponent

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatDialogModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

