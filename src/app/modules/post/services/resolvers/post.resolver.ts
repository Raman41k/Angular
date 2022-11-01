import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable} from 'rxjs';

import {IPost} from "../../interfaces";
import {PostService} from "../post.service";

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<IPost> {
  constructor(private postService:PostService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPost> {
    const {id} = route.params;
    return this.postService.getById(id);
  }
}
