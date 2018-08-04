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
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

	errorMsg:object = {
    name:{
      required:"El campo es requerido",
      minlength:"Debe tener un mínimo de 5 caracteres",
      maxlength:"Debe tener un máximo de 200 caracteres",
    }
  }
  
   //Transacciones
  public ListTransactions:any[] = [];
  
  //Categorias
  public Categories:any[] = [];
  public ActualCategory:any = [];
 
  //Variables de control
  public loading = true;
  public showTable = false;
  
  //Formularios
  public registroForm: FormGroup;
  public editarForm : FormGroup;
  public recForm:Record = {description: "s"};
  
  constructor(private fb:FormBuilder, private rec:RecordsService, private toastService: MzToastService, private user:UsersService, private trans:TransactionsService, private cat:CategoriesService, private router:Router) { }

  createForm():FormGroup {
    return this.fb.group({
      name: ['',[
        Validators.required,
        Validators.maxLength(200),
        Validators.minLength(5)
      ]],
	  nameedit: ['', [
		Validators.required,
        Validators.maxLength(200),
        Validators.minLength(5)
	  ]]
    });
  }
  
  ngOnInit() {
	
	this.registroForm = this.createForm();
	this.editarForm = this.createForm();
	  
	this.cat.getAllCategories(this.user.getUser().id).subscribe(cat_data =>{
		if(cat_data.categorias.length){
			this.Categories = cat_data.categorias;
			this.CategorySort();
			this.loading = false;
			this.showTable = true;
		} else {
			this.loading = false;
			this.showTable = false;
		}
	});
	
  }
  
  
  //Refrescar la selección actual de la categoría
  public ActualCategoryRefresh(id):Promise<void>{
	  return new Promise((resolve,reject) => {
		  this.getCategoryLocal(id, this.Categories).then(data => {
			this.ActualCategory = data;
			this.editarForm.controls['name'].setValue(this.ActualCategory.name);
			resolve();
		});
	  });
	  
  }
  
  //Pequeña funcion para inicializar la edición
  public EmpezarEdicion(cid, modalid):void{
	  this.loading = true;
	  this.ActualCategoryRefresh(cid).then((value) => {
		  this.loading = false;
		  modalid.open();
	  });
  }
  
  //Pequeña funcion para inicializar la eliminación
  public EmpezarEliminacion(tid, modalid):void{
	  this.loading = true;
	  this.ActualCategoryRefresh(tid).then((value) => {
		  this.loading = false;
		  modalid.open();
	  });
  }
  
  //Ordenar transacciones
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
	
	//Obtener transacciones
	public ObtenerTransacciones(data):Promise<void>{
	return new Promise((resolve,reject) => {
		data.forEach(element => {
			this.ListTransactions.push(element);
			if (element.id == data[data.length-1].id){
				resolve(); 
			}
			});
		});
	}
	
	//Eliminar transacciones cuya category_id coincida con el id
	public EliminarTransaccionesCascada(data, id):Promise<void>{
	return new Promise((resolve,reject) => {
		data.forEach(element => {
			if(element.category_id == id){
				this.trans.deleteTransaction(element.id).subscribe((value) => {
					if (element.id == data[data.length-1].id){
						resolve(); 
					}
				});
			} else {
				if (element.id == data[data.length-1].id){
						resolve(); 
					}
			}
			});
		});
	}
	
  //Funcion para eliminar todas las transacciones asociadas a una categoría, y luego eliminar esa categoría
  public EliminarCategoria(modalid):void{
	this.loading = true;
	this.ListTransactions.length = 0;
	
		this.trans.getAllTransactions(this.user.getUser().id).subscribe(data => {
			if(data.transacciones.length){
				
				this.ObtenerTransacciones(data.transacciones).then((value) => {
					this.EliminarTransaccionesCascada(this.ListTransactions, this.ActualCategory.id).then((value) => {
						this.cat.deleteCategory(this.ActualCategory.id).subscribe(res => {
							this.cat.getAllCategories(this.user.getUser().id).subscribe(newcat => {
				
								if(newcat.categorias.length){
									this.Categories = newcat.categorias;
									this.CategorySort();
									this.recForm.description = "Se eliminó la categoría '"+this.ActualCategory.name+"' junto con las transacciones asociadas a ella";
									this.rec.registerRecord(this.recForm, this.user.getUser().id).subscribe((value) => {
										this.loading = false;
										this.showTable = true;
										this.showToast("Categoría eliminada con éxito",7000,"green accent-4");
										modalid.close();
									}, error => {
										this.user.logout();
									});
								} else {
									this.Categories.length = 0;
									this.recForm.description = "Se eliminó la categoría '"+this.ActualCategory.name+"' junto con las transacciones asociadas a ella";
									this.rec.registerRecord(this.recForm, this.user.getUser().id).subscribe((value) => {
										this.loading = false;
										this.showTable = true;
										this.showToast("Categoría eliminada con éxito",7000,"green accent-4");
										modalid.close();
									}, error => {
										this.user.logout();
									});
								}
							});
						});
					});
				});
			} else {
				this.cat.deleteCategory(this.ActualCategory.id).subscribe(res => {
					this.cat.getAllCategories(this.user.getUser().id).subscribe(newcat => {
				
						if(newcat.categorias.length){
							this.Categories = newcat.categorias;
							this.CategorySort();
							this.recForm.description = "Se eliminó la categoría '"+this.ActualCategory.name+".";
								this.rec.registerRecord(this.recForm, this.user.getUser().id).subscribe((value) => {
									this.loading = false;
									this.showTable = true;
									this.showToast("Categoría eliminada con éxito",7000,"green accent-4");
									modalid.close();
								}, error => {
									this.user.logout();
								});
						} else {
							this.Categories.length = 0;
							this.recForm.description = "Se eliminó la categoría '"+this.ActualCategory.name+".";
								this.rec.registerRecord(this.recForm, this.user.getUser().id).subscribe((value) => {
									this.loading = false;
									this.showTable = true;
									this.showToast("Categoría eliminada con éxito",7000,"green accent-4");
									modalid.close();
								}, error => {
									this.user.logout();
								});
						}
					}, error => {
						this.user.logout();
					});
				});
			}
		}, error => {
			this.user.logout();
		});
  }
  
	
  //Mostrar un mensaje
  showToast(msg:string,time:number,color:string) {
    this.toastService.show(msg, time, color);
  }
  
  //Revisar si el nombre registrado está en uso o no.
  public CheckIfNameExist(name, data):Promise<void>{
	  return new Promise((resolve,reject) => {
		  
		  if(data.length){
		  data.forEach(element => {
			  if(name === element.name){
				  reject();
			  }
			  if(element.id == data[data.length-1].id && name !== element.name){
				  resolve();
			  }
		  });
		  } else {
			  resolve();
		  }
	  });
  }
  
  //Obtener una categoría en base al objeto Categories, en lugar de una petición AJAX
  public getCategoryLocal(id, data):Promise<void>{
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
  
  //Submit Editar
  onSubmitUpdate(modalid){
	this.loading = true;
	this.CheckIfNameExist(this.editarForm.get('name').value,this.Categories).then((v) => {
		this.cat.updateCategory(this.editarForm.value, this.ActualCategory.id).subscribe(exito => {
			
			this.cat.getAllCategories(this.user.getUser().id).subscribe(newcat => {
				
				if(newcat.categorias.length){
					this.Categories = newcat.categorias;
					this.CategorySort();
					this.recForm.description = "Se renombró la categoría '"+this.ActualCategory.name+"' a '"+this.editarForm.get('name').value+"'";
					this.rec.registerRecord(this.recForm, this.user.getUser().id).subscribe(gg => {
						this.loading = false;
						this.showTable = true;
						this.showToast("Categoría editada con éxito",7000,"green accent-4");
						modalid.close();
					});
				}
			});
		}, error => {
			this.user.logout();
		});
	}, error => {
		this.loading = false;
		this.showToast("El nombre de la categoría está en uso.",7000,"red accent-4");
	});
  }
  
  //Submit Registrar
  onSubmit(modalid){
	this.loading = true;
	this.CheckIfNameExist(this.registroForm.get('name').value,this.Categories).then((value) => {
		this.cat.registerCategory(this.registroForm.value, this.user.getUser().id).subscribe(exito => {
			
			this.cat.getAllCategories(this.user.getUser().id).subscribe(newcat => {
				
				if(newcat.categorias.length){
					this.Categories = newcat.categorias;
					this.CategorySort();
					this.loading = false;
					this.showTable = true;
					this.recForm.description = "Se registró una nueva categoría: "+this.registroForm.get('name').value;
					this.rec.registerRecord(this.recForm, this.user.getUser().id).subscribe((value) => {
						this.showToast("Categoría registrada con éxito",7000,"green accent-4");
						modalid.close();
					});
					
				}
			});
			
		}, error => {
			this.user.logout();
		});
	}, error => {
		this.loading = false;
		this.showToast("El nombre de la categoría está en uso.",7000,"red accent-4");
	});
  }
  
  
}
