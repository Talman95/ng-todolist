import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { GetTaskResponse, Task, TasksState } from '../models/task.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = new BehaviorSubject<TasksState>({});
  tasks$ = this.tasks.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(todoId: string) {
    this.http
      .get<GetTaskResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`)
      .pipe(
        map(res => {
          const tasksState = this.tasks.getValue();

          tasksState[todoId] = res.items;
          return tasksState;
        })
      )
      .subscribe(res => {
        this.tasks.next(res);
      });
  }
}
