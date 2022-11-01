import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CommentsComponent} from "./components/comments/comments.component";
import {CommentDetailsComponent} from "./components/comment-details/comment-details.component";
import {CommentsResolver} from "./services/resolvers/comments.resolver";
import {CommentResolver} from "./services/resolvers/comment.resolver";

const routes: Routes = [
  {
    path: '', resolve:{comments:CommentsResolver} , component: CommentsComponent,
    children: [
      {path: ':id', component: CommentDetailsComponent, resolve:{comment:CommentResolver}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule {
}
