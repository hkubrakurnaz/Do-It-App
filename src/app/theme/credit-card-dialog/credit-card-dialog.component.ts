import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-credit-card-dialog',
  templateUrl: './credit-card-dialog.component.html',
  styleUrls: ['./credit-card-dialog.component.css']
})
export class CreditCardDialogComponent implements OnInit {

  cardInfo = new FormGroup({
    cardNumber: new FormControl(''),
    cardHolder: new FormControl(''),
    expirationMonth: new FormControl(''),
    expirationYear:new FormControl(''),
    ccv:new FormControl('')
  });
  
  constructor() { }

  ngOnInit() {
  }
  callingFunction(){
    console.log(this.cardInfo);
  }

}
