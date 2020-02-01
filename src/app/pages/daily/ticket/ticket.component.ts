import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import * as dayjs from 'dayjs';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { DbService } from '../../../services/db.service';
import { ToDo } from './../../../models';
import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit, OnChanges {
  @Input() todo: string;
  @Input() isDone: boolean;
  @Input() id: string;
  @Input() date: Date;
  @Input() mode: 'none' | 'delete' | 'edit' = 'none';
  @Output() updateTodo = new EventEmitter<void>();

  constructor(
    private dbService: DbService,
    private popoverController: PopoverController,
    private fb: FormBuilder) { }

  ngOnInit() { }

  ngOnChanges(sc: SimpleChanges) {
    if (sc.isDone) {
      // animation
    }
  }

  onRightClick() {
    switch (this.mode) {
      case 'none':
        this.update({ isDone: true }); break;
      case 'delete':
        this.dbService.deleteToDo(this.id).pipe(first()).subscribe(() => {
          this.updateTodo.emit();
        });
        break;
    }
  }

  onLeftClick() {
    this.presentModal();
  }

  update(updates: Partial<ToDo>) {
    this.dbService.updateToDo(this.id, updates)
      .pipe(first()).subscribe(() => {
        this.updateTodo.emit();
      });
  }

  async presentModal() {
    const formGroup = this.fb.group({
      todo: this.todo,
      date: dayjs(this.date).format('YYYY/MM/DD'),
      isDone: this.isDone
    });
    const event$ = new Subject<void>();
    event$.pipe(first()).subscribe(() => {
      this.update(formGroup.getRawValue());
      this.popoverController.dismiss();
    });
    const modal = await this.popoverController.create({
      component: EditDialogComponent,
      backdropDismiss: true,
      showBackdrop: true,
      cssClass: 'todo_modal',
      componentProps: {
        form: formGroup,
        event$: event$
      }
    });
    return await modal.present();
  }

}
