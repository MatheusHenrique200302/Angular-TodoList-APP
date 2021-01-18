import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _registerUrl = "https://restapi-angulartodoapp.matheushenriq73.repl.co/api/register";
  private _loginUrl = "https://restapi-angulartodoapp.matheushenriq73.repl.co/api/login";
  private _ctaskUrl = "https://restapi-angulartodoapp.matheushenriq73.repl.co/api/taskcreate";
  private _dtaskUrl = "https://restapi-angulartodoapp.matheushenriq73.repl.co/api/taskdelete";
  private _uptaskUrl = "https://restapi-angulartodoapp.matheushenriq73.repl.co/api/taskupdate";
  constructor(private http: HttpClient,private _router: Router) { }

registerUser(user){
  return this.http.post<any>(this._registerUrl,user);
}

CreateTask(data){
  return this.http.post<any>(this._ctaskUrl,data);
}
deleteTask(id){
  return this.http.post<any>(this._dtaskUrl,id);
}
updateTask(data){
  return this.http.post<any>(this._uptaskUrl,data)
}


loginUser(user){
  return this.http.post<any>(this._loginUrl,user);
}

loggedIn(){
  return !!localStorage.getItem('token');
}

getToken(){
  return localStorage.getItem('token')
}

logoutUser(){
  localStorage.removeItem('token');
  this._router.navigate(['/features']);
}
}
