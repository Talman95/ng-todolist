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
}
