import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {IPost} from "../../interfaces";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  @Input()
  post: IPost

  constructor(private router:Router,private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  getDetails():void {
    this.router.navigate([this.post.id],{
      relativeTo:this.activatedRoute,
      state: {post:this.post}
    })
  }

}
