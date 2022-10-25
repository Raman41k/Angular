import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {IComment} from "../../interfaces";
import {urls} from "../../configs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient:HttpClient) { }

  getAll () {
    return this.httpClient.get<IComment[]>(urls.comments)
  }
}
