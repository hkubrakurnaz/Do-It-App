import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MyErrorStateMatcher } from '../app.component';
import { MatDialog } from '@angular/material/dialog';
import {CreditCardDialogComponent} from './credit-card-dialog/credit-card-dialog.component';
import { HttpClient } from '@angular/common/http';
import {Goal} from '../model/goal';
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  goals:Goal[] = [];

  remainDay = 0;

  formGroup: FormGroup;
  minDate: Date;

  isOptional = false;

  goalForm:FormGroup;
  dateForm:FormGroup;
  priceForm:FormGroup;
  supervisorEmailForm:FormGroup;
  userEmailForm:FormGroup;
  creditCardForm:FormGroup;

  prices: number[] = [
    25,50,100,200,500
   ];

  matcher = new MyErrorStateMatcher();
  
  //get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private _formBuilder: FormBuilder,public dialog: MatDialog,private http:HttpClient) {
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

    this.userEmailForm =  this._formBuilder.group({
      userEmailCtrl : ['', [Validators.required,Validators.email,this.validateSameEmails.bind(this)]],
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
    //this.getGoals().subscribe(data=>this.goals = data);

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
  getGoals(){
    return this.http.get<Goal[]>("https://localhost:44324/api/goals");
  }

  done(){
    this.http.post<Goal>("https://localhost:44324/api/goals",{
      "goalName":this.goalForm.get('goalCtrl').value,
      "deadLine":new Date(this.dateForm.get('dateCtrl').value),
      "price":Number(this.priceForm.get('priceCtrl').value),
      "supervisorMail":this.supervisorEmailForm.get('supervisorEmailCtrl').value,
      "userMail":this.userEmailForm.get('userEmailCtrl').value,
      "cardNumber":this.creditCardForm.get('cardNumber').value,
      "cardHolder":this.creditCardForm.get('cardHolder').value,
      "monthOfDate":this.creditCardForm.get('expirationMonth').value,
      "yearOfDate":this.creditCardForm.get('expirationYear').value,
      "cvc":this.creditCardForm.get('cvc').value
  }).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      error => console.log('oops', error));
  }
  calculateRemainDate(){
    debugger;
    var startDate = new Date( this.dateForm.get('dateCtrl').value);
    var endDate =   new Date();              // Today
    var ndays;
    console.log("pick"+this.dateForm.get('dateCtrl').value);
    var tv1 = startDate.getTime();  // msec since 1970
    var tv2 = endDate.getTime();

    ndays = (tv1 - tv2) / 1000 / 86400;
    this.remainDay = Math.round(ndays - 0.5) + 1;

    console.log("Date:-"+ndays);

    //return ndays + 1;
  }
  validateSameEmails(control:AbstractControl): { [key: string]: boolean } | null{
    const userValue = control.value;
    if(this.supervisorEmailForm){
      const supervisorValue = (<FormGroup>this.supervisorEmailForm.get('supervisorEmailCtrl')).value;
      if(userValue && supervisorValue && supervisorValue===userValue ){
        console.log('Control: ', control);
        return { 'fieldMatch' : true };
      }
     // console.log('Control: ', control);
      return null;
    }
  }
  get userFormField() {
    return (<FormGroup>this.userEmailForm.get('field'));
  }

  //  checkSameEmail(control:AbstractControl):{[key:string]:boolean} | null{
  //   if(this.supervisorEmailForm.get('supervisorEmailCtrl').value === this.userEmailForm.get('userEmailCtrl').value ){
  //     return {'checkEmail':true};
  //   }

  //   return null;
  // }
  /*checkEmail(){
    if(this.supervisorEmailForm.get('supervisorEmailCtrl').value === this.userEmailForm.get('userEmailCtrl').value ){
      return false;
    }
    return true;
  }*/

}
