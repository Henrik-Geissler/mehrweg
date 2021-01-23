/**
 * Copyright (c) 2021, Henrik Geißler.
 */
export class DateUtils {
  public static sameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }
}
