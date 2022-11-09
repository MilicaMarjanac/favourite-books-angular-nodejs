import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.apiUrl;

  public createBook(book: Book): Observable<any> {
    return this.http
      .post<Book>(`${this.baseUrl}books`, book)
      .pipe(catchError(this.handleError));
  }

  public editBook(book: Book): Observable<any> {
    return this.http
      .put<Book>(`${this.baseUrl}books/${book._id}`, book)
      .pipe(catchError(this.handleError));
  }

  public deleteBook(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}books/${id}`)
      .pipe(catchError(this.handleError));
  }

  public getBooks(): Observable<any> {
    return this.http
      .get<Book[]>(`${this.baseUrl}books`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return throwError(() => {
      return error;
    });
  }
}
