import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from 'src/app/core/models/todos.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'tl-todo',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input({ required: true }) todo!: Todo;
}
