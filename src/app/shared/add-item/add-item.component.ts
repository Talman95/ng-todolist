import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tl-add-item',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent {
  @Input({ required: true }) title!: string;
  @Output() readonly addItem = new EventEmitter<string>();

  addItemHandler() {
    const trimmedTitle = this.title.trim();
    if (trimmedTitle === '') {
      return;
    }

    this.addItem.emit(this.title);
    this.title = '';
  }

  onEnterPress() {
    this.addItemHandler();
  }
}
