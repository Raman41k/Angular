import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";

import {IComment} from "../interfaces";
import {urls} from "../../../configs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<IComment[]> {
    return this.httpClient.get<IComment[]>(urls.comments).pipe(delay(2000))
  }

  getById(id: number): Observable<IComment> {
    return this.httpClient.get<IComment>(`${urls.comments}/${id}`).pipe(delay(2000))
  }

}
