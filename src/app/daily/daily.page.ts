import { Component, OnInit } from '@angular/core';
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

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.todos$ = this.dbService.getToDos();
  }
}
