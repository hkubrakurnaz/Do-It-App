import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goal } from '../model/goal';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class GoalService {
  baseURL: string = "https://localhost:44324/api/goals";

  constructor(private http: HttpClient) {}

  getGoals() {
    return this.http.get<Goal[]>(this.baseURL);
  }
  addGoal(goal: Goal):Observable<any> {
    return this.http
      .post<Goal>(this.baseURL, {
        goalName: goal.goalName,
        deadLine: goal.deadLine,
        price: goal.price,
        supervisorMail: goal.supervisorMail,
        userMail: goal.userMail,
        cardNumber: goal.cardNumber,
        monthOfDate: goal.monthOfDate,
        yearOfDate: goal.yearOfDate,
        cvc: goal.cvc
      })
      .pipe(catchError(this.handleError))

      /*
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in body', val);
        },
        (error) => console.log('oops', error)
      );*/
  }
  handleError(error){
    return throwError(error.message || "Failed!");
  }
}
