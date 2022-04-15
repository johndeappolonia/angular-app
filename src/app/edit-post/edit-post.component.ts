import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styles: [
  ]
})
export class EditPostComponent implements OnInit {
  @Input() blogPost: BlogPost = new BlogPost();
  tags: String = "";

  constructor(private _postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this._postService.getPostByID(this.route.snapshot.params['id']).subscribe(data => {
      this.blogPost = data;
      this.tags = data.tags.toString();
    })
  }

  formSubmit() {
    this.blogPost.tags = this.tags.split(',').map(tag => tag.trim());
    this._postService.updatePostById(this.blogPost._id, this.blogPost).subscribe(() => this.router.navigate(['/admin']));
  }

  deletePost(id: any) {
    this._postService.deletePostById(id).subscribe(() => this.router.navigate(['/admin']));
  }
}