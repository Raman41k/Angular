import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {urls} from "../../configs";
import {IUser} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  getAll () {
    return  this.httpClient.get<IUser[]>(urls.users)
}

}
