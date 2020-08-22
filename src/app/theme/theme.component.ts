import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MyErrorStateMatcher } from '../app.component';
import { MatDialog } from '@angular/material/dialog';
import {CreditCardDialogComponent} from './credit-card-dialog/credit-card-dialog.component';
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  formGroup: FormGroup;
  minDate: Date;

  isOptional = false;

  goalForm:FormGroup;
  dateForm:FormGroup;
  priceForm:FormGroup;
  supervisorEmailForm:FormGroup;
  yourEmailForm:FormGroup;
  creditCardForm:FormGroup;

  prices: number[] = [
    25,50,100,200,500
   ];

  matcher = new MyErrorStateMatcher();
  
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private _formBuilder: FormBuilder,public dialog: MatDialog) {
    const currentYear = new Date();
    this.minDate = new Date(currentYear);

    this.goalForm =  this._formBuilder.group({
      goalCtrl: ['', Validators.required]
    });

    this.dateForm = this._formBuilder.group({
      dateCtrl: ['', Validators.required]
    });

    this.priceForm = this._formBuilder.group({
      priceCtrl: ['', Validators.required]
    });

    this.supervisorEmailForm  =this._formBuilder.group({
      supervisorEmailCtrl : ['',[ Validators.required,Validators.email]],
    });

    this.yourEmailForm =  this._formBuilder.group({
      yourEmailCtrl : ['', [Validators.required,Validators.email]],
    });

    this.creditCardForm =  this._formBuilder.group({
      cardNumber: ['',[  Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(16), 
        Validators.maxLength(16)]],
       
      cardHolder: ['',[Validators.required, 
         Validators.pattern( '^[a-zA-Z ]*$')]],
      expirationMonth: ['',[]],
      expirationYear:['',[]],
      cvc:['',[Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(3), 
        Validators.maxLength(3)]]
    });
  }


  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
       this.goalForm,
       this.dateForm,
       this.priceForm,
       this.supervisorEmailForm,
       this.yourEmailForm,
       this.creditCardForm
      ])
    });
  }
  
  writeConsole(){
    console.log(this.formGroup.get('formArray').value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreditCardDialogComponent,{
      data: this.creditCardForm,
    });

    dialogRef.afterClosed().subscribe(
      (data) =>{ 
        console.log(this.creditCardForm);
      });  
  }



  done(){
    // call api
  }
}
