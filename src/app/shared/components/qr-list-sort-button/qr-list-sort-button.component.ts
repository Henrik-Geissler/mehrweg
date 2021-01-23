/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnInit } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import type { ActionSheetController } from '@ionic/angular';

import { QrHistoryGroupType } from '../../services/qr.service';

@Component({
  selector: 'app-qr-list-sort-button',
  styleUrls: ['./qr-list-sort-button.component.scss'],
  templateUrl: './qr-list-sort-button.component.html',
})
export class QrListSortButtonComponent implements OnInit {
  @Output('sortTypeChanged') sortTypeChanged = new EventEmitter<
    QrHistoryGroupType
  >()

  constructor(private readonly actionSheetController: ActionSheetController) {}

  ngOnInit() {}

  showSortByActionSheet(): void {
    this.actionSheetController
      .create({
        buttons: [
        {
          handler: () => this.sortTypeChanged.emit(QrHistoryGroupType.GROUP_BY_DATE),
          icon: 'calendar-outline',
          text: 'Date'
        },
        {
          handler: () => this.sortTypeChanged.emit(QrHistoryGroupType.GROUP_BY_TYPE),
          icon: 'pricetag-outline',
          text: 'Type'
        }
      ],
      header: 'Sort by'
      })
      .then(sheet => sheet.present())
  }
}
