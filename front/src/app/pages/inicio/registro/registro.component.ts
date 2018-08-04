import { Component, OnInit } from '@angular/core';
//Necesary to handle reactive forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//models
import { User } from "../../../models/Login.interface";
//services
import { UsersService } from '../../../services/users.service';
//to handle API 
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
//materialize CSS
import { MzInputModule, MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
	
errorMsg:object = {
    name:{
      required:"Su nombre es requerido",
      minlength:"Debe tener un mínimo de 4 caracteres",
      maxlength:"Debe tener un máximo de 200 caracteres",
	  pattern:"El nombre no puede contener números ni carácteres especiales",
    },
	email:{
      required:"",
      minlength:"Debe tener un mínimo de 10 caracteres",
      maxlength:"Debe tener un máximo de 200 caracteres",
      email:"Debe introducir un email válido",
    },
    password:{
      required:"La contraseña es requerida",
      minlength:"Debe tener un mínimo de 8 caracteres",
      maxlength:"Debe tener un máximo de 20 caracteres",
    },

  }
  RegisterForm: FormGroup;
  loading = false;

  constructor(private fb:FormBuilder,private users:UsersService,private router:Router, private toastService: MzToastService) { }
  
  createForm():FormGroup {
    return this.fb.group({
      name: ['',[
		Validators.required,
		Validators.minLength(4),
		Validators.pattern('^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]*$'),
	  ]],
	  
	  email: ['',[
        Validators.required,
        Validators.maxLength(200),
		Validators.minLength(10),
        Validators.email,
      ]],
      password: ['',[
		Validators.required,
		Validators.minLength(8),
	  ]]
    });
  }

  get email() { return this.RegisterForm.get('email'); }
  get password() { return this.RegisterForm.get('password'); }
  get name() { return this.RegisterForm.get('name'); }
  
  ngOnInit() { 
	this.RegisterForm = this.createForm();
  }

  
  showToast(msg:string,time:number,color:string) {
    this.toastService.show(msg, time, color);
  }
  
  onSubmit(){
    this.loading = true;
    this.users.registerUser(this.RegisterForm.value)
    .subscribe(data => {
		this.users.login(this.RegisterForm.value).subscribe(data => {
			this.router.navigate(['dashboard'])
		}, (error:HttpErrorResponse) => {
			this.loading = false;
			this.showToast(error.error,7000,"red accent-4");
			console.log(error)
		});
	},(error:HttpErrorResponse) => {
      this.loading = false;
      this.showToast(error.error,7000,"red accent-4");
      console.log(error)
    });
  }
}
