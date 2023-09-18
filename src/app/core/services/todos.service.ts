import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo.model';
import { CommonResponse } from '../models/common-response.model';
import { ResultCode } from '../enums/result-code.enum';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable();

  constructor(
    private http: HttpClient,
    private notifyService: NotifyService
  ) {}

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`)
      .subscribe(res => this.todos.next(res));
  }

  addTodo(title: string) {
    this.http
      .post<CommonResponse<{ item: Todo }>>(`${environment.baseUrl}/todo-lists`, {
        title,
      })
      .subscribe(res => {
        if (res.resultCode === ResultCode.success) {
          const newTodo = res.data.item;
          const updatedTodos = this.todos.getValue();

          this.todos.next([newTodo, ...updatedTodos]);
        } else {
          this.notifyService.showError(res.messages[0]);
        }
      });
  }

  removeTodo(todoId: string) {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/todo-lists/${todoId}`)
      .subscribe(res => {
        if (res.resultCode === ResultCode.success) {
          const todos = this.todos.getValue();
          const filteredTodos = todos.filter(tl => tl.id !== todoId);

          this.todos.next(filteredTodos);
        } else {
          this.notifyService.showError(res.messages[0]);
        }
      });
  }
}
