import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from './../../components/components.modules';
import { ListPageComponent } from './list-page.component';



@NgModule({
  declarations: [ListPageComponent],
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule
  ]
})
export class ListPageModule { }
