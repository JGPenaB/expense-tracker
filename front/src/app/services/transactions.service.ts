import { Injectable } from '@angular/core';
//HTTPs requests to API REST
import { HttpClient } from "@angular/common/http";
//environments vars
import { environment } from "../../environments/environment";
//reactive programing
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

@Injectable()
export class TransactionsService {

  constructor(private http:HttpClient) { }

  getAllTransactions(id){
    return this.http.get<any>(environment.apiUrl+'users/'+id+'/categories/transactions');
  }
  
  getAllTransactionsLastWeek(id){
    return this.http.get<any>(environment.apiUrl+'users/'+id+'/categories/transactions/lastweek');
  }
  
  getAllTransactionsLastMonth(id){
    return this.http.get<any>(environment.apiUrl+'users/'+id+'/categories/transactions/lastmonth');
  }
  
  getAllTransactionsLastYear(id){
    return this.http.get<any>(environment.apiUrl+'users/'+id+'/categories/transactions/lastyear');
  }
  
  getTransaction(id){
    return this.http.get<any>(environment.apiUrl+'users/categories/transactions/'+id);
  }
  
  registerTransaction(credentials:{subject:string,category:string,amount:number,date:string,type:string},id,cid){
    return this.http.post<any>(environment.apiUrl+'users/'+id+'/categories/'+cid+'/transactions/register',credentials);
  }
  
  updateTransaction(credentials:{subject?:string,category?:string,amount?:number,date?:string,type?:string},id){
    return this.http.put<any>(environment.apiUrl+'users/categories/transactions/'+id, credentials);
  }
  
  deleteTransaction(id){
    return this.http.delete<any>(environment.apiUrl+'users/categories/transactions/'+id);
  }
  
}