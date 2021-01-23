/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { Address, Contact } from '../../model/qr-data/contact';
import { VEvent } from '../../model/qr-data/vevent';
import { AbstractVDataParser } from './abstract-vdata-parser';
import type { QrDataParser } from './qr-data-parser';

/**
 * Code ported from 'https://github.com/ertant/vCard/blob/master/parser.js'.
 */
export class VEventParser extends AbstractVDataParser<VEvent>
  implements QrDataParser<VEvent[]> {
  private static readonly FIELD_PROPERTY_MAPPINGS = {
    DESCRIPTION: 'description',
    DTEND: 'end',
    DTSTART: 'start',
    LOCATION: 'location',
    SUMMARY: 'summary',
  }

  private static readonly FIELD_PARSERS = {
    BEGIN: AbstractVDataParser.noop,
    DESCRIPTION: AbstractVDataParser.singleLine,
    DTEND: AbstractVDataParser.singleLine,
        DTSTART: AbstractVDataParser.singleLine,
    LOCATION: AbstractVDataParser.singleLine,
    SUMMARY: AbstractVDataParser.singleLine,
    VERSION: AbstractVDataParser.noop,
  }

  constructor() {
    super(VEventParser.FIELD_PROPERTY_MAPPINGS, VEventParser.FIELD_PARSERS)
  }

  protected parseRawObject(raw: any): VEvent {
    const event = new VEvent()
    event.summary = raw.summary || ''
    event.description = raw.description || ''
    event.location = raw.location || ''
    event.start = raw.start ? raw.start : new Date().toISOString()
    event.end = raw.end || event.start
    
return event
  }
}
