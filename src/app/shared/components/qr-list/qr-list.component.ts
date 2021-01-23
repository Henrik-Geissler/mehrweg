/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnInit } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Router } from '@angular/router';
import type { AlertController } from '@ionic/angular';

import type { QR } from '../../model/qr';
import type { QrService } from '../../services/qr.service';

@Component({
  selector: 'app-qr-list',
  styleUrls: ['./qr-list.component.scss'],
  templateUrl: './qr-list.component.html',
})
export class QrListComponent implements OnInit {
  @Input() codes: Map<string, QR[]>

  @Input() showDelete = false

  @Output() deleteQr: EventEmitter<number> = new EventEmitter<number>()

  constructor(
    private readonly qrService: QrService,
    private readonly router: Router,
    private readonly alertController: AlertController
  ) {}

  ngOnInit() {}

  getEssentialData(qr: QR): string {
    return this.qrService.getEssentialData(qr)
  }

  getIcon(qr: QR): string {
    return this.qrService.getIcon(qr)
  }

  navigateToDetail(id: number) {
    this.router.navigateByUrl(`/tabs/details/${id}`)
  }

  askForDeletion(qr: QR) {
    this.alertController
      .create({
        buttons: [
          'Cancel',
          {
            handler: () => this.delete((qr as any).id),
            text: "I'm sure!", // Dirty trick to get extra data that's on the object
          },
        ],
        header: 'Are you sure?',
        message: `Are you sure you want to delete the qr code: '${this.getEssentialData(
          qr
        )}'`,
      })
      .then(alert => alert.present())
  }

  keepOrder(): number {
    return 1
  }

  private delete(id: number) {
    this.deleteQr.emit(id)
    for (const [key, value] of this.codes) {
      this.codes.set(
        key,
        value.filter(qr => (qr as any).id !== id)
      )
    }
  }
}
