import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TodoFormModule } from 'src/app/todo-form/todo-form.module';
import { DailyPage } from './daily.page';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { TicketComponent } from './ticket/ticket.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TodoFormModule,
    RouterModule.forChild([{ path: '', component: DailyPage }])
  ],
  declarations: [DailyPage, TicketComponent, EditDialogComponent],
  entryComponents: [EditDialogComponent]
})
export class DailyPageModule { }
