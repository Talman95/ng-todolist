import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from 'src/app/core/models/todo.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditableSpanComponent } from '../../../shared/editable-span/editable-span.component';
import { TodosService } from 'src/app/core/services/todos.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { combineLatest, map, Observable } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'tl-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    EditableSpanComponent,
    TasksComponent,
  ],
})
export class TodoComponent implements OnInit {
  @Input({ required: true }) todo!: Todo;

  @Output() readonly removeTodo = new EventEmitter();

  tasks$!: Observable<Task[]>;

  constructor(
    private todosService: TodosService,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    this.tasksService.getTasks(this.todo.id);

    this.tasks$ = this.tasksService.tasks$.pipe(
      map(res => {
        return res[this.todo.id];
      })
    );
  }

  removeTodoHandler() {
    this.removeTodo.emit(this.todo.id);
  }

  updateTitleHandler(title: string) {
    this.todosService.updateTodo(this.todo.id, title);
  }
}
