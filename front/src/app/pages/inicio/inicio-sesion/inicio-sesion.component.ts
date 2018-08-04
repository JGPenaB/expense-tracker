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
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

errorMsg:object = {
    email:{
      required:"El campo es requerido",
      minlength:"Debe tener un mínimo de 4 caracteres",
      maxlength:"Debe tener un máximo de 24 caracteres",
      email:"Debe introducir un email válido",
    },
    password:{
      required:"El campo es requerido",
      minlength:"Debe tener un mínimo de 8 caracteres",
      maxlength:"Debe tener un máximo de 20 caracteres",
    },

  }
  loginForm: FormGroup;
  loading = false;

  constructor(private fb:FormBuilder,private users:UsersService,private router:Router, private toastService: MzToastService) { }
  
  createForm():FormGroup {
    return this.fb.group({
      email: ['',[
        Validators.required,
        Validators.maxLength(200),
        Validators.email,
      ]],
      password: ['',Validators.required]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit() { 
	this.loginForm = this.createForm();  
  }

  showToast(msg:string,time:number,color:string) {
    this.toastService.show(msg, time, color);
  }
  
  onSubmit(){
    this.loading = true;
    this.users.login(this.loginForm.value)
    .subscribe(data => {
		this.router.navigate(['dashboard']);
	},
    (error:HttpErrorResponse) => {
      this.loading = false;
      this.showToast("Credenciales inválidas",10000,"red accent-4");
      console.log(error)
    });
  }
}
