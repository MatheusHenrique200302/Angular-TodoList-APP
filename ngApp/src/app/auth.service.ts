import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  myurl = environment.MYURL;
  private _registerUrl = `${this.myurl}/api/register`;
  private _loginUrl = `${this.myurl}/api/login`;
  private _ctaskUrl = `${this.myurl}/api/taskcreate`;
  private _dtaskUrl = `${this.myurl}/api/taskdelete`;
  private _uptaskUrl = `${this.myurl}/api/taskupdate`;
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
