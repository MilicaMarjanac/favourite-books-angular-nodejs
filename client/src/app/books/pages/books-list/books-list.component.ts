import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { BookActionsComponent } from '../../components/book-actions/book-actions.component';
import { Subject, takeUntil } from 'rxjs';
import { BooksService } from 'src/app/services/books.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit, OnDestroy {
  private booksNotifier$ = new Subject<void>();
  public books: Book[];
  public bsModalRef: BsModalRef;
  public user: User;
  constructor(
    private bsModalService: BsModalService,
    private booksService: BooksService,
    protected router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
    this.getBooks();
  }

  ngOnDestroy(): void {
    this.booksNotifier$.next();
    this.booksNotifier$.complete();
  }

  private getBooks(): void {
    this.booksService
      .getBooks()
      .pipe(takeUntil(this.booksNotifier$))
      .subscribe({
        next: (books: Book[]) => {
          this.books = books;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.statusText);
        },
      });
  }

  public handleBook(book?: Book) {
    const initialState: ModalOptions = {
      initialState: {
        book: book ? book : null,
      },
    };
    this.bsModalRef = this.bsModalService.show(
      BookActionsComponent,
      initialState
    );

    this.bsModalRef.content.bookEmitter
      .pipe(takeUntil(this.booksNotifier$))
      .subscribe(() => {
        this.getBooks();
        this.bsModalRef.hide();
      });
  }

  public deleteBook(id: number) {
    this.booksService
      .deleteBook(id)
      .pipe(takeUntil(this.booksNotifier$))
      .subscribe(() => {
        this.getBooks();
      });
  }

  public get booksLength() {
    return this.books ? this.books.length : 0;
  }
  public signOutUser() {
    this.authService.signOutUser().subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/']);
    });
  }
}
