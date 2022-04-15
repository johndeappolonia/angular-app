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
  getPosts(page:number, tag: string, category: string): Observable<BlogPost[]> { 
    
    let url = `https://a4john.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`;

    if(tag != ""){
      url += `&tag=${tag}`;
    }

    if(category != null){
      url += `&category=${category}`;
    }
    return this.http.get<BlogPost[]>(url);
  }

  getPostByID(id:any): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://a4john.herokuapp.com/api/posts/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`https://a4john.herokuapp.com/api/categories`);
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`https://a4john.herokuapp.com/api/tags`);
  }

  getAllPosts(): Observable<BlogPost[]> {
    const perPage = Number.MAX_SAFE_INTEGER.toString();

    let params = {
      page: "1",
      perPage: perPage
    }

    return this.http.get<BlogPost[]>(`https://a4john.herokuapp.com/api/posts`, { params });
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`https://a4john.herokuapp.com/api/posts`, data);
  }
  
  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`https://a4john.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`https://a4john.herokuapp.com/api/posts/${id}`);
  }

}