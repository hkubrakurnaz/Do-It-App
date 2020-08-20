import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-credit-card-dialog',
  templateUrl: './credit-card-dialog.component.html',
  styleUrls: ['./credit-card-dialog.component.css']
})
export class CreditCardDialogComponent implements OnInit {

  months: string[] = [
    "January","February","March","April","May","June","July","August","September","October","November","December"
   ];
   years: number[] = [
    2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030
   ]
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
