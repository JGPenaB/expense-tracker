import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../services/users.service';
import { CategoriesService } from '../../services/categories.service';
import { TransactionsService } from '../../services/transactions.service';
import { RecordsService } from '../../services/records.service';

import { Record } from '../../models/Record.interface';

import { MzInputModule, MzToastService } from 'ng2-materialize';

import { HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  
  //Mensaje de error de los campos de los formularios
  errorMsg:object = {
    subject:{
      required:"El campo es requerido",
      minlength:"Debe tener un mínimo de 5 caracteres",
      maxlength:"Debe tener un máximo de 200 caracteres",
    },
	date:{
		required:"La fecha es requerida",
	},
	category:{
		required:"La categoría es requerida",
	},
	amount:{
		required:"El monto es requerido",
		pattern: "Solo se aceptan números (0-9)"
	},
	type:{
		required:"El tipo de transacción es requerida",
	},
  }
  
  //Transacciones
  public TransactionsTemporal:any[] = [];
  public ListTransactions:any[] = [];
  public ActualTransaction:any = [];
  
  //Categorias
  public Categories:any[] = [];
  public AdHocCategories:any[] = [];
  
  //Variables de control
  public loading = true;
  public showTable = false;
  
  //formularios
  public registroForm: FormGroup;
  public editarForm : FormGroup;
  public recForm:Record = {description: "s"};
  
  constructor(private fb:FormBuilder, private rec:RecordsService, private toastService: MzToastService, private user:UsersService, private trans:TransactionsService, private cat:CategoriesService, private router:Router) { }

  //Añadir los Validators a los formularios
  createForm():FormGroup {
    return this.fb.group({
      subject: ['',[
        Validators.required,
        Validators.maxLength(200),
        Validators.minLength(5)
      ]],
	  category: ['', [
		Validators.required,
	  ]],
	  amount: ['', [
	    Validators.required,
		Validators.pattern('^[0-9]*$'),
	  ]],
	  type: ['', [
	    Validators.required,
	  ]],
	  date: ['',[ 
	    Validators.required,
	  ]]
    });
  }
  
  ngOnInit() {
	this.registroForm = this.createForm();
	this.editarForm = this.createForm();
		
		//Preparando el array con las Categorías del usuario
		this.cat.getAllCategories(this.user.getUser().id).subscribe(cat_data =>{
			if(cat_data.categorias.length){
				this.Categories = cat_data.categorias;
				this.CategorySort();
				this.Relocatecategories(this.Categories);
			}
		});
		
		//Preparando el array con las transacciones del usuario
		this.trans.getAllTransactions(this.user.getUser().id).subscribe(data => {
			if(data.transacciones.length){
				this.TransactionsTemporal.length = 0;
				this.ObtenerTransacciones(data.transacciones).then((value) => {
					
					//Si la funcion ObtenerTransacciones ha terminado...
					this.TransactionSort();
					this.TransactionsTemporal.reverse();
					this.ListTransactions = this.TransactionsTemporal;
					this.loading = false;
					this.showTable = true;
				});
			} else{
				this.loading = false;
				this.showTable = false;
			}
		});
		

     
  }
  
  /*
			Funciones
  */
  
  //Obtener transacciones de la semana pasada
  public TransaccionesSemanaPasada():void{
	this.loading = true;
	this.showTable = false;
	this.trans.getAllTransactionsLastWeek(this.user.getUser().id).subscribe(data => {
		if(data.transacciones.length){
			this.TransactionsTemporal.length = 0;
			this.ObtenerTransacciones(data.transacciones).then((value) => {
					
				this.TransactionSort();
				this.TransactionsTemporal.reverse();
				this.ListTransactions = this.TransactionsTemporal;
				this.loading = false;
				this.showTable = true;
			});
		} else{
			this.loading = false;
			this.showTable = false;
		}
	});
  }
  
  //Obtener transacciones del mes pasado
  public TransaccionesMesPasado():void{
	this.loading = true;
	this.showTable = false;
	this.trans.getAllTransactionsLastMonth(this.user.getUser().id).subscribe(data => {
		if(data.transacciones.length){
			this.TransactionsTemporal.length = 0;
			this.ObtenerTransacciones(data.transacciones).then((value) => {
					
				this.TransactionSort();
				this.TransactionsTemporal.reverse();
				this.ListTransactions = this.TransactionsTemporal;
				this.loading = false;
				this.showTable = true;
			});
		} else{
			this.loading = false;
			this.showTable = false;
		}
	});
  }
  
  //Obtener transacciones de principios de año
  public TransaccionesPrimerDia():void{
	this.loading = true;
	this.showTable = false;
	this.trans.getAllTransactionsLastYear(this.user.getUser().id).subscribe(data => {
		if(data.transacciones.length){
			this.TransactionsTemporal.length = 0;
			this.ObtenerTransacciones(data.transacciones).then((value) => {
					
				//Si la funcion ObtenerTransacciones ha terminado...
				this.TransactionSort();
				this.TransactionsTemporal.reverse();
				this.ListTransactions = this.TransactionsTemporal;
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
			this.TransactionsTemporal.push(element);
			
			if (element.id == data[data.length-1].id){
				//console.log("Termino"); 
				resolve(); 
			}
			});
		});
	}
  
  //Reubicar categorias, para facilitar el acceso en el HTML
  public Relocatecategories(data):void{
	  data.forEach(element => {
			  this.AdHocCategories[element.id] = element.name;
	  });
  }
  //Mostrar un mensaje
  showToast(msg:string,time:number,color:string) {
    this.toastService.show(msg, time, color);
  }
  
  //Obtener una transacción en base al objeto ListTransactions, en lugar de una petición AJAX
  public getTransactionLocal(id, data):Promise<void>{
	  return new Promise((resolve,reject) => {
		  data.forEach(element => {
			  if(id == element.id){
				  resolve(element);
			  }
			  if(element.id == data[data.length-1].id && id != element.id){
				  reject();
			  }
		  });
	  });
  }
  
  //Refrescar la selección actual de la transacción
  public ActualTransactionRefresh(id):Promise<void>{
	  return new Promise((resolve,reject) => {
		  this.getTransactionLocal(id, this.ListTransactions).then(data => {
			this.ActualTransaction = data;
			this.editarForm.controls['subject'].setValue(this.ActualTransaction.subject);
			this.editarForm.controls['category'].setValue(this.ActualTransaction.category_id);
			this.editarForm.controls['amount'].setValue(this.ActualTransaction.amount);
			this.editarForm.controls['date'].setValue(this.ActualTransaction.date);
			this.editarForm.controls['type'].setValue(this.ActualTransaction.type);
			resolve();
		});
	  }); 
  }
  
  //Pequeña funcion para inicializar la edición
  public EmpezarEdicion(cid, modalid):void{
	  this.loading = true;
	  this.ActualTransactionRefresh(cid).then((value) => {
		  this.loading = false;
		  modalid.open();
	  });
  }
  
  //Pequeña funcion para inicializar la eliminación
  public EmpezarEliminacion(tid, modalid):void{
	  this.loading = true;
	  this.ActualTransactionRefresh(tid).then((value) => {
		  this.loading = false;
		  modalid.open();
	  });
  }
  
  //Pequeña funcion para inicializar la visualización
  public VerTransaccion(tid, modalid):void{
	  this.loading = true;
	  this.ActualTransactionRefresh(tid).then((value) => {
		  this.loading = false;
		  modalid.open();
	  });
  }
  
  //Eliminar transacción
  public EliminarTransaccion(modalid):void{
	this.loading = true;
	this.showTable = false;
	this.ListTransactions = null;
	this.trans.deleteTransaction(this.ActualTransaction.id).subscribe(res => {
		
		this.trans.getAllTransactions(this.user.getUser().id).subscribe(data => {
			if(data.transacciones.length){
				this.TransactionsTemporal.length = 0;
				this.ObtenerTransacciones(data.transacciones).then((value) => {
					this.TransactionSort();
					this.TransactionsTemporal.reverse();
					this.ListTransactions = this.TransactionsTemporal;
					
					this.recForm.description = "Se eliminó la transacción ID: "+this.ActualTransaction.id;
					this.rec.registerRecord(this.recForm, this.user.getUser().id).subscribe((value) => {
						this.showToast("Transacción eliminada con éxito",7000,"green accent-4");
						this.loading = false;
						this.showTable = true;
						modalid.close();
					});
					
				});
			} else {
				this.recForm.description = "Se eliminó la transacción ID: "+this.ActualTransaction.id;
					this.rec.registerRecord(this.recForm, this.user.getUser().id).subscribe((value) => {
						this.showToast("Transacción eliminada con éxito",7000,"green accent-4");
						this.loading = false;
						this.showTable = false;
						modalid.close();
					});
			}
		});
		
	});
  }
  
  //Registrar transaccioón
  onSubmit(modalid){
	this.loading = true;
	this.showTable = false;
	this.ListTransactions = null;
	this.trans.registerTransaction(this.registroForm.value, this.user.getUser().id, this.registroForm.get('category').value).subscribe(exito => {
		this.trans.getAllTransactions(this.user.getUser().id).subscribe(data => {
			if(data.transacciones.length){
				this.TransactionsTemporal.length = 0;
				this.ObtenerTransacciones(data.transacciones).then((value) => {
					this.TransactionSort();
					this.TransactionsTemporal.reverse();
					this.ListTransactions = this.TransactionsTemporal;
					
					this.recForm.description = "Se registró una nueva transacción";
					this.rec.registerRecord(this.recForm, this.user.getUser().id).subscribe(gg => {
						this.showToast("Transacción registrada con éxito",7000,"green accent-4");
						this.loading = false;
						this.showTable = true;
						modalid.close();
					});
				});
			}
		});
	});
  }
  
  //Submit Registrar registerTransaction(credentials:{name:string},id:number,cid:number)
  onSubmitedit(modalid){
	this.loading = true;
	this.showTable = false;
	this.ListTransactions = null;
	this.trans.updateTransaction(this.editarForm.value, this.ActualTransaction.id).subscribe(exito => {
		this.trans.getAllTransactions(this.user.getUser().id).subscribe(data => {
			if(data.transacciones.length){
				this.TransactionsTemporal.length = 0;
				this.ObtenerTransacciones(data.transacciones).then((value) => {
					this.TransactionSort();
					this.TransactionsTemporal.reverse();
					this.ListTransactions = this.TransactionsTemporal;
					this.recForm.description = "Se editó la transacción ID: "+this.ActualTransaction.id;
					this.rec.registerRecord(this.recForm, this.user.getUser().id).subscribe((value) => {
						this.showToast("Transacción editada con éxito",7000,"green accent-4");
						this.loading = false;
						this.showTable = true;
						modalid.close();
					});
				});
			}
		});
	});
  }
  
  //Reordenar las categorías en base a la ID
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
	
	//Reordenar las transacciones en base a la ID
	public TransactionSort():void{
		this.TransactionsTemporal.sort( function(id1, id2) {
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
