import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { __await } from 'tslib';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {
  donetaskcss = "text-decoration-line-through"
  checked = false
  specialEvents = []
  show = null
  registerTask = {
   taskname: "",
   taskdesc: "",
   taskstatus: false
  }
  updateTask = {
    _id: "",
    status: undefined
  }
  newdata = {
    _id : ""
  }

  constructor(private _snackBar: MatSnackBar,private _eventService: EventService,private _router: Router,private _auth: AuthService) { }

  ngOnInit(){
  
    this._eventService.getSpecialEvents()
    .subscribe(
      res => this.specialEvents = res,
      err =>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['/login'])
          }
        }
      }
    )
    
  }
  CreateTask(){
    this._auth.CreateTask(this.registerTask)
    .subscribe(
      res => { this._snackBar.open("Realizado com sucesso","OK"),
        this._eventService.getSpecialEvents()
        .subscribe(
          res => this.specialEvents = res,
          err =>{
            if(err instanceof HttpErrorResponse){
              if(err.status === 401){
                this._router.navigate(['/login'])
              }
            }
          }
        )
      },
      err => console.log(err)
    );
   }
   DeleteTask(id2){
    this.newdata._id = id2
     this._auth.deleteTask(this.newdata).subscribe(
       res=> {
          this._eventService.getSpecialEvents().subscribe(
          res => this.specialEvents = res,             
        )
       },
       err => console.log(err));
       this.ngOnInit();
       this._snackBar.open("Deletado com sucesso","OK")
   }

  doTask(id,status){
    this.updateTask._id = id;
    this.updateTask.status = status
    // alert(this.updateTask.status+"-"+this.updateTask._id);
 this._auth.updateTask(this.updateTask).subscribe(
      res =>{
        this._eventService.getSpecialEvents().subscribe(
          res => this.specialEvents = res,             
        )
      },
      err => console.log(err));
    
      this.ngOnInit();
       
   }
  


}
