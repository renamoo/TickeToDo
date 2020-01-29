import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from './pages/login/firebase.service';
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private firebaseService: FirebaseService,
    private dbService: DbService,
    private swUpdate: SwUpdate,
    private alertController: AlertController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.firebaseService.init();
    this.dbService.init();
    this.checkUpdates();
  }

  checkUpdates() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async () => {
        const alert = await this.alertController.create({
          header: `App update!`,
          message: `Newer version of the app is available. It's a quick refresh away!`,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
            }, {
              text: 'Refresh',
              handler: () => {
                window.location.reload();
              },
            },
          ],
        });
        await alert.present();
      });
    }
  }
}
