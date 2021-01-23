/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { Component } from '@angular/core';
import type { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { takeUntil, tap } from 'rxjs/operators';

import { BaseComponent } from '../base.component';
import type { QR } from '../shared/model/qr';
import type { QrService } from '../shared/services/qr.service';
import { QrHistoryGroupType } from '../shared/services/qr.service';

@Component({
  selector: 'app-history',
  styleUrls: ['history.component.scss'],
    templateUrl: 'history.component.html'
})
export class HistoryComponent extends BaseComponent {
  history: Map<string, QR[]>

  constructor(
    private readonly qrService: QrService,
    private readonly toastController: ToastController
  ) {
    super()
  }

  ionViewWillEnter(): void {
    this.loadHistory(QrHistoryGroupType.GROUP_BY_DATE)
  }

  ionViewDidLeave() {
    this.ngOnDestroy()
  }

  loadHistory(groupType: QrHistoryGroupType): void {
    this.qrService
      .loadHistory(groupType)
      .pipe(
        takeUntil(this.ngUnsubscribe)
        // tap(res => console.log(res))
      )
      .subscribe(res => (this.history = res))
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
