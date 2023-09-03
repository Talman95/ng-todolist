import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tl-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {}
