import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  id:number;
  supervisorAnswer:boolean;

  constructor( private route: ActivatedRoute,
    private goalService: GoalService) { }

  ngOnInit() {
    
  }
  getId(){
    //. The JavaScript (+) operator converts the string to a number
    const id = +this.route.snapshot.paramMap.get('id');
    return id;
  }
  confirm(){
    debugger;
    this.supervisorAnswer = true;
    this.callService();
  }
  refuse(){
    debugger;
    this.supervisorAnswer = false;
    this.callService();
  }
  callService(){
    this.goalService.updateStatus(this.getId(),this.supervisorAnswer);
  }

}
