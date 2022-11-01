import {Component, OnInit} from '@angular/core';

import {IComment} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {
  comments: IComment[]

  constructor(private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({comments}) => this.comments = comments)
  }

}
