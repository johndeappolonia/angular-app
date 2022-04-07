import { Component, OnDestroy, OnInit } from '@angular/core';
// import blogData from '../blogData.json';
import { BlogPost } from '../../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  page: number = 1;
  tag: string = "";
  category: string = "";
  querySub: any;

  blogPosts: Array<BlogPost>;

  constructor(private data: PostService, private route: ActivatedRoute){ }

  getPage(num:any) {
    this.querySub = this.data.getPosts(num, this.tag, this.category).subscribe(data => {
      if (data.length > 0) {
        this.blogPosts = data, this.page = num;
      }
    });
  }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if (params['tag']) {
        this.tag = params['tag'];
        this.category = "";
      } else {
        this.tag = "";
      }
      if (params['category']) {
        this.category = params['category'];
        this.tag = "";
      } else {
        this.category = "";
      }
      this.getPage(+params['page'] || 1);
    });

  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }

}
