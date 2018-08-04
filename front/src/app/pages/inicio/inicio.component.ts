import { Component, OnInit } from '@angular/core';
//Necesary to handle reactive forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//models
import { User } from "../../models/Login.interface";
//services
import { UsersService } from '../../services/users.service';
//to handle API 
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

//materialize CSS
import { MzInputModule, MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

   constructor() { }

  ngOnInit() {
  }
}