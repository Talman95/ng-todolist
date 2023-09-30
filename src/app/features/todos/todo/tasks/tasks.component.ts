import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/core/models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'tl-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  @Input({ required: true }) tasks$!: Observable<Task[]>;
}
