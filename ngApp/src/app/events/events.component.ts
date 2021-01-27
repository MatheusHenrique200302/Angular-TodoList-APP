import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';




@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
events=[]
userCount = {
  value : Number
}
taskCount = {
  value: Number
}

  constructor(private _authService: AuthService,private _eventService: EventService) { 
 
  }

  ngOnInit() {
    this._eventService.getEvents()
    .subscribe(
      res => this.events= res,
      err => console.log(err)
    );
    this._authService.userCounter().subscribe(
      res => this.userCount = res,
      err => console.log(err)
    )
    this._authService.taskCounter().subscribe(
      res => this.taskCount = res,
      err => console.log(err)
    )
  }

}
