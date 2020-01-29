import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { first } from 'rxjs/operators';
import { DbService } from '../../../services/db.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit, OnChanges {
  @Input() todo: string;
  @Input() isDone: boolean;
  @Input() id: string;
  @Input() mode: 'none' | 'delete' | 'edit' = 'none';
  @Output() updateTodo = new EventEmitter<void>();

  constructor(private dbService: DbService) { }

  ngOnInit() { }

  ngOnChanges(sc: SimpleChanges) {
    if (sc.isDone) {
      // animation
    }
  }

  onRightClick() {
    switch (this.mode) {
      case 'none':
        this.dbService.updateToDo(this.id, { isDone: true })
          .pipe(first()).subscribe(() => {
            this.updateTodo.emit();
          });
        break;
      case 'delete':
        this.dbService.deleteToDo(this.id).pipe(first()).subscribe(() => {
          this.updateTodo.emit();
        });
        break;
      case 'edit':
        break;
    }

  }

  onEdit() {

  }

}
