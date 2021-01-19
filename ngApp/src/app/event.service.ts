import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

 import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class EventService {
  myurl = environment.MYURL
  private _eventsUrl = `${this.myurl}/api/events`;
  private _specialeventsUrl = `${this.myurl}/api/mytasks`
  constructor(private http : HttpClient) { }

getEvents(){
  return this.http.get<any>(this._eventsUrl);
}

getSpecialEvents(){
  return this.http.get<any>(this._specialeventsUrl);
}

}
