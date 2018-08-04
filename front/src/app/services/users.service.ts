import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
//HTTPs requests to API REST
import { HttpClient } from "@angular/common/http";
//environments vars
import { environment } from "../../environments/environment";
//reactive programing
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

@Injectable()
export class UsersService {

  private jwtHelper:JwtHelperService;
  
  constructor(private http:HttpClient, private router:Router) { 
    this.jwtHelper = new JwtHelperService();
  }

  login(credentials:{email:string,password:string}):Observable<any>{
    return this.http.post<any>(environment.apiUrl+'auth/login',credentials)
    .do(data => {
      localStorage.setItem('token',data.token);
      localStorage.setItem('user',btoa(JSON.stringify(data.user)));
    });
  }
  
  logout():void{
    this.http.get(environment.apiUrl+'auth/logout').subscribe(resp => {
		console.log(resp);
		localStorage.clear();
		this.router.navigate(['']);
	}, error => {
		console.log(error.error);
	});
    
  }

  refreshUserData(){
    return this.http.get<any>(environment.apiUrl+'auth/current').do(data => {
      localStorage.setItem('user',btoa(JSON.stringify(data.user)));
    }, error => {
		console.log(error.error);
	});
  }

  getUser(){
    let user = localStorage.getItem('user');
    if(!user)
      return false;
    user = atob(user);
    return JSON.parse(user);
  }
  
  getUserById(id){
    return this.http.get<any>(environment.apiUrl+'users/'+id);
  }
  
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  
  registerUser(
    credentials:{email:string,password:string,emp_code:string,name:string,rol:string}
  ):Observable<any>{
    return this.http.post<any>(environment.apiUrl+'auth/register',credentials);
  }
  
  updateUser(credentials:{email?:string,password?:string,name?:string},id):Observable<any>{
    return this.http.put<any>(environment.apiUrl+'users/'+id,credentials);
  }

}
