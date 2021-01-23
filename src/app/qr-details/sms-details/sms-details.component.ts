/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Component, Input } from '@angular/core';

import type { QR } from '../../shared/model/qr';
import { Mail } from '../../shared/model/qr-data/mail';
import type { Sms } from '../../shared/model/qr-data/sms';
import type { QrService } from '../../shared/services/qr.service';
import { AbstractDetailsComponent } from '../abstract-details-component';

@Component({
  selector: 'app-sms-details',
  styleUrls: ['./sms-details.component.scss'],
  templateUrl: './sms-details.component.html',
})
export class SmsDetailsComponent extends AbstractDetailsComponent
  implements OnInit, OnChanges {
  @Input() qr: QR

  sms: Sms

  constructor(private readonly qrService: QrService) {
    super()
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qr && changes.qr.currentValue) {
      this.sms = this.qrService.getData(changes.qr.currentValue as QR) as Sms
    }
  }
}
