import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {PostService} from "../../services";
import {IPost} from "../../interfaces";

@Component({
  selector: 'app-posts-details',
  templateUrl: './posts-details.component.html',
})
export class PostsDetailsComponent implements OnInit {
  post: IPost

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private postService: PostService) {
    this.activatedRoute.params.subscribe(({id}) => {
      this.post = this.router.getCurrentNavigation()?.extras.state?.['post']

      if (!this.post) {
        this.postService.getById(id).subscribe(value => this.post = value)
      }
    })
  }

  ngOnInit(): void {
  }

}
