import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  todos$: Observable<ToDo[]>;

  constructor(
    private dbService: DbService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dbService.getAllTodos();
    this.todos$ = this.dbService.allTodos$;
    this.router.events.pipe(
      filter(event => (event instanceof NavigationEnd))
    ).subscribe(event => {
      this.dbService.getAllTodos();
    });
  }

  onUpdateTodo() {

  }

  trackBy(i, todo: ToDo) {
    return todo.id;
  }

}
