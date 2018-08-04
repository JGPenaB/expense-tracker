import { Injectable } from '@angular/core';
//HTTPs requests to API REST
import { HttpClient } from "@angular/common/http";
//environments vars
import { environment } from "../../environments/environment";
//reactive programing
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

@Injectable()
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getAllCategories(id){
    return this.http.get<any>(environment.apiUrl+'users/'+id+'/categories');
  }
  
  getCategory(id){
    return this.http.get<any>(environment.apiUrl+'users/categories/'+id);
  }
  
  registerCategory(credentials:{name:string},id){
    return this.http.post<any>(environment.apiUrl+'users/'+id+'/categories/register',credentials);
  }
  
  updateCategory(credentials:{name:string},id){
    return this.http.put<any>(environment.apiUrl+'users/categories/'+id,credentials);
  }
  
  deleteCategory(id){
    return this.http.delete<any>(environment.apiUrl+'users/categories/'+id);
  }
  
}
