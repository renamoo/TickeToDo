import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'daily',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../daily/daily.module').then(m => m.DailyPageModule)
          }
        ]
      },
      {
        path: 'add',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../add/add.module').then(m => m.AddPageModule)
          }
        ]
      },
      {
        path: 'setting',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../setting/setting.module').then(m => m.SettingPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/daily',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/daily',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
