import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { TodoFilter } from 'src/app/core/enums/todo-filter.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'tl-todo-filter',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
})
export class TodoFilterComponent {
  @Input({ required: true }) filter$!: Observable<TodoFilter>;

  @Output() readonly changeFilter = new EventEmitter<TodoFilter>();

  todoFilter = TodoFilter;

  onChangeFilter(event: MatButtonToggleChange) {
    this.changeFilter.emit(event.value);
  }
}
