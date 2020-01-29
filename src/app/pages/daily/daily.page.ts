import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ToDo } from '../../models';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-daily',
  templateUrl: 'daily.page.html',
  styleUrls: ['daily.page.scss']
})
export class DailyPage implements OnInit {
  todos$: Observable<ToDo[]>;
  date = new Date();
  dateStr = dayjs(this.date).format('MM/DD');
  mode: 'none' | 'delete' | 'edit' = 'none';

  constructor(
    private dbService: DbService,
    private router: Router,
    private modalController: ModalController) { }

  ngOnInit() {
    this.todos$ = this.dbService.todos$;
    this.router.events.pipe(
      filter(event => (event instanceof NavigationEnd))
    ).subscribe(event => {
      this.loadTodos();
    });
  }

  loadTodos() {
    this.dbService.getToDos(this.date);
  }

  trackBy(i, todo: ToDo) {
    return todo.id;
  }

  prevDate() {
    this.date = dayjs(this.date).subtract(1, 'day').toDate();
    this.dateStr = dayjs(this.date).format('MM/DD');
    this.loadTodos();
  }

  nextDate() {
    this.date = dayjs(this.date).add(1, 'day').toDate();
    this.dateStr = dayjs(this.date).format('MM/DD');
    this.loadTodos();
  }

  onUpdateTodo() {
    this.loadTodos();
  }

  changeMode(mode: 'none' | 'delete' | 'edit') {
    this.mode = mode;
  }


}
