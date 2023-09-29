import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from 'src/app/core/models/todo.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditableSpanComponent } from '../../../shared/editable-span/editable-span.component';
import { TodosService } from 'src/app/core/services/todos.service';

@Component({
  selector: 'tl-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, EditableSpanComponent],
})
export class TodoComponent {
  @Input({ required: true }) todo!: Todo;

  @Output() readonly removeTodo = new EventEmitter();

  constructor(private todosService: TodosService) {}

  removeTodoHandler() {
    this.removeTodo.emit(this.todo.id);
  }

  updateTitleHandler(title: string) {
    this.todosService.updateTodo(this.todo.id, title);
  }
}
