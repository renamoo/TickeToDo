import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DailyPage } from './daily.page';
import { TicketComponent } from './ticket/ticket.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: DailyPage }])
  ],
  declarations: [DailyPage, TicketComponent]
})
export class DailyPageModule { }
