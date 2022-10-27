import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {IComment} from "../../interfaces";
import {CommentService} from "../../services";

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
})
export class CommentDetailsComponent implements OnInit {
  comment:IComment
  constructor(private router:Router, private activatedRoute:ActivatedRoute, private commentService:CommentService) {
    this.activatedRoute.params.subscribe(({id}) => {

      this.comment = this.router.getCurrentNavigation()?.extras.state?.['comment']

      if (!this.comment) {
        this.commentService.getById(id).subscribe(value => this.comment = value)
      }
    })
  }

  ngOnInit(): void {
  }

}
