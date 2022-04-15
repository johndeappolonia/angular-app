import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from 'src/BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styles: [
  ]
})
export class PostsTableComponent implements OnInit {
  blogPosts: Array<BlogPost> = [];

  constructor(private _postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this._postService.getAllPosts().subscribe(data => this.blogPosts = data);
  }

  rowClicked(e: any, id: any) {
    this.router.navigate(['/admin/post', id]);
  }
}