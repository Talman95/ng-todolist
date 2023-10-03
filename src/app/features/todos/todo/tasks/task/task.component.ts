import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/core/models/task.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskStatus } from 'src/app/core/enums/task-status.enum';
import { EditableSpanComponent } from 'src/app/shared/editable-span/editable-span.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tl-task',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, EditableSpanComponent, MatButtonModule, MatIconModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;

  @Output() readonly removeTask = new EventEmitter<string>();
  @Output() readonly statusChange = new EventEmitter<{ taskId: string; status: TaskStatus }>();
  @Output() readonly updateTitle = new EventEmitter<{ taskId: string; title: string }>();

  taskStatus = TaskStatus;

  removeTaskHandler() {
    this.removeTask.emit(this.task.id);
  }

  statusChangeHandler(checked: boolean) {
    const status = checked ? TaskStatus.Completed : TaskStatus.New;
    console.log(status);
    this.statusChange.emit({ taskId: this.task.id, status });
  }

  updateTitleHandler(title: string) {
    console.log(title);
    this.updateTitle.emit({ taskId: this.task.id, title });
  }
}
