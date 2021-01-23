/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Component, Input } from '@angular/core';

import type { QR } from '../../shared/model/qr';
import { Mail } from '../../shared/model/qr-data/mail';
import type { QrService } from '../../shared/services/qr.service';
import { AbstractDetailsComponent } from '../abstract-details-component';

@Component({
  selector: 'app-phone-details',
  styleUrls: ['./phone-details.component.scss'],
  templateUrl: './phone-details.component.html',
})
export class PhoneDetailsComponent extends AbstractDetailsComponent
  implements OnInit, OnChanges {
  @Input() qr: QR

  phone: string

  constructor(private readonly qrService: QrService) {
    super()
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qr && changes.qr.currentValue) {
      this.phone = this.qrService.getData(
        changes.qr.currentValue as QR
      ) as string
    }
  }
}
