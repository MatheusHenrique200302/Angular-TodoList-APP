import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { __await } from 'tslib';
import { trigger, transition, style, animate} from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from "rxjs";



@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  animations: [
    trigger('fade', [

      transition('void => *', [
        style({opacity: 0}),
        animate(2000),
      ]),
      transition('* => void',[
        animate(2000,style({opacity: 0}))
      ])
    ]),],
  styleUrls: ['./special-events.component.css'],
})
export class SpecialEventsComponent implements OnInit {
  delsnackbar = null;
  deltask = [];
  donetaskcss = 'text-decoration-line-through';
  checked = false;
  specialEvents = [];
  show = null;
  show2 = null;
  loadingData = null;
  emptyArray = null;
  registerTask = {
    taskname: '',
    taskdesc: '',
    taskstatus: false,
  };
  updateTask = {
    _id: '',
    status: undefined,
  };
  newdata = {
    _id: '',
  };

  constructor(
    private _snackBar: MatSnackBar,
    private _eventService: EventService,
    private _router: Router,
    private _auth: AuthService
  ) {}

    LoadTasks(){
      this.loadingData = true;
      this.emptyArray = false;
      this._eventService.getSpecialEvents().subscribe(
        (res) => {
          this.specialEvents = res;
          this.loadingData = false;
          if(this.specialEvents.length == 0){
            this.emptyArray = true;            
          }else{
            this.emptyArray = false;
          }
        }
        
        ,(err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
        }
      );
    }  
  ngOnInit() {
    this.loadingData = true;
  
    this.LoadTasks();
    if(this.delsnackbar == true){
      this._snackBar.open('Deletado com sucesso', 'OK');
      this.delsnackbar = null;
    }
  }
  CreateTask() {
    this.emptyArray = false;
    this.loadingData = true;
    this._auth.CreateTask(this.registerTask).subscribe(
      (res) => {
        this._snackBar.open('Realizado com sucesso', 'OK'),
         this.LoadTasks();
      },
      (err) => console.log(err)
    );
    this.registerTask = {
      taskname: '',
      taskdesc: '',
      taskstatus: false,
    };
    this.show = null;
    this.ngOnInit();
  }
  async DeleteTask() {
    this.loadingData = true;
     this._auth.deleteTask(this.newdata).subscribe(
      (res) => { this.specialEvents = res        
        },
      (err) => console.log(err)
    );     
    this.show2 = null;
    this.delsnackbar = true;
    await this.delay(300);
    this.LoadTasks();
    
    }

doTask(id, status) {
  this.loadingData = true;
    this.updateTask._id = id;
    this.updateTask.status = status;
    // alert(this.updateTask.status+"-"+this.updateTask._id);
  this._auth.updateTask(this.updateTask).subscribe(
      (res) => {this.LoadTasks();
      },
      (err) => console.log(err)
    );

    this.ngOnInit();
  }
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
