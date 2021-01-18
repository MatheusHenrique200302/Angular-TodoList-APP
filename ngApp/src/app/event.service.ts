import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _eventsUrl = "https://restapi-angulartodoapp.matheushenriq73.repl.co/api/events";
  private _specialeventsUrl = "https://restapi-angulartodoapp.matheushenriq73.repl.co/api/mytasks"
  constructor(private http : HttpClient) { }

getEvents(){
  return this.http.get<any>(this._eventsUrl);
}

getSpecialEvents(){
  return this.http.get<any>(this._specialeventsUrl);
}

}
