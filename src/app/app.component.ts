import { Component ,OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  denemeInput="ali";
  isEditable = false;
  goalsForm: FormGroup;
  goalsForm1: FormGroup;
  prices: number[] = [
    25,50,100,200,500
   ];

   emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
   
  constructor(private _formBuilder: FormBuilder,private http: HttpClient) {

  }

  ngOnInit() {
    this.goalsForm = new FormGroup({
      goal: new FormControl('',Validators.required),
      date: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required),
      supervisorEmail: new FormControl('',Validators.required),
      yourEmail: new FormControl('',Validators.required)
    })

    this.goalsForm1 = new FormGroup({
      goal: new FormControl('',Validators.required),
      date: new FormControl(new Date(),Validators.required),
      price: new FormControl(150,Validators.required),
      supervisorEmail: new FormControl('albayrakorhann@gmail.com',Validators.required),
      yourEmail: new FormControl('',Validators.required)
    })

    
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
  }

  click(){
    console.log(this.goalsForm.value);
  }

  getUrl(){
    return `url('../assets/images/1.jpeg')`;
  }
}

