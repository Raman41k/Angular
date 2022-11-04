import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {MainLayoutsComponent} from "./layouts/main-layouts/main-layouts.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {CarsComponent} from "./components/cars/cars.component";
import {AuthGuard} from "./guards";

const routes: Routes = [
  {
    path: '', component: MainLayoutsComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: "full"},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'cars', canActivate:[AuthGuard] , component: CarsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
