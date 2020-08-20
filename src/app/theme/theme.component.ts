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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  isLinear = false;
  isOptional = false;

  goalForm:FormGroup;
  dateForm:FormGroup;
  priceForm:FormGroup;
  supervisorEmail:FormGroup;
  yourEmail:FormGroup;
  creditCard:FormGroup;

  prices: number[] = [
    25,50,100,200,500
   ];

   matcher = new MyErrorStateMatcher();
  
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private _formBuilder: FormBuilder,public dialog: MatDialog) {
    const currentYear = new Date();
    this.minDate = new Date(currentYear);
  }

  ngOnInit() {

    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          goalCtrl: ['', Validators.required],
        }),
        this._formBuilder.group({
          dateCtrl: ['', Validators.required]
        }),
        this._formBuilder.group({
          priceCtrl: ['', Validators.required],
        }),
        this._formBuilder.group({
          supervisorEmailCtrl : ['',[ Validators.required,Validators.email]],
        }),
        this._formBuilder.group({
          yourEmailCtrl : ['', [Validators.required,Validators.email]],
        }),
        this._formBuilder.group({
          creditCardCtrl : ['', Validators.required],
        }),
      ])
    });
  
    this.goalForm = this._formBuilder.group({
      goalCtrl: ['',Validators.required]
    });
    this.dateForm = this._formBuilder.group({
      dateCtrl: ['',Validators.required]
    });
    this.priceForm = this._formBuilder.group({
      priceCtrl: ['',Validators.required]
    });
    this.supervisorEmail = this._formBuilder.group({
      supervisorEmailCtrl: ['',[Validators.required,Validators.email]]
    });
    this.yourEmail = this._formBuilder.group({
      yourEmailCtrl: ['',[Validators.required,Validators.email]]
    });
    this.creditCard = this._formBuilder.group({
      creditCardCtrl: ['',Validators.required]
    });
  }
  writeConsole(){
    console.log(this.formGroup.get('formArray').value);
  }
  openDialog() {
    this.dialog.open(CreditCardDialogComponent);
  }
  

}
