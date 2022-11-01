import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable} from 'rxjs';

import {UserService} from "../user.service";
import {IUser} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<IUser[]> {
  constructor(private userService:UserService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser[]> {
    return this.userService.getAll();
  }
}
