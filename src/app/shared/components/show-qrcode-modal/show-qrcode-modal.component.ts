/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import type { ModalController, Platform } from '@ionic/angular';

import type { QR } from '../../model/qr';

@Component({
  selector: 'app-show-qrcode-modal',
  styleUrls: ['./show-qrcode-modal.component.scss'],
  templateUrl: './show-qrcode-modal.component.html',
})
export class ShowQRCodeModalComponent implements OnInit {
  @Input() qr: QR

  @Input() id: number

  width: number

  constructor(
    private readonly platform: Platform,
    private readonly modalController: ModalController
  ) {}

  ngOnInit() {
    this.width = Math.min(this.platform.width(), 500)
  }

  dismiss() {
    this.modalController.dismiss()
  }
}
