import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";
  private _ctaskUrl = "http://localhost:3000/api/taskcreate";
  private _dtaskUrl = "http://localhost:3000/api/taskdelete";
  private _uptaskUrl = "http://localhost:3000/api/taskupdate";
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
