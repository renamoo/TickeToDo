import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() event$: Subject<'close' | 'save' | 'delete'>;

  constructor() { }

  ngOnInit() { }

  onSave() {
    this.event$.next('save');
  }

  onClose() {
    this.event$.next('close');
  }

  onDelete() {
    this.event$.next('delete');
  }
}
