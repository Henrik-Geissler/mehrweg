/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { Contact } from '../../model/qr-data/contact'

export abstract class AbstractVDataParser<T> {
  // Mappers
  protected static noop() {}

  protected static findByType(
    searchArray: any[],
    types: string[],
    asString: boolean = false
  ): any | string {
    if (!searchArray) {
      return null
    }
    types = types.map(type => type.toUpperCase())
    const object = searchArray.find(item =>
      item.valueInfo.type
        .toUpperCase()
        .split(',')
        .some(type => types.includes(type.toUpperCase()))
    )
    if (asString) {
      if (object) {
        return object.value || ''
      }

      return ''
    }

    return object || null
  }

  protected static structured(fields: string[]) {
    return (currentRawContact, fieldValue, fieldName) => {
      const values = fieldValue.split(';')
      currentRawContact[fieldName] = fields.reduce((p, c, index) => {
        p[c] = values[index] || ''

        return p
      }, {})
    }
  }

  protected static singleLine(currentRawContact, fieldValue, fieldName) {
    fieldValue = fieldValue.replace('\\n', '\n')
    if (currentRawContact[fieldName]) {
      currentRawContact[fieldName] += `\n${fieldValue}`
    } else {
      currentRawContact[fieldName] = fieldValue
    }
  }

  protected static typedLine(
    currentRawContact,
    fieldValue,
    fieldName,
    typeInfo,
    valueFormatter
  ) {
    let isDefault = false
    typeInfo = typeInfo
      .filter(type => {
        isDefault = isDefault || type.name === 'PREF'

        return type.name !== 'PREF'
      })
      .reduce((p, c) => {
        p[c.name] = c.value

        return p
      }, {})
    // Give it a default value
    currentRawContact[fieldName] = currentRawContact[fieldName] || []
    currentRawContact[fieldName].push({
      isDefault,
      value: valueFormatter ? valueFormatter(fieldValue) : fieldValue,
      valueInfo: typeInfo,
    })
  }
protected constructor(
    private readonly propertyMappings: object,
    private readonly fieldParsers: object
  ) {}

  

  protected static commaSeparatedLine(
    currentRawContact,
    fieldValue,
    fieldName
  ) {
    currentRawContact[fieldName] = fieldValue.split(',')
  }

  protected static dateLine(currentRawContact, fieldValue, fieldName) {
    // if value is in "19531015T231000Z" format strip time field and use date value.
    fieldValue = fieldValue.length === 16 ? fieldValue.slice(0, 8) : fieldValue
    let dateValue = null
    if (fieldValue.length === 8) {
      // "19960415" format ?
      dateValue = new Date(
        fieldValue.slice(0, 4),
        fieldValue.slice(4, 6),
        fieldValue.slice(6, 8)
      )
    } else {
      // last chance to try as date.
      dateValue = new Date(fieldValue)
    }
    if (!dateValue || isNaN(dateValue.getDate())) {
      dateValue = null
      console.warn(`invalid date format ${fieldValue}`)
    }
    currentRawContact[fieldName] = dateValue && dateValue.toJSON() // always return the ISO date format
  }

  // End mappers

  protected abstract parseRawObject(rawData: object): T

  public parse(data: string): T[] {
    const lines = data
      // replace escaped new lines
      .replace(/\n\s/g, '')
      // split if a character is directly after a newline
      .split(/\r\n(?=\S)|\r(?=\S)|\n(?=\S)/)
    const parsedData: T[] = []
    let currentRawContact = {}
    for (let index = 1; index < lines.length; index++) {
      const line = this.removeItemPrefix(lines[index])
      const pairs = line.split(':')
      let fieldName = pairs[0]
      const fieldValue = pairs.slice(1).join(':')
      let fieldTypeInfo = [{ name: 'type', value: 'HOME' }] // Default the type is home
      // is additional type info provided ?
      if (fieldName.includes(';') && line.indexOf(';') < line.indexOf(':')) {
        const typeInfo = fieldName.split(';')
        fieldName = typeInfo[0]
        fieldTypeInfo = typeInfo.slice(1).map(type => {
          const info = type.split('=')
          if (info.length === 1) {
            return {
              name: 'type',
              value: info[0].replace(/"(.*)"/, '$1'),
            }
          }

          return {
            name: info[0].toLowerCase(),
            value: info[1].replace(/"(.*)"/, '$1'),
          }
        })
      }
      fieldName = fieldName.toUpperCase()
      const handler = this.fieldParsers[fieldName]
      if (handler) {
        handler(
          currentRawContact,
          fieldValue,
          this.lookupField(fieldName),
          fieldTypeInfo
        )
      } else if (fieldName === 'END') {
        parsedData.push(this.parseRawObject(currentRawContact))
        currentRawContact = {}
      } else {
        console.warn(
          `No handler found for vCard field: ${fieldName} (We are ignoring this for now)`
        )
      }
    }

    return parsedData
  }

  private removeItemPrefix(line: string): string {
    // sometimes lines are prefixed by "item" keyword like "item1.ADR;type=WORK:....."
    return line.startsWith('item') ? line.match(/item\d\.(.*)/)[1] : line
  }

  private lookupField(fieldName: string): string {
    let propertyName = this.propertyMappings[fieldName]
    if (!propertyName && fieldName !== 'BEGIN' && fieldName !== 'END') {
      propertyName = fieldName
    }

    return propertyName
  }
}
