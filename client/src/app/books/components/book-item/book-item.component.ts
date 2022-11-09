import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookItemComponent {
  @Input() book: Book;
  @Output() editBookEmitter = new EventEmitter<Book>();
  @Output() deleteBookEmitter = new EventEmitter<number>();

  constructor() {}

  public editBook(book: Book): void {
    this.editBookEmitter.emit(book);
  }
  public deleteBook(id: number | undefined): void {
    this.deleteBookEmitter.emit(id);
  }
}
