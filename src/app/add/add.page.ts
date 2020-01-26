import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    this.form = this.fb.group({
      todo: null,
      date: null
    });
  }

  onSave() {
    this.dbService.addToDo(this.form.getRawValue())
      .pipe(first()).subscribe(() => {
        this.form.reset();
      });
  }
}
