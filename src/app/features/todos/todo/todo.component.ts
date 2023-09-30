import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from 'src/app/core/models/todo.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditableSpanComponent } from '../../../shared/editable-span/editable-span.component';
import { TodosService } from 'src/app/core/services/todos.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { TasksComponent } from './tasks/tasks.component';
import { TodoFilter } from 'src/app/core/enums/todo-filter.enum';
import { TaskStatus } from 'src/app/core/enums/task-status.enum';
import { TodoFilterComponent } from './todo-filter/todo-filter.component';

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
    TodoFilterComponent,
  ],
})
export class TodoComponent implements OnInit {
  @Input({ required: true }) todo!: Todo;

  @Output() readonly removeTodo = new EventEmitter();

  tasks$!: Observable<Task[]>;

  private filter = new BehaviorSubject<TodoFilter>(TodoFilter.All);
  filter$ = this.filter.asObservable();

  constructor(
    private todosService: TodosService,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    this.tasksService.getTasks(this.todo.id);

    this.tasks$ = combineLatest([this.tasksService.tasks$, this.filter]).pipe(
      map(([allTasks, filter]) => {
        const tasks = allTasks[this.todo.id];

        if (filter === TodoFilter.Active) {
          return tasks.filter(task => task.status === TaskStatus.New);
        }

        if (filter === TodoFilter.Completed) {
          return tasks.filter(task => task.status === TaskStatus.Completed);
        }

        return tasks;
      })
    );
  }

  removeTodoHandler() {
    this.removeTodo.emit(this.todo.id);
  }

  updateTitleHandler(title: string) {
    this.todosService.updateTodo(this.todo.id, title);
  }

  onChangeFilter(filter: TodoFilter) {
    this.filter.next(filter);
  }
}
