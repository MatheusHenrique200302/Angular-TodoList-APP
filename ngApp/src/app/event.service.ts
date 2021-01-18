import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _eventsUrl = "http://localhost:3000/api/events";
  private _specialeventsUrl = "http://localhost:3000/api/mytasks"
  constructor(private http : HttpClient) { }

getEvents(){
  return this.http.get<any>(this._eventsUrl);
}

getSpecialEvents(){
  return this.http.get<any>(this._specialeventsUrl);
}

}
