import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {MainLayotComponent} from "./layouts";
import {
  CommentDetailsComponent,
  CommentsComponent,
  HomeComponent,
  PostsComponent,
  PostsDetailsComponent,
  UserDetailsComponent,
  UsersComponent
} from "./components";

const routes: Routes = [
  {
    path: '', component: MainLayotComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {
        path: 'users', component: UsersComponent, children: [
          {path: ':id', component: UserDetailsComponent}
        ]
      },
      {
        path: 'posts', component: PostsComponent, children: [
          {path: ':id', component: PostsDetailsComponent}
        ]
      },
      {
        path: 'comments', component: CommentsComponent, children: [
          {path:':id', component: CommentDetailsComponent}
        ]
      }
    ]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    UserComponent,
    MainLayotComponent,
    HomeComponent,
    PostsComponent,
    CommentsComponent,
    UserDetailsComponent,
    PostComponent,
    PostsDetailsComponent,
    CommentComponent,
    CommentDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
