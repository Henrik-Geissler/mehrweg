/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { Component } from '@angular/core'
import type { Platform } from '@ionic/angular'
import type { SplashScreen } from '@ionic-native/splash-screen/ngx'
import type { StatusBar } from '@ionic-native/status-bar/ngx'

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar
  ) {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()
    })
  }
}
