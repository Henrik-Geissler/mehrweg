/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import type { DBConfig } from 'ngx-indexed-db';
import { NgxIndexedDBModule } from 'ngx-indexed-db';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


// Ahead of time compiles requires an exported function for factories
/**
 *
 */
export function migrationFactory() {
  return {
    1: (database, transaction) => {
      // const store = transaction.objectStore('people');
      // store.createIndex('country', 'country', { unique: false });
    },
    4: (database, transaction) => {
      const store = transaction.objectStore('codes')
      store.createIndex('dataType', 'dataType', { unique: false })
    },
    5: (database, transaction) => {
      const store = transaction.objectStore('codes')
      store.createIndex('favorite', 'favorite', { unique: false })
    },
  }
}
const databaseConfig: DBConfig = {
    migrationFactory,
    name: 'QrScanner',
    objectStoresMeta: [{
        store: 'codes',
        storeConfig: { autoIncrement: true, keyPath: 'id' },
        storeSchema: [
            { keypath: 'type', name: 'type', options: { unique: false } },
            { keypath: 'actionType', name: 'actionType', options: { unique: false } },
            { keypath: 'dataType', name: 'dataType', options: { unique: false } },
            { keypath: 'data', name: 'data', options: { unique: false } },
            { keypath: 'createdAt', name: 'createdAt', options: { unique: false } },
            { keypath: 'favorite', name: 'favorite', options: { unique: false } },
        ]
    }],
    version: 5
};

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    entryComponents: [],
  imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        NgxIndexedDBModule.forRoot(databaseConfig)
  ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ]
})
export class AppModule {}
