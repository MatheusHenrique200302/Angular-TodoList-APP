import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css'],
})
export class TestingComponent implements OnInit {
  tasks = [];
  dbTasks =[];
  constructor(private _eventService: EventService, private _router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this._eventService.getSpecialEvents().subscribe(
      (res) => (this.dbTasks = res),
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      }
    );
    this.tasks = this.dbTasks;
    console.log(this.tasks);
  }
  
}
