import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {IComment} from "../../interfaces";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
})

export class CommentComponent implements OnInit {
  @Input()
  comment:IComment

  constructor(private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  getAll():void {
    this.router.navigate([this.comment.id], {
      relativeTo:this.activatedRoute,
      state: {comment:this.comment}
    })
  }
}
