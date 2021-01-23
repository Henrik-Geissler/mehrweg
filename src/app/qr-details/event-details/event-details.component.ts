/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Component, Input } from '@angular/core';

import type { QR } from '../../shared/model/qr';
import { Mail } from '../../shared/model/qr-data/mail';
import type { VEvent } from '../../shared/model/qr-data/vevent';
import type { QrService } from '../../shared/services/qr.service';
import { AbstractDetailsComponent } from '../abstract-details-component';

@Component({
  selector: 'app-event-details',
  styleUrls: ['./event-details.component.scss'],
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent extends AbstractDetailsComponent
  implements OnInit, OnChanges {
  @Input() qr: QR

  event: VEvent

  constructor(private readonly qrService: QrService) {
    super()
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qr && changes.qr.currentValue) {
      this.event = this.qrService.getData(
        changes.qr.currentValue as QR
      ) as VEvent
    }
  }
}
