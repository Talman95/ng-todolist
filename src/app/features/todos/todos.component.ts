import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from 'src/app/core/services/todos.service';
import { Todo } from 'src/app/core/models/todo.model';
import { Observable } from 'rxjs';
import { TodoComponent } from './todo/todo.component';
import { AddItemComponent } from 'src/app/shared/add-item/add-item.component';

@Component({
  selector: 'tl-todos',
  standalone: true,
  imports: [CommonModule, TodoComponent, AddItemComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  title = '';

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todos$ = this.todosService.todos$;

    this.todosService.getTodos();
  }

  addTodoHandler(title: string) {
    this.todosService.addTodo(title);
  }

  removeTodo(todoId: string) {
    this.todosService.removeTodo(todoId);
  }
}
