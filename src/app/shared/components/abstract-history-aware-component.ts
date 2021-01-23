/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnInit } from '@angular/core';
import type { Router } from '@angular/router';
import { RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

import { BaseComponent } from '../../base.component';

export class AbstractHistoryAwareComponent extends BaseComponent
  implements OnInit {
  protected prevUrl: string

  constructor(protected router: Router) {
    super()
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((e: any) => {
        if (e.length === 0) {
          this.prevUrl = '/tabs/scanner'
        } else {
          this.prevUrl = e[0].urlAfterRedirects
        }
      })
  }

  goBack() {
    this.router.navigateByUrl(this.prevUrl)
  }
}
