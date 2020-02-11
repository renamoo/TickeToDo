import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { TicketComponent } from './ticket/ticket.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [TicketComponent, EditDialogComponent, TodoFormComponent],
    exports: [TicketComponent, EditDialogComponent, TodoFormComponent],
    entryComponents: [EditDialogComponent],
})
export class ComponentsModule { }
