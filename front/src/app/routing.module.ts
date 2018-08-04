import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guards/auth.Guard';

import { InicioComponent } from './pages/inicio/inicio.component';
import { InicioSesionComponent } from './pages/inicio/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './pages/inicio/registro/registro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { RecordsComponent } from './pages/records/records.component';

const routes: Routes = [

  //Página de Inicio
  { path: 'home', component: InicioComponent,children:[
	  { path: '', component: InicioSesionComponent },
	  { path: 'signup', component: RegistroComponent },
  ]},
  
  //Páginas de actividades
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
  { path: 'records', component: RecordsComponent, canActivate: [AuthGuard] },
  
  //Redirects
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
