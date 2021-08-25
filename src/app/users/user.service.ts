import { Injectable } from '@angular/core';
import { User } from './user';
import { Category } from '../categories/category';

import { Observable, throwError } from 'rxjs';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private urlEndpoint:string = environment.baseUrl;
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient, private router: Router) {

     }

     getCategories(): Observable<Category[]>{
      return this.http.get<Category[]>(this.urlEndpoint+'/categories');
    }

    getUsers(): Observable<User[]> {
      return this.http.get(this.urlEndpoint).pipe(
        map(response => {
          let users = response as User[];
          
          return users.map(user => {
            user.username = user.username.toUpperCase();
            return user;
          });
        }
      ));
    }

    create(user: User): Observable<User>{
      return this.http.post(this.urlEndpoint, user, {headers: this.httpHeaders}).pipe(
        map((response: any) => response.user as User),
        catchError(e => {
          if(e.status == 400){
            return throwError(e);
          }
          return throwError(e);
        })
      );
    }

    getUser(id): Observable<User>{
      return this.http.get<User>(`${this.urlEndpoint}/${id}`).pipe(
        catchError(e => {
          this.router.navigate(['/users']);
          console.error(e.error.mensaje);
          return throwError(e);
        })
      );
    }

    update(user: User): Observable<User>{
      return this.http.put<User>(`${this.urlEndpoint}/${user.id}`, user, {headers: this.httpHeaders})
    }

    delete(id: number): Observable<User>{
      return this.http.delete<User>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders})
    }
}
