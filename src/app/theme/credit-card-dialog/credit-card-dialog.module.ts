import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardDialogComponent } from './credit-card-dialog.component';
import { NgPaymentCardModule } from 'ng-payment-card';
@NgModule({
  imports: [
    CommonModule,
    NgPaymentCardModule
  ],
  declarations: [CreditCardDialogComponent]
})
export class CreditCardDialogModule { }
