/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { ActionType } from './action-type.enum';
import type { DataType } from './data.type';
import type { QrType } from './qr-type.enum';

export class QR {
  constructor(
    public readonly type: QrType,
    public readonly actionType: ActionType,
    public readonly dataType: DataType,
    public readonly data: string,
    public readonly createdAt: Date = new Date(),
    public favorite: boolean = false
  ) {}
}
