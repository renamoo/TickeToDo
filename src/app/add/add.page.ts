import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as dayjs from 'dayjs';
import { first } from 'rxjs/operators';
import { DbService } from './../services/db.service';

@Component({
  selector: 'app-add',
  templateUrl: 'add.page.html',
  styleUrls: ['add.page.scss']
})
export class AddPage implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dbService: DbService) { }

  ngOnInit() {
    const today = dayjs().format('YYYY/MM/DD');
    this.form = this.fb.group({
      todo: null,
      date: today
    });
  }

  onSave() {
    this.dbService.addToDo(this.form.getRawValue())
      .pipe(first()).subscribe(() => {
        this.form.reset();
      });
  }
}
