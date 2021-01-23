/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnInit } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';

import { ActionType } from '../../shared/model/action-type.enum';
import type { QrService } from '../../shared/services/qr.service';

@Component({
  selector: 'app-create-step1',
  styleUrls: ['./create-step1.component.scss'],
  templateUrl: './create-step1.component.html',
})
export class CreateStep1Component implements OnInit {
  public readonly ActionType = ActionType

  @Output() stepComplete = new EventEmitter<ActionType>()

  types: string[] = []

  constructor(private readonly qrService: QrService) {}

  ngOnInit() {
    for (const key of Object.keys(ActionType)) {
      this.types.push(ActionType[key] as string)
    }
  }

  getIcon(actionType: ActionType | string) {
    return this.qrService.getIconFromActionType(actionType as ActionType)
  }

  select(type: string): void {
    this.stepComplete.emit(type as ActionType)
  }
}
