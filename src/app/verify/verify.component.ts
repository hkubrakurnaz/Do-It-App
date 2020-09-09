import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  id:number;
  supervisorAnswer:boolean;
  text:string = "";
  headerHidden:boolean = false;
  headers:any[] = [
    "<b>DID <br> HE/SHE <br> LAUNCH A STARTUP?</b>",
    "You reached your goal. <br>Congratulations on your success.",
    "You didn't reach your goal. <br> You can make it next time."
  ]

  constructor( private route: ActivatedRoute,
    private goalService: GoalService) { }

  ngOnInit() {
    
  }
  getId(){
    //. The JavaScript (+) operator converts the string to a number
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    return id;
  }
  confirm(){
    debugger;
    this.supervisorAnswer = true;
    this.headerHidden = true;
    this.callService();
  }
  refuse(){
    debugger;
    this.supervisorAnswer = false;
    this.headerHidden = true;
    this.callService();
  }
  callService(){
    this.goalService.updateStatus(this.getId(),this.supervisorAnswer);
  }

}
