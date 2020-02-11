import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class DailyStateService {
  public date = new Date();
  get dateStr() {
    return dayjs(this.date).format('MM/DD');
  }

  constructor(private dbService: DbService) { }

  loadTodos() {
    this.dbService.getTodos(this.date);
  }

  setPrevDate() {
    this.date = dayjs(this.date).subtract(1, 'day').toDate();
    this.loadTodos();
  }

  setNextDate() {
    this.date = dayjs(this.date).add(1, 'day').toDate();
    this.loadTodos();
  }

  setToday() {
    const prevDateStr = this.dateStr;
    this.date = new Date();
    if (prevDateStr !== this.dateStr) {
      this.loadTodos();
    }
  }
}
