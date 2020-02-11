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
              import('../pages/daily/daily.module').then(m => m.DailyPageModule)
          }
        ]
      },
      {
        path: 'add',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/add/add.module').then(m => m.AddPageModule)
          }
        ]
      },
      {
        path: 'list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/list/list.module').then(m => m.ListPageModule)
          }
        ]
      },
      {
        path: 'setting',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/setting/setting.module').then(m => m.SettingPageModule)
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
    redirectTo: 'daily',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
