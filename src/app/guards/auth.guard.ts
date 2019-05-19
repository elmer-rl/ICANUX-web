import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AutentificacionGuard implements CanActivate {
  constructor(private _Router: Router,
    private _AuthService: AuthService) {}
  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  return this._AuthService.afsAuth.authState
  .take(1)
  .map(authState => !! authState)
  .do(logueado => {
  if (!logueado) {
  this._Router.navigate(['login']);
  }
  });

  }
}