/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { QrDataParser } from './qr-data-parser';

export class PhoneParser implements QrDataParser<string> {
  parse(data: string): string {
    return data.slice('tel:'.length)
  }
}
