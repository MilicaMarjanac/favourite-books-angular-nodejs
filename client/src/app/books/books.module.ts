import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';

import { BookActionsComponent } from './components/book-actions/book-actions.component';
import { BooksListComponent } from './pages/books-list/books-list.component';

// ngx bootstrap components
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookItemComponent } from './components/book-item/book-item.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [BookActionsComponent, BooksListComponent, BookItemComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SharedModule,
  ],
})
export class BooksModule {}
