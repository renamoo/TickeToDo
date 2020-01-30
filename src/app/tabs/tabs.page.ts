import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DailyStateService } from './../services/daily-state.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private router: Router,
    private dailyState: DailyStateService) { }

  onClick() {
    const currentUrl = this.router.routerState.snapshot.url;
    if (currentUrl === '/main/tabs/daily') {
      this.dailyState.setToday();
    }
  }

}
