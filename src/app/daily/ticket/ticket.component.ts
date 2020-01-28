import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DbService } from './../../services/db.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit, OnChanges {
  @Input() todo: string;
  @Input() isDone: boolean;
  @Input() id: string;

  constructor(private dbService: DbService) { }

  ngOnInit() { }

  ngOnChanges(sc: SimpleChanges) {
    if (sc.isDone) {
      // animation
    }
  }

  markAsDone() {
    this.dbService.updateToDo(this.id, { isDone: true });
  }

}