import { Injectable } from '@angular/core';
//HTTPs requests to API REST
import { HttpClient } from "@angular/common/http";
//environments vars
import { environment } from "../../environments/environment";
//reactive programing
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

@Injectable()
export class RecordsService {

  constructor(private http:HttpClient) { }

  getAllRecords(id){
    return this.http.get<any>(environment.apiUrl+'users/'+id+'/records');
  }
  
  getRecord(id){
    return this.http.get<any>(environment.apiUrl+'users/records/'+id);
  }
  
  registerRecord(credentials:{description:string},id){
    return this.http.post<any>(environment.apiUrl+'users/'+id+'/records/register',credentials);
  }
  
}