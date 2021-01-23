/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Component, Input } from '@angular/core';

import type { QR } from '../../shared/model/qr';
import { Mail } from '../../shared/model/qr-data/mail';
import type { Wifi } from '../../shared/model/qr-data/wifi';
import type { QrService } from '../../shared/services/qr.service';
import { AbstractDetailsComponent } from '../abstract-details-component';

@Component({
  selector: 'app-wifi-details',
  styleUrls: ['./wifi-details.component.scss'],
  templateUrl: './wifi-details.component.html',
})
export class WifiDetailsComponent extends AbstractDetailsComponent
  implements OnInit, OnChanges {
  @Input() qr: QR

  wifi: Wifi

  constructor(private readonly qrService: QrService) {
    super()
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qr && changes.qr.currentValue) {
      this.wifi = this.qrService.getData(changes.qr.currentValue as QR) as Wifi
    }
  }
}
