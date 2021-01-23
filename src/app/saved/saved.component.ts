/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { Component, OnInit } from '@angular/core'
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../base.component';
import type { QR } from '../shared/model/qr';
import type { QrService } from '../shared/services/qr.service';
import { QrHistoryGroupType } from '../shared/services/qr.service';

@Component({
  selector: 'app-saved',
  styleUrls: ['./saved.component.scss'],
  templateUrl: './saved.component.html',
})
export class SavedComponent extends BaseComponent {
  savedCodes: Map<string, QR[]>

  constructor(private readonly qrService: QrService) {
    super()
  }

  ionViewWillEnter(): void {
    this.loadSaved(QrHistoryGroupType.GROUP_BY_DATE)
  }

  ionViewDidLeave() {
    this.ngOnDestroy()
  }

  loadSaved(groupType: QrHistoryGroupType): void {
    this.qrService
      .loadSaved(groupType)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => (this.savedCodes = res))
  }
}
