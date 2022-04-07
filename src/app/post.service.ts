import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from '../BlogPost';
import { Observable } from 'rxjs';

const perPage = 6;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  
  // Get posts per page
  getPosts(page: any, tag: any, category:any): Observable<BlogPost[]> {
    let url = `https://obscure-atoll-68794.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`;

    if(tag != null){
      url += `&tag=${tag}`;//remove #
    }
    if(category != null){
      url += `&category=${category}`;
    }

    return this.http.get<BlogPost[]>(url);
  }

  // Get post by id
  getPostByID(id:any): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://obscure-atoll-68794.herokuapp.com/api/posts/${id}`);
  }

  // Get categories
  getCategories(): Observable<any> {
    return this.http.get<any>(`https://obscure-atoll-68794.herokuapp.com/api/categories`);
  }

  // Get tags
  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`https://obscure-atoll-68794.herokuapp.com/api/tags`);
  }

}