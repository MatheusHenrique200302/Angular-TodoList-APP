import { state, style, trigger, transition } from '@angular/animations';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular TodoList App';
  constructor(public authService : AuthService){ }
}
