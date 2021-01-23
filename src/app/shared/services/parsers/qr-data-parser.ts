/**
 * Copyright (c) 2021, Henrik Geißler.
 */
export type QrDataParser<T> = {
  parse: (data: string) => T
}
