import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://localhost:8080/simplelibrary/rest/books/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {
  }



  getAllBooks(): Observable<Book[]> {
    return this.http.get(this.baseUrl).pipe(
      map((response: Book[]) => {
        return response;
      })
    );
  }

  deleteBookbyId(_id) {
    return this.http.delete(this.baseUrl + _id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  updateBookbyId(book) {
    return this.http.put(this.baseUrl, JSON.stringify(book), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  createBook(book){
    return this.http.post(this.baseUrl, JSON.stringify(book), this.httpOptions)
    .pipe(
      retry(1),
        catchError(this.handleError)
    )
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}