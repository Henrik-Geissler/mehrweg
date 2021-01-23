/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import type { Platform } from '@ionic/angular';

import type { QR } from '../../shared/model/qr';

@Component({
  selector: 'app-create-step3',
  styleUrls: ['./create-step3.component.scss'],
    templateUrl: './create-step3.component.html',
})
export class CreateStep3Component implements OnInit {
  @Input() qr: QR

  width: number

  constructor(private readonly platform: Platform) {}

  ngOnInit() {
    this.width = this.platform.width()
  }
}
