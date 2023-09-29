import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tl-editable-span',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editable-span.component.html',
  styleUrls: ['./editable-span.component.scss'],
})
export class EditableSpanComponent implements OnInit, AfterViewChecked {
  @Input({ required: true }) title!: string;

  @Output() readonly updateTitle = new EventEmitter<string>();

  @ViewChild('myInput') myInputField: ElementRef<HTMLInputElement> | undefined;

  isEditMode = false;
  editableTitle = '';

  ngOnInit() {
    this.editableTitle = this.title;
  }

  ngAfterViewChecked() {
    this.myInputField?.nativeElement.focus();
  }

  startEditMode() {
    this.isEditMode = true;
  }

  stopEditMode() {
    this.isEditMode = false;
  }

  updateTitleHandler() {
    const trimmedTitle = this.editableTitle.trim();

    if (trimmedTitle === '') {
      return;
    }

    this.updateTitle.emit(trimmedTitle);
    this.stopEditMode();
  }

  onEnterPress() {
    this.updateTitleHandler();
  }
}
