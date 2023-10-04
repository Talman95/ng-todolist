import { TaskStatus } from 'src/app/core/enums/task-status.enum';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/core/models/task.model';
import { Observable } from 'rxjs';
import { TasksService } from 'src/app/core/services/tasks.service';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'tl-tasks',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  @Input({ required: true }) tasks$!: Observable<Task[]>;
  @Input({ required: true }) todoId!: string;

  constructor(private tasksService: TasksService) {}

  removeTaskHandler(taskId: string) {
    this.tasksService.removeTask(this.todoId, taskId);
  }

  updateTitleHandler({ taskId, title }: { taskId: string; title: string }) {
    this.tasksService.updateTask(this.todoId, taskId, { title });
  }

  changeStatusHandler({ taskId, status }: { taskId: string; status: TaskStatus }) {
    this.tasksService.updateTask(this.todoId, taskId, { status });
  }
}
