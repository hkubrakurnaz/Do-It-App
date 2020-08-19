import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  isLinear = false;

  goalForm:FormGroup;
  dateForm:FormGroup;
  priceForm:FormGroup;
  supervisorEmail:FormGroup;
  yourEmail:FormGroup;
  creditCard:FormGroup;


  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
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
      supervisorEmailCtrl: ['',Validators.required]
    });
    this.yourEmail = this._formBuilder.group({
      yourEmailCtrl: ['',Validators.required]
    });
    this.creditCard = this._formBuilder.group({
      creditCardCtrl: ['',Validators.required]
    });
  }

}
