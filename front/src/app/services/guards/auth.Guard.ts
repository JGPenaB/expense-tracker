import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../users.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: UsersService, public router: Router) {}

  canActivate():boolean{
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
