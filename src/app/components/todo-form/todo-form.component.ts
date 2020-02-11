import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  @Input() form: FormGroup;
  isEditMode: boolean;

  constructor() { }

  ngOnInit() {
    if (this.form.value.isDone) { this.isEditMode = true; }
  }

}
