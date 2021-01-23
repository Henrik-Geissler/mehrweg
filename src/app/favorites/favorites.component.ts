/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { Component } from '@angular/core';
import type { ToastController } from '@ionic/angular';
import { takeUntil, tap } from 'rxjs/operators';

import { BaseComponent } from '../base.component';
import type { QR } from '../shared/model/qr';
import type { QrService } from '../shared/services/qr.service';
import { QrHistoryGroupType } from '../shared/services/qr.service';

@Component({
  selector: 'app-favorites',
  styleUrls: ['./favorites.component.scss'],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent extends BaseComponent {
  favorites: Map<string, QR[]>

  constructor(
    private readonly qrService: QrService,
    private readonly toastController: ToastController
  ) {
    super()
  }

  ionViewWillEnter(): void {
    this.loadFavorites(QrHistoryGroupType.GROUP_BY_DATE)
  }

  ionViewDidLeave() {
    this.ngOnDestroy()
  }

  loadFavorites(groupType: QrHistoryGroupType): void {
    this.qrService
      .loadFavorites(groupType)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => (this.favorites = res))
  }

  deleteQr(id: number): void {
    this.qrService
      .deleteQR(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() =>
        this.toastController
          .create({
            duration: 2_000,
          message: 'QR Code deleted!'
          })
          .then(toast => toast.present())
      )
  }
}
