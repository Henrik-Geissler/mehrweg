/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Component, Input } from '@angular/core';

import { BaseComponent } from '../../base.component';
import { ActionType } from '../../shared/model/action-type.enum';
import type { QR } from '../../shared/model/qr';
import type { Contact } from '../../shared/model/qr-data/contact';
import type { QrService } from '../../shared/services/qr.service';

@Component({
  selector: 'app-contact-details',
  styleUrls: ['./contact-details.component.scss'],
  templateUrl: './contact-details.component.html',
})
export class ContactDetailsComponent extends BaseComponent
  implements OnInit, OnChanges {
  @Input() qr: QR

  contact: Contact

  constructor(private readonly qrService: QrService) {
    super()
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qr && changes.qr.currentValue) {
      this.contact = this.qrService.getData(
        changes.qr.currentValue as QR
      ) as Contact
    }
  }
}
