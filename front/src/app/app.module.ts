import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';

//rutas
import { RoutingModule } from "./routing.module";

//servicios
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from "@angular/forms";

import { UsersService } from './services/users.service';
import { CategoriesService } from './services/categories.service';
import { TransactionsService } from './services/transactions.service';
import { RecordsService } from './services/records.service';

//guards
import { AuthGuard as AuthGuard } from "./services/guards/auth.Guard";

//interceptors
import { TokenInterceptor } from "./services/interceptor/token.interceptor";

// materialize animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//materialize
import { MzSidenavModule, MzFeatureDiscoveryModule, MzToastModule, MzButtonModule, MzInputModule, MzIconModule, MzIconMdiModule, MzValidationModule, MzCardModule, MzSpinnerModule, MzModalModule, MzTabModule, MzDropdownModule, MzSelectModule, MzDatepickerModule } from 'ng2-materialize';

import { ChartsModule } from 'ng2-charts-x';

import { InicioComponent } from './pages/inicio/inicio.component';
import { InicioSesionComponent } from './pages/inicio/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './pages/inicio/registro/registro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { RecordsComponent } from './pages/records/records.component';

@NgModule({
  declarations: [
    AppComponent,
	InicioComponent,
	InicioSesionComponent,
	RegistroComponent,
	DashboardComponent,
	CategoriesComponent,
	TransactionsComponent,
	RecordsComponent
  ],
  imports: [
    BrowserModule,
	CommonModule,
	BrowserAnimationsModule, // animations
    NoopAnimationsModule,
	HttpClientModule,
	ReactiveFormsModule, //to use reactive forms
	MzDatepickerModule,
    MzIconModule, 
    MzIconMdiModule,
    MzInputModule,
	MzModalModule,
    MzValidationModule,
    MzCardModule,
    MzSpinnerModule,
	MzSidenavModule,
	MzSelectModule,
	MzFeatureDiscoveryModule,
    MzToastModule,
	MzTabModule,
	MzDropdownModule,
	ReactiveFormsModule,
	RoutingModule,
	ChartsModule,
  ],
  providers: [
	AuthGuard,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    },
	CategoriesService,
	TransactionsService,
	RecordsService,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
