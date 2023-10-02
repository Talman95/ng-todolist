import { NotifyService } from './notify.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { GetTaskResponse, Task, TasksState } from '../models/task.model';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../models/common-response.model';
import { ResultCode } from '../enums/result-code.enum';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = new BehaviorSubject<TasksState>({});
  tasks$ = this.tasks.asObservable();

  constructor(
    private http: HttpClient,
    private notifyService: NotifyService
  ) {}

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

  addTask(todoId: string, title: string) {
    this.http
      .post<CommonResponse<{ item: Task }>>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`, {
        title,
      })
      .subscribe(res => {
        if (res.resultCode === ResultCode.success) {
          const stateTasks = this.tasks.getValue();

          stateTasks[todoId] = [res.data.item, ...stateTasks[todoId]];

          this.tasks.next(stateTasks);
        } else {
          this.notifyService.showError(res.messages[0]);
        }
      });
  }

  removeTask(todoId: string, taskId: string) {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks/${taskId}`)
      .subscribe(res => {
        if (res.resultCode === ResultCode.success) {
          const stateTasks = this.tasks.getValue();

          const tasks = stateTasks[todoId];

          stateTasks[todoId] = tasks.filter(task => task.id !== taskId);

          this.tasks.next(stateTasks);
        } else {
          this.notifyService.showError(res.messages[0]);
        }
      });
  }
}
