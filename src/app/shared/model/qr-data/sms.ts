/**
 * Copyright (c) 2021, Henrik Geißler.
 */
export class Sms {
  public numbers: string[]

  public message: string

  public smsTo(): string {
    return `SMSTO:${this.numbers.join(',')}:${this.message}`
  }
}
