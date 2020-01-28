import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { DbService } from '../services/db.service';
import { ToDo } from './../models';

@Component({
  selector: 'app-daily',
  templateUrl: 'daily.page.html',
  styleUrls: ['daily.page.scss']
})
export class DailyPage implements OnInit {
  todos$: Observable<ToDo[]>;
  date = new Date();
  dateStr = dayjs(this.date).format('MM/DD');

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.todos$ = this.dbService.todos$;
    this.dbService.getToDos(this.date);
  }

  trackBy(i, todo: ToDo) {
    return todo.id;
  }

  prevDate() {
    this.date = dayjs(this.date).subtract(1, 'day').toDate();
    this.dateStr = dayjs(this.date).format('MM/DD');
    this.dbService.getToDos(this.date);
  }

  nextDate() {
    this.date = dayjs(this.date).add(1, 'day').toDate();
    this.dateStr = dayjs(this.date).format('MM/DD');
    this.dbService.getToDos(this.date);
  }
}
