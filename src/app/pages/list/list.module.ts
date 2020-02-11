import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from './../../components/components.modules';
import { ListPageComponent } from './list-page.component';



@NgModule({
  declarations: [ListPageComponent],
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: ListPageComponent }])
  ]
})
export class ListPageModule { }
