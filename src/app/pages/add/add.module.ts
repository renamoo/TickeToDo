import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TodoFormModule } from '../../todo-form/todo-form.module';
import { AddPage } from './add.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodoFormModule,
    RouterModule.forChild([{ path: '', component: AddPage }])
  ],
  declarations: [AddPage]
})
export class AddPageModule { }
