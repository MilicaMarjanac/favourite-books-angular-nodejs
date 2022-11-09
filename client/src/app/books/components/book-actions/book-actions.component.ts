import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'src/app/services/forms.service';
import { BooksService } from 'src/app/services/books.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-actions',
  templateUrl: './book-actions.component.html',
  styleUrls: ['./book-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookActionsComponent implements OnInit, OnDestroy {
  @Output() bookEmitter = new EventEmitter();

  protected booksNotifier$ = new Subject<void>();
  public bookFormGroup: FormGroup;
  protected userId: number;

  public dropdowns: { name: string; options: string[] }[] = [
    { name: 'status', options: ['To Read', 'In Progress', 'Finished'] },
    {
      name: 'genre',
      options: [
        'Romance',
        'Drama',
        'Sci-Fi',
        'History',
        'Mystery',
        'Thriller',
        'Biography',
        'Science',
        'Art',
        'Other',
      ],
    },
  ];

  public book: Book;
  private startDate: Date | string;
  private endDate: Date | string;
  constructor(
    public formBuilder: FormBuilder,
    private booksService: BooksService,
    public formService: FormsService
  ) {}

  ngOnInit(): void {
    if (this.book) {
      this.startDate = this.book.startDate;
      this.endDate = this.book.endDate;
    }

    this.initBooksForm();

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    this.userId = user._id;
  }

  ngOnDestroy(): void {
    this.booksNotifier$.next();
    this.booksNotifier$.complete();
  }

  private initBooksForm(): void {
    this.bookFormGroup = this.formBuilder.group({
      title: [this.book ? this.book.title : '', [Validators.required]],
      author: [this.book ? this.book.author : '', [Validators.required]],
      image: [this.book ? this.book.image : '', [Validators.required]],
      status: [this.book ? this.book.status : '', [Validators.required]],
      genre: [this.book ? this.book.genre : '', [Validators.required]],
      rating: [this.book ? this.book.rating : ''],
      startDate: [
        this.book ? new Date(this.book.startDate) : '',
        [Validators.required],
      ],
      endDate: [
        this.book ? new Date(this.book.endDate) : '',
        [Validators.required],
      ],
      duration: [this.book ? this.book.duration : ''],
      description: [this.book ? this.book.description : ''],
    });
  }

  public setControlValue(event: { controlName: string; option: string }): void {
    this.bookFormGroup.controls[event.controlName].setValue(event.option);
  }

  public onDateChange(event: Date, position: string): void {
    if (this.book) {
      if (position === 'start') {
        this.book.duration = this.calculateReadingDuration(event, this.endDate);
        this.startDate = event;
      } else {
        this.book.duration = this.calculateReadingDuration(
          this.startDate,
          event
        );
        this.endDate = event;
      }
      this.bookFormGroup.controls['duration'].setValue(this.book.duration);
    }
  }

  public calculateReadingDuration(
    date1: Date | string,
    date2: Date | string
  ): number {
    return moment(date2).diff(moment(date1), 'days');
  }

  public get bookExists(): number | undefined {
    return this.book ? this.book._id : undefined;
  }

  public onFormSubmit(bookFormGroup: FormGroup, id?: number): void {
    bookFormGroup.value.duration = this.calculateReadingDuration(
      bookFormGroup.value.startDate,
      bookFormGroup.value.endDate
    );
    let request = id
      ? this.booksService.editBook({
          _id: id,
          ...bookFormGroup.value,
          userId: this.userId,
        })
      : this.booksService.createBook({
          ...bookFormGroup.value,
          userId: this.userId,
        });
    if (bookFormGroup.valid) {
      request.pipe(takeUntil(this.booksNotifier$)).subscribe({
        next: () => {
          this.bookEmitter.emit();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.statusText);
        },
      });
    }
  }
}
