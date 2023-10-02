import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'tl-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  @Output() readonly removeTask = new EventEmitter<string>();

  removeTaskHandler() {
    this.removeTask.emit(this.task.id);
  }
}
