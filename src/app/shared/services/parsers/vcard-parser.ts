/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { Address, Contact } from '../../model/qr-data/contact';
import { AbstractVDataParser } from './abstract-vdata-parser';
import type { QrDataParser } from './qr-data-parser';

/**
 * Code ported from 'https://github.com/ertant/vCard/blob/master/parser.js'.
 */
export class VCardParser extends AbstractVDataParser<Contact>
  implements QrDataParser<Contact[]> {
  private static readonly FIELD_PROPERTY_MAPPINGS = {
    ADR: 'address',
    CATEGORIES: 'categories',
    BDAY: 'birthday',
    EMAIL: 'email',
    FN: 'displayName',
    N: 'name',
        NOTE: 'notes',
    TEL: 'telephone',
    ORG: 'organization',
    TITLE: 'title',
    PHOTO: 'photo',
    URL: 'url',
  }

  private static readonly FIELD_PARSERS = {
    ADR: VCardParser.addressLine,
    BDAY: AbstractVDataParser.dateLine,
    BEGIN: AbstractVDataParser.noop,
    EMAIL: AbstractVDataParser.typedLine,
        N: AbstractVDataParser.structured([
      'surname',
      'name',
      'additionalName',
      'prefix',
      'suffix',
    ]),
    CATEGORIES: AbstractVDataParser.commaSeparatedLine,
    NICKNAME: AbstractVDataParser.commaSeparatedLine,
    FN: AbstractVDataParser.singleLine,
    TEL: AbstractVDataParser.typedLine,
        NOTE: AbstractVDataParser.singleLine,
    VERSION: AbstractVDataParser.noop,
    ORG: AbstractVDataParser.singleLine,
    PHOTO: AbstractVDataParser.singleLine,
    TITLE: AbstractVDataParser.singleLine,
    UID: AbstractVDataParser.singleLine,
    URL: AbstractVDataParser.singleLine,
  }

  private static addressLine(
    currentRawContact,
    fieldValue,
    fieldName,
    typeInfo
  ) {
    VCardParser.typedLine(
      currentRawContact,
      fieldValue,
      fieldName,
      typeInfo,
      VCardParser.addressValueFormatter
    )
  }

  private static addressValueFormatter(value) {
    const names = value.split(';')
    
return {
      
      city: names[3] || '',
      
country: names[6] || '',
      
number: names[1],
      
postalCode: names[5] || '',
      // ADR field sequence
postOfficeBox: names[0],
      region: names[4] || '',
            street: names[2] || ''
    }
  }

  constructor() {
    super(VCardParser.FIELD_PROPERTY_MAPPINGS, VCardParser.FIELD_PARSERS)
  }

  protected parseRawObject(rawContact: any): Contact {
    const homeAddress = VCardParser.findByType(rawContact.address, ['HOME'])
    const workAddress = VCardParser.findByType(rawContact.address, ['WORK'])
    const contact = new Contact()
    contact.displayName = rawContact.displayName || ''
    contact.firstName = rawContact.name.name || ''
    contact.lastName = rawContact.name.surname || ''
    contact.mobile =
      VCardParser.findByType(rawContact.telephone, ['CELL'], true) || ''
    contact.phone =
      VCardParser.findByType(rawContact.telephone, ['HOME', 'VOICE'], true) ||
      ''
    contact.fax =
      VCardParser.findByType(rawContact.telephone, ['WORK', 'FAX'], true) || ''
    contact.workPhone =
      VCardParser.findByType(rawContact.telephone, ['WORK', 'VOICE'], true) ||
      ''
    contact.email =
      VCardParser.findByType(rawContact.email, ['HOME'], true) || ''
    contact.workEmail =
      VCardParser.findByType(rawContact.email, ['WORK'], true) || ''
    contact.company = rawContact.organization || ''
    contact.job = rawContact.title || ''
    contact.homeAddress =
      homeAddress && homeAddress.value
        ? new Address(
            homeAddress.value.street || '',
            homeAddress.value.number || '',
            homeAddress.value.postOfficeBox || '',
            homeAddress.value.city || '',
            homeAddress.value.postalCode || '',
            homeAddress.value.region || '',
            homeAddress.value.country || ''
          )
        : null
    contact.workAddress =
      workAddress && workAddress.value
        ? new Address(
            workAddress.value.street || '',
            workAddress.value.number || '',
            workAddress.value.postOfficeBox || '',
            workAddress.value.city || '',
            workAddress.value.postalCode || '',
            workAddress.value.region || '',
            workAddress.value.country || ''
          )
        : null
    contact.website = rawContact.url
    contact.notes = rawContact.notes
    contact.birthDay = rawContact.birthday || ''

    return contact
  }
}
