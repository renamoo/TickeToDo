import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ToDo } from '../../models';
import { DbService } from '../../services/db.service';
import { DailyStateService } from './../../services/daily-state.service';

@Component({
  selector: 'app-daily',
  templateUrl: 'daily.page.html',
  styleUrls: ['daily.page.scss']
})
export class DailyPage implements OnInit {
  todos$: Observable<ToDo[]>;
  mode: 'none' | 'delete' = 'none';

  constructor(
    private dbService: DbService,
    private router: Router,
    public stateService: DailyStateService) { }

  ngOnInit() {
    this.todos$ = this.dbService.todos$;
    this.router.events.pipe(
      filter(event => (event instanceof NavigationEnd))
    ).subscribe(event => {
      this.stateService.loadTodos();
    });
  }

  trackBy(i, todo: ToDo) {
    return todo.id;
  }

  prevDate() {
    this.stateService.setPrevDate();
  }

  nextDate() {
    this.stateService.setNextDate();
  }

  onUpdateTodo() {
    this.stateService.loadTodos();
  }

  changeMode(mode: 'none' | 'delete') {
    this.mode = mode;
  }

  onSwipe(event) {
    if (event.direction === 2) {
      this.nextDate();
    } else if (event.direction === 4) {
      this.prevDate();
    }
  }

}
