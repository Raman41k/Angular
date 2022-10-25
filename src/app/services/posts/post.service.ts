import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


import {urls} from "../../configs";
import {IPost} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient:HttpClient) { }

  getAll () {
    return  this.httpClient.get<IPost[]>(urls.posts)
  }
}
