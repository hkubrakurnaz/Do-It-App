import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { MyErrorStateMatcher } from '../app.component';
import { Goal } from '../model/goal';
import { GoalService } from '../services/goal.service';
import { ConstantVariables } from '../model/constantVariables';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
})
export class ThemeComponent implements OnInit {
  goal: Goal;

  boolRemainDay = true;
  remainDay = 0;
  minDate: Date;
  isOptional = false;

  matcher = new MyErrorStateMatcher();

  goalForm: FormGroup;
  dateForm: FormGroup;
  priceForm: FormGroup;
  supervisorEmailForm: FormGroup;
  userEmailForm: FormGroup;
  creditCardForm: FormGroup;

  prices: number[];
  months: string[];
  years: string[];

  constructor(
    private _formBuilder: FormBuilder,
    private goalService: GoalService,
    private _snackBar: MatSnackBar
  ) {
    this.prices = ConstantVariables.prices;
    this.months = ConstantVariables.months;
    this.years = ConstantVariables.years;

    const currentYear = new Date();
    this.minDate = new Date(currentYear);

    this.goalForm = this._formBuilder.group({
      goalCtrl: ['', Validators.required],
    });

    this.dateForm = this._formBuilder.group({
      dateCtrl: ['', Validators.required],
    });

    this.priceForm = this._formBuilder.group({
      priceCtrl: ['', Validators.required],
    });

    this.supervisorEmailForm = this._formBuilder.group({
      supervisorEmailCtrl: ['', [Validators.required, Validators.email]],
    });

    this.userEmailForm = this._formBuilder.group({
      userEmailCtrl: [
        '',
        [
          Validators.required,
          Validators.email,
          this.validateSameEmails.bind(this),
        ],
      ],
    });

    this.creditCardForm = this._formBuilder.group({
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      expirationMonth: ['', []],
      expirationYear: ['', []],
      cvc: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(3),
          Validators.maxLength(3),
        ],
      ],
    });
  }

  ngOnInit() {}

  getGoals() {
    this.goalService.getGoals();
  }

  addGoal(goal: Goal,stepper:MatStepper) {
    this.goalService.addGoal(goal).subscribe((data)=>{
      console.log(data);
      stepper.reset();
      this.openSnackBar('Successful!');
    },(error) => {
      console.log("Error:"+error);
      this.openSnackBar('Something went wrong!');
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message,'OK', {
      duration: 4000,
      panelClass: ['snackbarTextColor']
    });
  }

  //create goal object for post method
  done(stepper:MatStepper) {
    this.goal = {
      goalName: this.goalForm.get('goalCtrl').value,
      deadLine: new Date(this.dateForm.get('dateCtrl').value),
      price: Number(this.priceForm.get('priceCtrl').value),
      supervisorMail: this.supervisorEmailForm.get('supervisorEmailCtrl').value,
      userMail: this.userEmailForm.get('userEmailCtrl').value,
      cardNumber: this.creditCardForm.get('cardNumber').value,
      monthOfDate: this.creditCardForm.get('expirationMonth').value,
      yearOfDate: this.creditCardForm.get('expirationYear').value,
      cvc: this.creditCardForm.get('cvc').value,
    };
    this.addGoal(this.goal,stepper);
  }

  //calculate days remaining from now
  calculateRemainDate() {
    var startDate = new Date(this.dateForm.get('dateCtrl').value);
    var endDate = new Date(); // Today
    var ndays;
    var tv1 = startDate.getTime(); // msec since 1970
    var tv2 = endDate.getTime();

    ndays = (tv1 - tv2) / 1000 / 86400;
    this.remainDay = Math.round(ndays - 0.5) + 1;
  }

  //check the user and supervisor email to see if they are same return true 
  validateSameEmails(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const userValue = control.value;
    if (this.supervisorEmailForm) {
      const supervisorValue = (<FormGroup>(
        this.supervisorEmailForm.get('supervisorEmailCtrl')
      )).value;
      if (userValue && supervisorValue && supervisorValue === userValue) {
        console.log('Control: ', control);
        return { fieldMatch: true };
      }
      return null;
    }
  }
 
  public errorHandling = (control: string, error: string) => {
    return this.creditCardForm.controls[control].hasError(error);
  };
 
  get userFormField() {
    return <FormGroup>this.userEmailForm.get('field');
  }
}
