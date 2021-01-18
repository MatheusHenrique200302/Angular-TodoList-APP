import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { AngularFireDatabase } from '@angular/fire/database'
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
events=[]
courses= []
  constructor(private database : AngularFireDatabase,private _eventService: EventService) { 
   
    database.list('/courses').valueChanges().subscribe(courses =>{
      this.courses = courses;
      console.log(this.courses);
    })
  }

  ngOnInit() {
    this._eventService.getEvents()
    .subscribe(
      res => this.events= res,
      err => console.log(err)
    );
  }

}
