import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemeComponent } from '../theme.component';
import {ErrorStateMatcher} from '@angular/material/core';
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

  cardInfo : FormGroup;
  // cardInfo = new FormGroup({
  //   cardNumber: new FormControl(''),
  //   cardHolder: new FormControl(''),
  //   expirationMonth: new FormControl(''),
  //   expirationYear:new FormControl(''),
  //   ccv:new FormControl('')
  // });
  
  creditCardForm : FormGroup;

  constructor( private fb: FormBuilder, private dialogRef: MatDialogRef<CreditCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.creditCardForm = data;
      debugger;
     }

  ngOnInit() {
    // this.cardInfo =this.fb.group({
    //   cardNumber: ['',[  Validators.required,
    //     Validators.pattern("^[0-9]*$"),
    //     Validators.minLength(16), 
    //     Validators.maxLength(16)]],
       
    //   cardHolder: ['',[Validators.required, 
    //      Validators.pattern( '^[a-zA-Z ]*$')]],
    //   expirationMonth: ['',[]],
    //   expirationYear:['',[]],
    //   cvc:['',[Validators.required,
    //     Validators.pattern("^[0-9]*$"),
    //     Validators.minLength(3), 
    //     Validators.maxLength(3)]],
    // });
  }
  callingFunction(){
    console.log(this.creditCardForm);
  }
  save() {
    this.dialogRef.close(this.creditCardForm.value);
  }
   /* Handle form errors in Angular 8 */
   public errorHandling = (control: string, error: string) => {
    return this.creditCardForm.controls[control].hasError(error);
  }

  submitForm() {
    console.log(this.creditCardForm.value)
  }

  // get cardNumber() { return this.creditCardForm.get(''); }

  

}
