/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { Component } from '@angular/core';
import type { Router } from '@angular/router';

import { AbstractHistoryAwareComponent } from '../shared/components/abstract-history-aware-component';

@Component({
  selector: 'app-about',
  styleUrls: ['./about.component.scss'],
  templateUrl: './about.component.html',
})
export class AboutComponent extends AbstractHistoryAwareComponent {
  constructor(router: Router) {
    super(router)
  }
}
