/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { DataType } from '../model/data.type';
import { QR } from '../model/qr';
import { Wifi } from '../model/qr-data/wifi';
import { MailtoParser } from '../services/parsers/mailto-parser';
import { MatmsgParser } from '../services/parsers/matmsg-parser';
import { MeCardParser } from '../services/parsers/me-card-parser';
import { PhoneParser } from '../services/parsers/phone-parser';
import type { QrDataParser } from '../services/parsers/qr-data-parser';
import { SmsParser } from '../services/parsers/sms-parser';
import { VCardParser } from '../services/parsers/vcard-parser';
import { VEventParser } from '../services/parsers/vevent-parser';
import { WifiParser } from '../services/parsers/wifi-parser';

export class QrDataParserRegistry {
  private static registry = new Map<DataType, QrDataParser<any>>([
    [DataType.MATMSG, new MatmsgParser()],
    [DataType.VCARD, new VCardParser()],
    [DataType.MAILTO, new MailtoParser()],
    [DataType.SMS, new SmsParser()],
    [DataType.VEVENT, new VEventParser()],
    [DataType.MECARD, new MeCardParser()],
    [DataType.PHONE, new PhoneParser()],
    [DataType.WIFI, new WifiParser()],
  ])

  public static getParser<T>(type: DataType): QrDataParser<T> {
    return QrDataParserRegistry.registry.get(type)
  }

private constructor() {}

  
}
