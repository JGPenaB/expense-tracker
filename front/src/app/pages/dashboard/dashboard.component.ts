import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts-x';

import { UsersService } from '../../services/users.service';
import { CategoriesService } from '../../services/categories.service';
import { TransactionsService } from '../../services/transactions.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Chart data
  public pieChartLabels:string[] = ['Retiros','Depósitos'];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;
  
  //Transacciones
  public ListTransactions:any[] = [];
  public LastFive:any[] = [];
  public Depositos:any[] = [];
  public Retiros:any[] = [];
  public MontoDepositos:number = 0;
  public MontoRetiros:number = 0;
  
  //Categorias
  public Categories:any[] = [];
  public AdHocCategories:any[] = [];
  
  //Variables de control
  public loading = true;
  public showTable = false;
  
  constructor(private user:UsersService, private trans:TransactionsService, private cat:CategoriesService, private router:Router) { }

  ngOnInit() {
	this.loading = true;
	this.ListTransactions.length = 0;
	this.LastFive.length = 0;
		
		//Preparando el array con las Categorías del usuario
		this.cat.getAllCategories(this.user.getUser().id).subscribe(cat_data =>{
			if(cat_data.categorias.length){
				this.Categories = cat_data.categorias;
				this.CategorySort();
				this.Relocatecategories(this.Categories);
			}
		});
		
		this.trans.getAllTransactions(this.user.getUser().id).subscribe(data => {
			if(data.transacciones.length){
				
				this.ObtenerTransacciones(data.transacciones).then((value) => {
					//Si la funcion ObtenerTransacciones ha terminado...
					
					this.pieChartData[0]=this.Retiros.length;
					this.pieChartData[1]=this.Depositos.length;
					this.TransactionSort();
					this.ListTransactions.reverse();
					
					//Preparando las últimas 5 transacciones
					for(let i=0;i<5;++i){
						if(this.ListTransactions[i]){
						this.LastFive.push(this.ListTransactions[i]);
						}
					}
					
					this.loading = false;
					this.showTable = true;
				});
			} else{
				this.loading = false;
				this.showTable = false;
			}
			
		});
  }
  
  //Promise para controlar la secuencia de eventos
  public ObtenerTransacciones(data):Promise<void>{
	return new Promise((resolve,reject) => {
		data.forEach(element => {
			this.ListTransactions.push(element);
			
			switch(element.type){
				case "Depósito":
					this.Depositos.push(element);
					this.MontoDepositos += element.amount;
				break;
				case "Retiro":
					this.Retiros.push(element);
					this.MontoRetiros += element.amount;
				break;
			}
			
			if (element.id == data[data.length-1].id){
				resolve(); 
			}
			});
		});
	}
	
	//Cambiar los datos del Chart para representar Montos
	public CambiarAMonto():void{
		this.pieChartData[0]=this.MontoRetiros;
		this.pieChartData[1]=this.MontoDepositos;
		this.chart.chart.update();
	}
	
	//Cambiar los datos del Chart para representar total de transacciones hechas
	public CambiarACantidad():void{
		this.pieChartData[0]=this.Retiros.length;
		this.pieChartData[1]=this.Depositos.length;
		this.chart.chart.update();
	}
	
	//Reubicar categorias, para facilitar el acceso en el HTML
  public Relocatecategories(data):void{
	  data.forEach(element => {
			  this.AdHocCategories[element.id] = element.name;
	  });
  }
	
	public CategorySort():void{
		this.Categories.sort( function(id1, id2) {
			if(id1.id < id2.id){
				return -1;
			} else if(id1.id > id2.id){
				return 1;
			} else {
				return 0;
			}
		});
	}
	
	public TransactionSort():void{
		this.ListTransactions.sort( function(id1, id2) {
			if(id1.id < id2.id){
				return -1;
			} else if(id1.id > id2.id){
				return 1;
			} else {
				return 0;
			}
		});
	}

	
}
