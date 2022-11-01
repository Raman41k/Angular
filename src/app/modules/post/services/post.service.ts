import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";

import {IPost} from "../interfaces";
import {urls} from "../../../configs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(urls.posts).pipe(delay(2000));
  }

  getById(id: number): Observable<IPost> {
    return this.httpClient.get<IPost>(`${urls.posts}/${id}`).pipe(delay(2000));
  }
}
