import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ToDo } from './../../models';
import { DbService } from './../../services/db.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;
  todos$: Observable<ToDo[]>;
  temp: { [date: string]: ToDo[] };
  dates: string[] = ['2020/02/15'];

  constructor(
    private dbService: DbService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dbService.getAllTodos();
    this.dbService.allTodos$.subscribe(todos => {
      this.temp = todos.reduce((obj, todo) => {
        const due = dayjs(todo.date).format('YYYY/MM/DD');
        if (!obj[due]) { obj[due] = []; }
        obj[due].push(todo);
        return obj;
      }, {});
      this.dates = Object.keys(this.temp);
    });
    this.router.events.pipe(
      filter(event => (event instanceof NavigationEnd))
    ).subscribe(event => {
      this.dbService.getAllTodos();
    });
  }

  onUpdateTodo() {
    this.dbService.getAllTodos();
  }

  trackBy(i, todo: ToDo) {
    return todo.id;
  }

  trackByDate(i, date: string) {
    return date;
  }

  onJump() {
    this.content.scrollToTop();
  }
}
