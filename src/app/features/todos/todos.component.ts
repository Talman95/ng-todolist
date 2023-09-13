import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from 'src/app/core/services/todos.service';
import { Todo } from 'src/app/core/models/todos.model';
import { Observable } from 'rxjs';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'tl-todos',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$!: Observable<Todo[]>;

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todos$ = this.todosService.todos$;

    this.todosService.getTodos();
  }
}
