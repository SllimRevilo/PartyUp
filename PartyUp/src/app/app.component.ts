import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    public firebase: AngularFirestore
  ) {}

  initializeApp() {
    this.platform.ready().then(() => {
      var db = this.firebase;
    });
  }
}