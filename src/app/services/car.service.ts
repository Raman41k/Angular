import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {urls} from "../configs";
import {ICar} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ICar[]>{
    return this.httpClient.get<ICar[]>(urls.cars)
  }
}
